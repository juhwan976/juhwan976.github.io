import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./blog_page.module.css";
import { Link } from "react-router-dom";

function BlogPage({ props }) {
  const [contentList, setContentList] = useState([]);

  const getData = async () => {
    const docRef = doc(db, "blog", "_info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setContentList((current) => [...docSnap.data()["post_info"]]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: "Blog" }} />
      <ul className={styles.ul}>
        {contentList.length !== 0 ?
          contentList.map((content, index) => {
            return (
              <li key={index}>
                <Link to={`/blog/${content.timeStamp}`}>
                  <ul className={styles.template}>
                    <li className={styles.title}>
                      {content.title}
                    </li>
                    <li className={styles.date}>
                      {Intl.DateTimeFormat('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(content.timeStamp)}
                    </li>
                  </ul>
                </Link>
              </li>
            );
          }) : null
        }
      </ul>
    </div>
  );
}

export default BlogPage;