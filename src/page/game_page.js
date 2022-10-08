import React, { useEffect, useState } from "react";
import PageTitle from "../components/for_page/page_title";

function GamePage({ props }) {
  return (
    <div>
      <PageTitle props={{ title: "Game page" }} />
    </div>
  );
}

export default GamePage;