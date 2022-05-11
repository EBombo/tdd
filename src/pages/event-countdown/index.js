import React, { useGlobal } from "reactn";
import { useRouter } from "next/router";
import Countdown from "../../components/Countdown";
import { Image } from "../../components/common/Image";
import { useEffect, useMemo, useState } from "react";
import { firestore, config } from "../../firebase";
import { defaultCost } from "../../business";
import { spinLoader } from "../../components/common/loader";

const defaultDiscount = 0;

export const EventCountdown = (props) => {
  const router = useRouter();

  const [authUser] = useGlobal("user");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authUser) return;

    const fetchPayments = () => {
      // setIsLoading(true);
      
      return firestore
        .collection("payments")
        .where("user.id", "==", authUser.id)
        .limit(1)
        .onSnapshot((paymentSnapShot) => {
          if (!paymentSnapShot.empty) return setIsLoading(false);

          // Redirect to / if does not have a payment.
          // router.push("/")
        });
    };

    const sub = fetchPayments();
    return () => {
      sub && sub();
    };
  }, [authUser]);

  if (isLoading) return spinLoader();

  return (
    <>
      <div className="sm:px-1 min-h-[calc(100vh-100px)] w-full bg-register bg-no-repeat bg-cover bg-bottom flex flex-col justify-center">

        <div className="bg-white/[.60] lg:max-w-[1200px] grid lg:grid-cols-[auto_300px] gap-4 p-8 mb-8">
          <div className="">
            <p className="text-xl lg:text-4xl font-bold uppercase mb-4 px-10">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</p>
            <p className="text-md lg:text-base px-10">Hacia un desarrollo digital sostenible e inclusivo.</p>
          </div>
          <div className="w-[70%] lg:w-auto"><Image className="inline-block" src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`} /></div>
        </div>

        <div className="grid lg:grid-cols-[min-content_auto]">
          <div className="bg-blackDarken mx-4 lg:mx-0 px-8 pt-10">
            <p className="text-primary text-lg lg:text-4xl font-bold px-10">¡Ya tienes entrada!</p>
            <div className="max-w-[800px]"><Countdown disableSponsors dark titleAlignment="text-left" title="El congreso inicia en:" titlePadding="pt-4 px-10" containerPadding="pt-4 md:pt-12 pb-12" /></div>
          </div>
        </div>
        
      </div>
    </>
  );
};

