import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./log_page.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import PageContent from "../components/for_page/page_content";

function LogPage({ props }) {
  const [logList, setLogList] = useState([]);

  const getData = async () => {
    const collectionRef = collection(db, "logs");
    const collectionSnap = await getDocs(query(collectionRef, orderBy("title", "desc")));
    const docs = collectionSnap.docs;

    docs.forEach((log) => {
      setLogList((current) => [...current, log.id]);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: "Logs" }} />
      <PageContent>
        <ul className={styles.template}>
          {logList.length !== 0 ?
            logList.map((value, index) => {
              return (
                <li className={styles.date} key={index}>
                  <Link to={`/logs/${value}`}>{value}</Link>
                </li>
              );
            }) :
            <li>Loading...</li>}
        </ul>
      </PageContent>
    </div>
  );
}

export default LogPage;