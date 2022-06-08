import React from "reactn";
import { Resume } from "../../src/pages/resume";
import Navbar from "../../src/components/Navbar";
import { SEOMeta } from "../../src/components/common/seo";

const ResumeContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Resume {...props} />
    </Navbar>
  </>
);

export default ResumeContainer;
