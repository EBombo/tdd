import React from "react";
import { Event } from "../../src/pages/event";
import { SEOMeta } from "../../src/components/common/seo";
import { PaidUserPrivateRoute } from "../../src/routes/PaidUserPrivateRoute";

const SEO = {
  title: "TDD - Virtual event",
  description: "",
  keywords: "",
};

const EventContainer = (props) => (
  <PaidUserPrivateRoute>
    <SEOMeta {...props} seo={SEO} />
    <Event {...props} />
  </PaidUserPrivateRoute>
);

export default EventContainer;
