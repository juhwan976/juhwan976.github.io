import React from "react";
import styles from "./footer.module.css";

function Footer({ props }) {
  return (
    <footer className={styles.footer}>
      <div>Copyright © 2022 juhwan976</div>
      {/*<div>Contact : juhwan976@gmail.com</div>*/}
    </footer>
  );
}

export default Footer;