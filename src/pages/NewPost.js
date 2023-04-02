import React from "react";
import { useState } from "react";
import FirebaseApi from "../pages/FirebaseApi";
import Firebase from "../pages/Firebase";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Image,
} from "semantic-ui-react";
function NewPost() {
  const history = useNavigate();
  const [title, setTitie] = useState("");
  const [conten, setConten] = useState("");
  const [topicName, setTopicName] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState("");
  //提取firebase資料庫的資料
  const [topics, setTopics] = React.useState([]);

  React.useEffect(() => {
    FirebaseApi.collection("topics")
      .get()
      .then((querySnapshot) => {
        // 取得所有文件的資料
        const topicsData = querySnapshot.docs.map((doc) => doc.data());
        setTopics(topicsData);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []); // 將空數組作為第二個參數以避免重渲染
  const options = topics.map((topic) => {
    return {
      text: topic.name,
      value: topic.name,
    };
  });

  function onSubmit() {
    setIsLoading(true);
    const docRef = FirebaseApi.collection("posts").doc();
    //儲存圖片-用id當圖片名稱
    const fileRef = Firebase.storage().ref("post-image/" + docRef.id);
    const metadata = {
      contenType: file.type,
    };
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageURL) => {
        //送出文章後，會將資料存在firebase
        docRef
          .set({
            title,
            conten,
            topic: topicName,
            cretedAt: Firebase.firestore.Timestamp.now(),
            author: {
              displayName: Firebase.auth().currentUser.displayName || "",
              photoUrl: Firebase.auth().currentUser.photoURL || "",
              uid: Firebase.auth().currentUser.uid,
              email: Firebase.auth().currentUser.email,
            },
            imageURL,
          })
          .then(() => {
            setIsLoading(false);
            history("/");
          });
      });
    });
  }

  // 設定圖片預覽(判斷file變數是否有路徑資料，若無則給預設圖片)
  const previewUrl = file
    ? URL.createObjectURL(file)
    : "https://images.unsplash.com/photo-1676873261959-173b91552b0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop";
  return (
    <Container>
      <Header as="h2" icon="edit" content="Write an article" />
      <Form onSubmit={onSubmit}>
        <Image src={previewUrl} floated="left" size="small" circular />
        {/*  透過Button來觸發Form.Input type="file" ，htmlFor='要觸發元件的id名稱'*/}
        {/* <Button basic as="label" htmlFor="post-image">
          <Icon name="upload" color="teal" />
          上傳圖片
        </Button> */}
        <Button
          color="black"
          as="label"
          htmlFor="post-image"
          icon="upload"
          // label={{
          //   basic: true,
          //   color: "grey",
          //   pointing: "left",
          //   content: "Upload",
          // }}
        />
        <Form.Input
          type="file"
          id="post-image"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Form.Input
          icon={<Icon name="chess board" inverted circular left />}
          placeholder="請輸入文章標題"
          value={title}
          onChange={(e) => setTitie(e.target.value)}
        />
        <Form.TextArea
          placeholder="請輸文章內容"
          value={conten}
          onChange={(e) => setConten(e.target.value)}
        />
        <Form.Dropdown
          placeholder="請選擇文章主題"
          options={options}
          selection
          value={topicName}
          onChange={(e, { value }) => setTopicName(value)}
        />
        <Button
          color="black"
          icon="send"
          loading={isLoading}
          // label={{
          //   basic: true,
          //   color: "grey",
          //   pointing: "left",
          //   content: "送出文章",
          // }}
        />
      </Form>
    </Container>
  );
}
export default NewPost;
