import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import styled from "styled-components";

import Countdown from "../../components/Countdown";

export const Home = (props) => {
  const router = useRouter();

  const [authUser] = useGlobal("user");

  useEffect(() => {
    router.prefetch("/library");
    router.prefetch("/library/events");
    router.prefetch("/events/[eventId]");
  }, []);

  useEffect(() => {
    if (!authUser) return;

    router.push("/");
  }, [authUser]);


  return (
    <LandingContainer>

      <div className="min-h-screen">

      </div>

      <Countdown />

    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  font-family: 'Encode Sans', sans-serif;
`;
