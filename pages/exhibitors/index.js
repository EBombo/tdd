import React from "react";
import { SEOMeta } from "../../src/components/common/seo";
import { Exhibitors } from "../../src/pages/exhibitors";
import Navbar from "../../src/components/Navbar";

const ExhibitorsContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Exhibitors {...props} />
    </Navbar>
  </>
);

export default ExhibitorsContainer;
