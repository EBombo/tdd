import React from "react";
import Navbar from "../../src/components/Navbar";
import { BuyTickets } from "../../src/pages/buy-tickets";
import { SEOMeta } from "../../src/components/common/seo";
import { UserPrivateRoute } from "../../src/routes/UserPrivateRoute";

const SEO = {
  title: "TDD - Buy tickets",
  description: "",
  keywords: "",
};

const LoginContainer = (props) => (
  <UserPrivateRoute>
    <SEOMeta {...props} seo={SEO} />
    <Navbar>
      <BuyTickets {...props} />
    </Navbar>
  </UserPrivateRoute>
);

export default LoginContainer;
