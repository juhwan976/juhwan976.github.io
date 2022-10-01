import React from "react";
import styles from "./page_title.module.css";

function PageTitle({ props }) {
  return (
    <div>
      <h1 className={styles.title}>{props.title}</h1>
      <div className={styles.divider}></div>
    </div>
  );
}

export default PageTitle;