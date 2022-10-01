import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Footer from "./components/footer";
import Nav from "./components/nav";
import BlogPage from "./page/blog_page";
import EmptyPage from "./page/empty_page";
import GamePage from "./page/game_page";
import MainPage from "./page/main_page";
import PortfolioPage from "./page/portfolio_page";
import WhoAmIPage from "./page/who_am_i_page";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav />
        <div style={{ padding: "10px 30px", }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/who_am_i" element={<WhoAmIPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
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