import React from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./who_am_i_page.module.css";

function WhoAmIPage({ props }) {
  return (
    <div>
      <PageTitle props={{ title: "Who am I" }} />
      <p>content is here</p>
    </div>
  );
}

export default WhoAmIPage;