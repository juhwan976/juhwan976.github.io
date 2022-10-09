import React from "react";
import styles from "./page_content.module.css";

function PageContent({ children }) {
  return (
    <div className={styles.page_content}>
      {children}
    </div>
  );
}

export default PageContent;