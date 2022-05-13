import React from "react";
import { Event } from "../../src/pages/event";
import { SEOMeta } from "../../src/components/common/seo";
import { PaidUserPrivateRoute } from "../../src/routes/PaidUserPrivateRoute";

const EventContainer = (props) => (
  <PaidUserPrivateRoute>
    <SEOMeta {...props} />
    <Event {...props} />
  </PaidUserPrivateRoute>
);

export default EventContainer;
