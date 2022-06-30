import React from "react";
import "@assets/common.css";
import Banner from "@components/Banner";
import CreateProject from "./CreateProject";

function Home() {
  return (
    <div className="content">
      <Banner />
      <CreateProject />
    </div>
  );
}

export default Home;
