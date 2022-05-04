import React from "react";
import { SEOMeta } from "../../src/components/common/seo";
import { ForgotPassword } from "../../src/pages/forgot-password";
import Navbar from "../../src/components/Navbar";

const Recovery = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <ForgotPassword {...props} />
    </Navbar>
  </>
);

export default Recovery;
