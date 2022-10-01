import React from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./portfolio_page.module.css";

function PortfolioPage({ props }) {
  return (
    <div>
      <PageTitle props={{ title: "Portfolio" }} />
      <p>content is here</p>
    </div>
  );
}

export default PortfolioPage;