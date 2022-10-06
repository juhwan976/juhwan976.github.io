import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../components/for_page/page_title";
import { db } from "../firebase";

function BlogDetailPage({ props }) {
  const { timeStamp } = useParams();
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");

  const getContent = async () => {
    const docRef = doc(db, "blog", timeStamp);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data().content);
      setTitle(docSnap.data().title);
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: title, timeStamp: timeStamp }} />
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
}

export default BlogDetailPage;