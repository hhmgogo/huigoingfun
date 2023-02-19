import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Header from "./Header";
import Posts from "pages/Posts";
import Home from "pages/Home";
import About from "pages/About";
import Game1A2B from "pages/game/Game1A2B";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Posts" element={<Posts />} />
        <Route path="About" element={<About />} />
        <Route path="Game1A2B" element={<Game1A2B />} />
      </Routes>
    </>
  );
}

export default App;
