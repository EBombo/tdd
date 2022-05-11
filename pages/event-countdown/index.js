import React from "react";
import Navbar from "../../src/components/Navbar";
import { EventCountdown } from "../../src/pages/event-countdown";
import { SEOMeta } from "../../src/components/common/seo";
import { PaidUserPrivateRoute } from "../../src/routes/PaidUserPrivateRoute";

const EventCountdownContainer = (props) => (
  <PaidUserPrivateRoute>
    <SEOMeta {...props} />
    <Navbar>
      <EventCountdown {...props} />
    </Navbar>
  </PaidUserPrivateRoute>
);

export default EventCountdownContainer;
