import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";
import { db } from "../firebase";
import styles from "./who_am_i_page.module.css";

function WhoAmIPage({ props }) {
  const [content, setContent] = useState('');

  const getData = async () => {
    const docRef = doc(db, "who_am_i", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setContent(docSnap.data().content);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: "Who am I" }} />
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}

export default WhoAmIPage;