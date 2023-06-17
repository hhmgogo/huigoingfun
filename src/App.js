import React from "react";
import {
  Route,
  Routes,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./allStyle.css";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Button,
  Grid,
  Image,
  Icon,
  Label,
  Card,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Topics from "./components/Topics";
import Login from "./pages/Login";
import Header from "./Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import NewPost from "./pages/NewPost";
import Post from "./pages/post";
import Posts from "./pages/Posts";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="NewPost" element={<NewPost />} />
        <Route path="About" element={<About />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:postId" element={<Post />} />
        {/* <Route path="PostParent" element={<PostParent />} /> */}
        <Route path="Portfolio" element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
