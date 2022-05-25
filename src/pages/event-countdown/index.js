import React, { useGlobal } from "reactn";
import { useRouter } from "next/router";
import { useState } from "react";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { Image } from "../../components/common/Image";
import { Button } from "../../components/form";
import { useInterval } from "../../hooks/useInterval";

export const EventCountdown = (props) => {
  const router = useRouter();

  const [deadline] = useGlobal("deadline");

  const [isDeadlinedFinished, setIsDeadlinedFinished] = useState(false);

  useInterval(() => {
    const finishedDeadline = () => {
      if (!deadline) return;

      const currentTime = new Date().getTime();
      const deadlineTime = deadline.getTime();

      setIsDeadlinedFinished(currentTime > deadlineTime);
    };

    finishedDeadline();
  }, 1000);

  return (
    <>
      <div className="sm:px-1 min-h-[calc(100vh-100px)] w-full bg-register bg-no-repeat bg-cover bg-bottom flex flex-col justify-center">
        <div className="bg-white/[.80] lg:max-w-[1200px] grid lg:grid-cols-[auto_300px] gap-4 p-8 mb-8">
          <div className="">
            <p className="text-xl lg:text-4xl font-bold uppercase mb-4 px-10">
              I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL
            </p>
            <p className="text-md lg:text-base px-10">Hacia un desarrollo digital sostenible e inclusivo.</p>
          </div>
          <div className="w-[70%] lg:w-auto">
            <Image className="inline-block" src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`} />
          </div>
        </div>

        <div className="grid lg:grid-cols-[min-content_auto]">
          <div className="bg-blackDarken mx-4 lg:mx-0 px-8 pt-10">
            <p className="text-primary text-lg lg:text-4xl font-bold px-10">¡Ya tienes entrada!</p>
            {!deadline ? (
              spinLoaderMin()
            ) : isDeadlinedFinished ? (
              <div className="px-10 py-8">
                <Button primary margin="m-0" onClick={() => window.open("/event", "_blank")}>
                  Unirse al evento
                </Button>
              </div>
            ) : (
              <div className="max-w-[800px]">
                <Countdown
                  disableSponsors
                  dark
                  titleAlignment="text-left"
                  title="El congreso inicia en:"
                  titlePadding="pt-4 px-10"
                  containerPadding="pt-4 md:pt-12 pb-12"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
