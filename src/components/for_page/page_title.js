import React from "react";
import styles from "./page_title.module.css";

function PageTitle({ props }) {
  return (
    <div>
      <ul className={styles.title_form}>
        <li>
          <h1 className={styles.title}>
            {props.title}
          </h1>
        </li>
        {props.timeStamp &&
          <li>
            <h2 className={styles.timeStamp}>
              {Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }).format(props.timeStamp)}
            </h2>
          </li>
        }
      </ul>
      <div className={styles.divider}></div>
    </div>
  );
}

export default PageTitle;