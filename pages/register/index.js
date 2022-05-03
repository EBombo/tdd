import React from "react";
import { SEOMeta } from "../../src/components/common/seo";
import { Register } from "../../src/pages/register";
import Navbar from "../../src/components/Navbar";

const RegisterContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Register {...props} />
    </Navbar>
  </>
);

export default RegisterContainer;
