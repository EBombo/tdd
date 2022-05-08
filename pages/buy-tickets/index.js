import React from "react";
import Navbar from "../../src/components/Navbar";
import { BuyTickets } from "../../src/pages/buy-tickets";
import { SEOMeta } from "../../src/components/common/seo";
import { UserPrivateRoute } from "../../src/routes/UserPrivateRoute";

const LoginContainer = (props) => (
  <UserPrivateRoute>
    <SEOMeta {...props} />
    <Navbar>
      <BuyTickets {...props} />
    </Navbar>
  </UserPrivateRoute>
);

export default LoginContainer;
