import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContent from "../components/for_page/page_content";
import PageTitle from "../components/for_page/page_title";
import { db } from "../firebase";


function LogDetailPage() {
  const { date } = useParams();
  const [data, setData] = useState("");

  const getContent = async () => {
    const docRef = doc(db, "logs", date);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data().content);
    }
    else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: `${date}` }} />
      <PageContent>
        <div dangerouslySetInnerHTML={{ __html: data }}></div>
      </PageContent>
    </div>
  );
}

export default LogDetailPage;