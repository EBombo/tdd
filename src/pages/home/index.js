import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import styled from "styled-components";

import {config} from "../../firebase";
import Countdown from "../../components/Countdown";
import { Button } from "../../components/form/Button";
import { Image } from "../../components/common/Image";
import { PreviewCarousel } from "../../components/PreviewCarousel";

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
      <div className="h-full bg-index bg-no-repeat bg-cover flex lg:items-end bg-bottom">
          {/*
        <div className="mt-8 lg:mt-0 lg:mx-12 grid lg:grid-cols-3 w-[90%] lg:w-full h-[50%] lg:h-[75%]">
          <div className="col-start-1 col-end-2 bg-whiteTransparent p-4 lg:p-8">
            <h2 className="text-xl lg:text-3xl font-bold mb-4">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</h2>
            <p className="text-base lg:text-lg mb-8">Hacia un desarrollo digital sostenible e inclusivo.</p>
            <Button margin="m-0" primary onClick={() => {}}>Adquirir entrada</Button>
          </div>
        </div>
          */}
      </div>

      <Countdown />

      <div className="bg-white">
        <div className="text-center text-xl lg:text-4xl font-bold pt-4 mb-8">¿Quiénes somos?</div>

        <div className="bg-black text-white py-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-20">
          <div className="px-10 py-4 max-w-[500px] mx-auto"><Image src={`${config.storageUrl}/resources/logo-tdd-utp-vector-white.svg`} /></div>
          <div className="px-10">
            <p className="mb-8 text-base lg:text-2xl text-right">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <div className="text-right"><Button primary margin="m-0" onClick={() => {}}>Ir al TDD</Button></div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center text-xl lg:text-4xl font-bold pt-4 mb-8">Expositores</div>

          <PreviewCarousel items={[{}]} />
        </div>
      </div>

      <div className="bg-white py-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center text-xl lg:text-4xl font-bold pt-4 mb-8">Expositores</div>

        </div>
      </div>

    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  font-family: 'Encode Sans', sans-serif;
`;
