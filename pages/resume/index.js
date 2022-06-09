import React from "reactn";
import { Resume } from "../../src/pages/resume";
import Navbar from "../../src/components/Navbar";
import { SEOMeta } from "../../src/components/common/seo";
import { PaidUserPrivateRoute } from "../../src/routes/PaidUserPrivateRoute";

const ResumeContainer = (props) => (
  <PaidUserPrivateRoute>
    <SEOMeta {...props} />
    <Navbar>
      <Resume {...props} />
    </Navbar>
  </PaidUserPrivateRoute>
);

export default ResumeContainer;
