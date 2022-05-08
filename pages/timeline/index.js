import React from "react";
import { SEOMeta } from "../../src/components/common/seo";
import { Timeline } from "../../src/pages/timeline";
import Navbar from "../../src/components/Navbar";

const TimelineContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <Timeline {...props} />
    </Navbar>
  </>
);

export default TimelineContainer;
