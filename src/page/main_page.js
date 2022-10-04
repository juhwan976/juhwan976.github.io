import React from "react";
import styles from "./main_page.module.css";

function MainPage({ props }) {

  return (
    < div >
      <div className={styles.board_red}></div>
      <div className={styles.board_yellow}></div>
      <div className={styles.board_green}></div>
      <div className={styles.board_blue}></div>
    </div >
  );
}

export default MainPage;