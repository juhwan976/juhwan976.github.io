import { Favorite } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import styles from "./main_page.module.css";

function MainPage({ props }) {
  const circle = useRef(null);

  const moveCircle = () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    circle.current.style.left = `${Math.floor((scrollPercent) * window.innerWidth)}px`;
    circle.current.style.transform = `rotate(${Math.floor((scrollPercent) * 1080)}deg)`;
  }

  useEffect(() => {
    window.addEventListener("scroll", moveCircle);
    return () => {
      window.removeEventListener("scroll", moveCircle);
    }
  }, []);

  return (
    < div >
      <div className={styles.circle} ref={circle}>
        <Favorite style={{ color: "pink" }} />
      </div>
      <div className={styles.board_red}></div>
      <div className={styles.board_yellow}></div>
      <div className={styles.board_green}></div>
      <div className={styles.board_blue}></div>
    </div >
  );
}

export default MainPage;