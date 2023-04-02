import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Header from "./Header";
import Posts from "pages/Posts";
import Home from "pages/Home";
import About from "pages/About";
import Portfolio from "pages/Portfolio";
import NewPost from "pages/NewPost";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Posts" element={<Posts />} />
        <Route path="NewPost" element={<NewPost />} />
        <Route path="About" element={<About />} />
        <Route path="Portfolio" element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
