import React from "react";
import Navbar from "../../src/components/Navbar";
import { BuyTickets } from "../../src/pages/buy-tickets";
import { SEOMeta } from "../../src/components/common/seo";

// TODO: Use <UserPrivateRoute/>.
const LoginContainer = (props) => (
  <>
    <SEOMeta {...props} />
    <Navbar>
      <BuyTickets {...props} />
    </Navbar>
  </>
);

export default LoginContainer;
