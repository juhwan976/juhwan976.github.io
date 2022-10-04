import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./log_page.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function LogPage({ props }) {
  const [logList, setLogList] = useState([]);

  const getData = async () => {
    try {
      await getDocs(collection(db, "logs")).then((docs) => {
        docs.forEach((doc) => {
          setLogList((current) => [...current, doc.id]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle props={{ title: "Logs" }} />
      <ul className={styles.logs}>
        {logList.length !== 0 ?
          logList.map((value, index) => {
            return (
              <li className={styles.li} key={index}>
                <Link to={`/logs/${value}`}>{value}</Link>
              </li>
            );
          }) :
          <li>Loading...</li>}
      </ul>
    </div>
  );
}

export default LogPage;