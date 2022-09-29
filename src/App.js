import { Routes, Route, BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import BlogPage from "./page/blog_page";
import EmptyPage from "./page/empty_page";
import GamePage from "./page/game_page";
import MainPage from "./page/main_page";
import PortfolioPage from "./page/portfolio_page";
import WhoAmIPage from "./page/who_am_i_page";

function App() {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/who_am_i" element={<WhoAmIPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;