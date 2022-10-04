import React, { useCallback, useEffect, useState } from "react";
import { KeyboardArrowUpRounded } from "@mui/icons-material";
import styles from "./floating_button.module.css";

function FloatingButton() {
  const [visible, setVisible] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const onClick = (e) => {
    if (!isWorking) {
      setIsWorking(true);
      scrollToTop();
    }
  }

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateButton = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else if (window.scrollY === 0) {
      setIsWorking(false);
      setVisible(false);
    }
    else {
      setVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", updateButton);
    return () => {
      window.removeEventListener("scroll", updateButton);
    }
  }, []);

  return (
    <div>
      {visible && (
        <div className={styles.button} onClick={onClick}>
          <KeyboardArrowUpRounded style={{ color: "black" }} />
        </div>)}
    </div>
  );
}

export default FloatingButton;