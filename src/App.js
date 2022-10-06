import { Routes, Route, BrowserRouter } from "react-router-dom";
import firebase from "./firebase.js";
import React from "react";
import Footer from "./components/footer";
import Nav from "./components/nav";

import BlogPage from "./page/blog_page";
import EmptyPage from "./page/empty_page";
import GamePage from "./page/game_page";
import MainPage from "./page/main_page";
import WhoAmIPage from "./page/who_am_i_page";
import LogPage from "./page/log_page";
import LogDetailPage from "./page/log_detail_page";

import styles from "./App.module.css";
import FloatingButton from "./components/floating_button.js";
import BlogDetailPage from "./page/blog_detail_page.js";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav />
        <FloatingButton />
        <div className={styles.pages}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/who_am_i" element={<WhoAmIPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:timeStamp" element={<BlogDetailPage />} />
            <Route path="/logs" element={<LogPage />} />
            <Route path="/logs/:date" element={<LogDetailPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="*" element={<EmptyPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;