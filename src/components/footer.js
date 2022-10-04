import React from "react";
import styles from "./footer.module.css";

function Footer({ props }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Copyright 2022. juhwan976 all rights reserved.
      </p>
      {/*<div>Contact : juhwan976@gmail.com</div>*/}
    </footer>
  );
}

export default Footer;