import React, { useState, useEffect } from "react";
import { Menu, Form, Container, Message, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Firebase from "./Firebase";
import "firebase/compat/auth";

function Login() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("register");
  const [Email, setEmail] = useState("");
  const [Password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //console.log(Firebase);
    // // console.log(activeItem);
    // console.log(Email);
    // console.log(Password);
  });

  function onSubmit() {
    if (activeItem === "register") {
      Firebase.auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          navigate("/"); //網頁導向
          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;
            default:
          }
        });
    } else if (activeItem === "signin") {
      Firebase.auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(() => {
          navigate("/"); //網頁導向
          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-user-not-found":
              setErrorMessage("信箱不存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/wrong-password":
              setErrorMessage("密碼錯誤");
              break;
            default:
          }
        });
    }
  }

  return (
    <Container>
      <Menu widths="2" color="teal" inverted>
        <Menu.Item
          color="teal"
          content=" 註冊"
          active={activeItem === "register"}
          onClick={() => {
            setErrorMessage("");
            setActiveItem((activeItem) => "register");
          }}
        />
        <Menu.Item
          color="teal"
          content="  登入"
          active={activeItem === "signin"}
          onClick={() => {
            setErrorMessage("");
            setActiveItem((activeItem) => "signin");
          }}
        />
      </Menu>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label="Mail"
          value={Email}
          placeholder="請輸入信箱"
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Input>
        <Form.Input
          label="PassWord"
          value={Password}
          placeholder="請輸入密碼"
          onChange={(e) => setpassword(e.target.value)}
          type="password"
        ></Form.Input>
        {errorMessage && (
          <Message color="red" icon>
            <Icon name="warning" color="teal" />
            {errorMessage}
          </Message>
        )}
        <Form.Button color="teal" loading={isLoading}>
          {activeItem === "register" && "註冊"}
          {activeItem === "signin" && "登入"}
        </Form.Button>
      </Form>
    </Container>
  );
}

export default Login;
