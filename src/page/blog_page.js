import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./blog_page.module.css";
import { Link } from "react-router-dom";

function BlogPage({ props }) {
  const [postList, setPostList] = useState([]);

  const getData = async () => {
    /*
    const docRef = doc(db, "blog", "_info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setContentList((current) => [...docSnap.data()["post_info"]]);
    }
    */

    const collectionRef = collection(db, "blog");
    const collectionSnap = await getDocs(query(collectionRef, orderBy("timeStamp", "desc")));
    const docs = collectionSnap.docs;

    docs.forEach((post) => {
      console.log(post.data());
      setPostList((current) => [...current, { title: post.data()["title"], timeStamp: post.data()["timeStamp"] }])
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: "Blog" }} />
      <ul className={styles.ul}>
        {postList.length !== 0 ?
          postList.map((content, index) => {
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