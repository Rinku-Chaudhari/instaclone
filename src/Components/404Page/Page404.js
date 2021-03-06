import React from "react";
import "./Page404.css";

import Loadericon from "../Loadericon/Loadericon";

const Page404 = () => {
  return (
    <div className="page_404">
      <Loadericon />
      <p>oops, page not found!</p>
    </div>
  );
};

export default Page404;
