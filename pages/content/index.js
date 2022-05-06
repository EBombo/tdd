import React from "reactn";
import Navbar from "../../src/components/Navbar";
import { Content } from "../../src/pages/content";
import { SEOMeta } from "../../src/components/common/seo";

const ContentContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Content {...props} />
    </Navbar>
  </>
);

export default ContentContainer;

