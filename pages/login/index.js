import React from "react";
import { SEOMeta } from "../../src/components/common/seo";
import { Login } from "../../src/pages/login";
import Navbar from "../../src/components/Navbar";

const LoginContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Login {...props} />
    </Navbar>
  </>
);

export default LoginContainer;
