import React from "react";
import Navbar from "../../src/components/Navbar";
import { EventCountdown } from "../../src/pages/event-countdown";
import { SEOMeta } from "../../src/components/common/seo";
import { UserPrivateRoute } from "../../src/routes/UserPrivateRoute";

const EventCountdownContainer = (props) => (
  <UserPrivateRoute>
    <SEOMeta {...props} />
    <Navbar>
      <EventCountdown {...props} />
    </Navbar>
  </UserPrivateRoute>
);

export default EventCountdownContainer;
