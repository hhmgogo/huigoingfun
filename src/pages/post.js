import React, { useState } from "react";
import {
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Icon,
  Label,
  Comment,
  Form,
} from "semantic-ui-react";
import Topics from "../components/Topics";
import { useParams } from "react-router-dom";
import Firebase from "../pages/Firebase";
function Post() {
  const { postId } = useParams();
  const currentDate = new Date().toLocaleDateString();

  const [post, setPost] = useState({ author: [] });
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [comments, setComments] = useState([]);
  //當firebase超過配額時
  const localData = [
    {
      id: "1",
      title: "Post 1",
      topic: "美食",
      conten: "Lorem ipsum dolor sit amet.",
      author: {
        photoUrl:
          "https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      imageURL:
        "https://images.unsplash.com/photo-1587502536575-6dfba0a6e017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
      id: "2",
      title: "Post 2",
      topic: "電影",
      conten: "Ut enim ad minim veniam.",
      author: {
        photoUrl:
          "https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        displayName: "Andy",
      },
      imageURL:
        "https://images.unsplash.com/photo-1590698933947-a202b069a861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNtaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "3",
      title: "Post 3",
      topic: "聊天",
      conten: "Duis aute irure dolor in reprehenderit.",
      author: {
        photoUrl:
          "https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        displayName: "Katy",
      },
      imageURL:
        "https://images.unsplash.com/photo-1529589789467-4a12ccb8e5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE1fHxzbWlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      displayName: "Mandy",
    },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        Firebase.firestore()
          .collection("posts")
          .doc(postId)
          .onSnapshot((docSnapshot) => {
            //(監聽)當資料更新會立即執行此function(onSnapshot)
            const data = docSnapshot.data();
            setPost(data);
          });
      } catch (error) {
        console.log("Firebase 配额超限，使用本地数据。", error);
        //當firebase配額暴掉時，改為讀取本地端資料
        const postItem = localData.find((item) => item.id === postId);
        if (postItem) {
          setPost(postItem);
        } else {
          console.log(`Post with id ${postId} not found.`);
        }
        console.log(post.author.photoUrl);
      }
    };
    //留言取資料回來
    const fetchComment = async () => {
      try {
        Firebase.firestore()
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy("createdAt", "desc")
          //監聽留言變動
          .onSnapshot((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map((doc) => {
              return doc.data();
            });
            console.log(data);
            setComments(data);
          });
      } catch (error) {
        console.log("Firebase 配额超限，使用本地数据。", error);
      }
    };

    fetchData();
    fetchComment();
  }, []);

  function toggle(isActive, field) {
    const uid = Firebase.auth().currentUser.uid;

    Firebase.firestore()
      .collection("posts")
      .doc(postId)
      .update({
        [field]: isActive
          ? Firebase.firestore.FieldValue.arrayRemove(uid)
          : Firebase.firestore.FieldValue.arrayUnion(uid),
      });
  }

  function onSubmit() {
    //按下留言送出時，將isLoading設為true
    setIsloading(true);
    const firestore = Firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection("posts").doc(postId);
    batch.update(postRef, {
      // 當commentsCount是個數字欄位，則會自動加1
      commentsCount: Firebase.firestore.FieldValue.increment(1),
    });
    //在該筆文章底下再新增一個新的集合comments(收集留言的array)
    const commentRef = postRef.collection("comments").doc();
    batch.set(commentRef, {
      // 留言內容
      content: commentContent,
      // 留言時間
      createdAt: Firebase.firestore.Timestamp.now(),
      //記錄留言作者
      author: {
        uid: Firebase.auth().currentUser.uid,
        //若無該資料則給空字串
        displayName: Firebase.auth().currentUser.displayName || "",
        photoURL: Firebase.auth().currentUser.photoURL || "",
      },
    });

    batch.commit().then(() => {
      //當更新成功，將setCommentContent設回空字串
      setCommentContent("");
      /*成功送出更新，將isLoading改回false, 
 在送出留言的button加一個屬性 loading={isLoading}  ,當為false時，會清空textArea裡的文字*/
      setIsloading(false);
    });
  }

  const isCollected = post.collectedBy?.includes(
    Firebase.auth().currentUser.uid
  );
  const isLiked = post.likeBy?.includes(Firebase.auth().currentUser.uid);
  return (
    <Container className="font">
      <Grid stackable divided="vertically">
        <Grid.Row>
          <Grid.Column width={9} textAlign="Left">
            <Topics />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            {/* 文章標頭、使用者名稱和分類、日期 */}
            <Header color="yellow" Header size="huge">
              <Grid verticalAlign="middle">
                <Grid.Column width={6}>
                  <Image src={post.author.photoUrl} circular />
                  <Header.Content>{post.title}</Header.Content>
                  <Header.Subheader>
                    {post.author.displayName || "使用者"}{" "}
                  </Header.Subheader>
                  <Header.Subheader>{post.topic}</Header.Subheader>
                  <Header.Subheader>
                    {post.createdAt
                      ? post.createdAt?.toDate().toLocaleDateString()
                      : currentDate}
                  </Header.Subheader>
                </Grid.Column>
              </Grid>
            </Header>
            {/* 文章圖片 */}
            <Image src={post.imageURL} size="large" />
            {/* 文章內容 */}
            <Segment raised color="yellow" size="large">
              {post.conten}
            </Segment>
            {/* 留言和按讚區塊 */}
            <Segment basic size="large">
              <Label size="medium">
                <Icon name="chat" />
                留言 0
              </Label>
              ．
              <Label size="medium">
                <Icon name="like" />讚 {post.likeBy?.length}
              </Label>
              ．
              <Icon
                name={`thumbs up ${isLiked ? "" : "outline"}`}
                color={isLiked ? "pink" : "grey"}
                size="large"
                link
                onClick={() => toggle(isLiked, "likeBy")}
              ></Icon>
              ．
              <Icon
                name={`bookmark ${isCollected ? "" : "outline"}`}
                color={isCollected ? "blue" : "grey"}
                size="large"
                link
                onClick={() => toggle(isCollected, "collectedBy")}
              ></Icon>
            </Segment>
            {/* 動態留言區塊 */}
            <Comment.Group size="large">
              {/*留言編輯區 */}
              <Form reply>
                <Form.TextArea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                {/* 送出留言 */}
                <Form.Button onClick={onSubmit} loading={isLoading}>
                  <Icon name="send" />
                  留言
                </Form.Button>
              </Form>
              {/* 留言列表區塊 */}
              <Header as="h3" dividing>
                共 {post.commentsCount} 則留言
              </Header>
              {comments.map((comment) => {
                return (
                  <Comment>
                    <Comment.Avatar
                      size="medium"
                      circular
                      src={
                        comment.author.photoURL
                          ? comment.author.photoURL
                          : "https://images.unsplash.com/photo-1676873261959-173b91552b0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80"
                      }
                    />
                    <Comment.Content>
                      <Comment.Author as="span">
                        {comment.author.displayName || "使用者"}
                      </Comment.Author>
                      <Comment.Metadata>
                        {comment.createdAt.toDate().toLocaleString() ||
                          new Date().toLocaleString()}
                      </Comment.Metadata>
                      <Comment.Text>
                        {comment.content || "....留言被刪除"}
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                );
              })}
            </Comment.Group>
          </Grid.Column>
          <Grid.Column width={1}> </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Post;
