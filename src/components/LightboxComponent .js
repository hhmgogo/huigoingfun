import React, { useState } from "react";
import ModalImage from "react-modal-image";
import styled from "styled-components";
import Firebase from "../pages/Firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StyledDiv = styled.div`
  width: 500px;
  height: 500px;
`;

function LightboxComponent(props) {
  // 輸出傳遞給元件的 images 屬性
  const Navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({ author: [] });
  console.log(postId);
  React.useEffect(() => {
    const setData = async () => {
      try {
        const user = Firebase.auth().currentUser;
        if (user && user.uid) {
        } else {
          // UID 為空，執行其他程式碼，例如導向註冊頁面
          Navigate("/Login");
        }
        Firebase.firestore()
          .collection("posts")
          .doc(postId)
          .onSnapshot((docSnapshot) => {
            //(監聽)當資料更新會立即執行此function(onSnapshot)
            const data = docSnapshot.data();
            setPost(data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    setData();
  }, []);
  console.log(post.imageURL);
  return (
    <StyledDiv>
      <ModalImage
        small={post.imageURL}
        large={post.imageURL}
        medium={post.imageURL}
        //"path/to/large/image"
        alt={post.title}
        hideDownload={false}
        hideZoom={false}
        showRotate={true}
        // imageBackgroundColor="hotpink"
      />
    </StyledDiv>
  );
}
export default LightboxComponent;
