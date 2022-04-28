import React from "reactn";
import { SEOMeta } from "../src/components/common/seo";
import { Home } from "../src/pages/home";
import Navbar from "../src/components/Navbar";

const Init = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Home />
    </Navbar>
  </>
);

export default Init;
