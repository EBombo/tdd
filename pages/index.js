import React from "reactn";
import { SEOMeta } from "../src/components/common/seo";
import { Home } from "../src/pages/home";

const Init = (props) => (
  <>
    <SEOMeta {...props} />
    <Home/>
  </>
);

export default Init;
