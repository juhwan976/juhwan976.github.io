import React from "react";
import PageTitle from "../components/for_page/page_title";

function BlogPage({ props }) {
  return (
    <div>
      <PageTitle props={{ title: "Blog" }} />
      <p>content is here</p>
    </div>
  );
}

export default BlogPage;