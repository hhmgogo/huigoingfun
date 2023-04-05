import React, { useState } from "react";
import {
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import Topics from "../components/Topics";
import { useParams } from "react-router-dom";
import Firebase from "../pages/Firebase";
function Post() {
  const { postId } = useParams();
  const currentDate = new Date().toLocaleDateString();

  const [post, setPost] = useState({ author: [] });

  //當firebase超過配額時
  const localData = [
    {
      id: "1",
      title: "Post 1",
      topic: "美食",
      content: "Lorem ipsum dolor sit amet.",
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
      content: "Ut enim ad minim veniam.",
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
      content: "Duis aute irure dolor in reprehenderit.",
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
    Firebase.firestore()
      .collection("posts")
      .doc(postId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        setPost(data);
      })
      .catch((error) => {
        console.log("Firebase 配额超限，使用本地数据。", error);
        const postItem = localData.find((item) => item.id === postId);
        if (postItem) {
          setPost(postItem);
        } else {
          console.log(`Post with id ${postId} not found.`);
        }
        console.log(post.author.photoUrl);
      });
  }, []);
  return (
    <Container>
      <Grid stackable divided="vertically">
        <Grid.Row>
          <Grid.Column width={12} textAlign="Left">
            <Topics />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15}>
            <Header color="teal">
              <Grid verticalAlign="middle">
                <Grid.Column>
                  <Image src={post.author.photoUrl} circular />
                </Grid.Column>
                <Grid.Column>{post.title}</Grid.Column>
                <Grid.Column>
                  {post.author.displayName || "user"}
                  <Header.Subheader>
                    {post.topic}.
                    {post.createdAt
                      ? post.createdAt?.toDate().toLocaleDateString()
                      : currentDate}
                  </Header.Subheader>
                </Grid.Column>
              </Grid>
            </Header>
            <Image src={post.imageURL} size="small" />
            <Segment raised color="yellow" size="large">
              {post.content}
            </Segment>
            <Segment basic size="large">
              留言 0 ． 讚 0 ．
              <Icon name="thumbs up outline" color="blue" size="large"></Icon>．
              <Icon name="bookmark outline" color="blue" size="large"></Icon>
            </Segment>
          </Grid.Column>
          <Grid.Column width={1}>資訊 </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Post;
