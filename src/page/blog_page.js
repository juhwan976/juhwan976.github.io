import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";
import styles from "./blog_page.module.css";
import { Link } from "react-router-dom";
import PageContent from "../components/for_page/page_content";
import ReactPaginate from "react-paginate";

function BlogPage({ props }) {
  const itemsPerPage = 10;

  const [totalLength, setTotalLength] = useState(0);
  const [currentPostList, setCurrentPostList] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const getData = async (startOffset, endOffset) => {
    const collectionRef = collection(db, "blog");
    const collectionSnap = await getDocs(query(collectionRef, orderBy("timeStamp", "desc")));

    const posts = collectionSnap.docs;

    setTotalLength(posts.length);

    let data = [];

    posts.slice(startOffset, endOffset).forEach((post) => {
      data.push({ title: post.data()['title'], timeStamp: post.data()['timeStamp'] });
    });

    setCurrentPostList(data);
  }

  useEffect(() => {
    setPageCount(Math.ceil(totalLength / itemsPerPage));
  }, [totalLength]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    getData(itemOffset, endOffset);
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalLength;
    setItemOffset(newOffset);
  }

  return (
    <div>
      <PageTitle props={{ title: "Blog" }} />
      <PageContent>
        <ul className={styles.ul}>
          {currentPostList.length !== 0 ?
            currentPostList.map((content, index) => {
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
        <ReactPaginate
          className={styles.paginate}
          pageClassName={styles.pages}
          activeClassName={styles.active_page}
          nextClassName={styles.next}
          nextLabel="Next"
          previousClassName={styles.previous}
          previousLabel="Previous"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
        />
      </PageContent>
    </div>
  );
}

export default BlogPage;