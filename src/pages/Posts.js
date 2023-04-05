import React from "react";
import { Container, Grid, Button, Item, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Topics from "../components/Topics";
import Firebase from "../pages/Firebase";
import Post from "pages/post";
function Posts() {
  const [posts, setPosts] = React.useState([]);

  //當firebase超過配額時
  const localData = [
    {
      id: 1,
      title: "Post 1",
      content: "Lorem ipsum dolor sit amet.",
      author: {
        photoUrl:
          "https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      imageURL:
        "https://images.unsplash.com/photo-1587502536575-6dfba0a6e017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
      id: 2,
      title: "Post 2",
      content: "Ut enim ad minim veniam.",
      author: {
        photoUrl:
          "https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      imageURL:
        "https://images.unsplash.com/photo-1590698933947-a202b069a861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNtaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Post 3",
      content: "Duis aute irure dolor in reprehenderit.",
      author: {
        photoUrl:
          "https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      imageURL:
        "https://images.unsplash.com/photo-1529589789467-4a12ccb8e5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE1fHxzbWlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  React.useEffect(() => {
    Firebase.firestore()
      .collection("posts")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      })
      .catch((error) => {
        console.log("Firebase 配额超限，使用本地数据。", error);
        setPosts(localData); // 如果 Firebase 获取数据失败，使用本地数据
      });
  }, []);

  return (
    <Container>
      <Grid stackable divided="vertically">
        <Grid.Row>
          <Grid.Column width={12} textAlign="Left">
            <Topics />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              basic
              color="violet"
              content="Violet"
              as={Link}
              to="/NewPost"
            >
              發表文章
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={9}>
            <Item.Group>
              {posts.map((post) => {
                return (
                  <Item key={post.id} as={Link} to={`${post.id}`}>
                    <Item.Image src={post.imageURL} rounded />
                    <Item.Content verticalAlign="middle">
                      <Item.Meta>
                        {post.author.photoUrl ? (
                          <Image
                            src={post.author.photoUrl}
                            size="tiny"
                            rounded
                          />
                        ) : (
                          <Icon
                            name="user circle outline"
                            size="big"
                            color="teal"
                          ></Icon>
                        )}
                        {post.topic}.{post.author.displayName || "User"}
                      </Item.Meta>
                      <Item.Header>{post.title}</Item.Header>
                      <Item.Description>{post.content}</Item.Description>
                      <Item.Extra>
                        留言 0 . 讚 <Icon name="like" />
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={7}>資訊 </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default Posts;
