import React, { useGlobal } from "reactn";
import { CulqiComponent } from "./CulqiComponent";
import Countdown from "../../components/Countdown";
import { CouponForm } from "./CouponForm";
import { useMemo, useState } from "react";
import { defaultCost } from "../../business";
import { EventCountdown } from "../event-countdown";
import { Desktop } from "../../constants";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";

const defaultDiscount = 0;

export const BuyTickets = (props) => {
  const [authUser] = useGlobal("user");
  const [isFreeDay] = useGlobal("isFreeDay");

  const [cost] = useState(defaultCost);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(defaultDiscount);
  const [isLoading, setIsLoading] = useState(false);

  const totalCost = useMemo(() => {
    return +(cost - discount);
  }, [cost, discount]);

  const canSeeEvent = useMemo(() => {
    /**
    Disable payment
     **/
    return true;

    return authUser?.studentId || authUser?.hasPayment || isFreeDay;
  }, [authUser, isFreeDay]);

  /**
   * The user can see the event.
   * **/
  if (canSeeEvent) return <EventCountdown {...props} />;

  return (
    <>
      <div className="min-h-[calc(100vh-50px)] sm:px-1 lg:min-h-[calc(100vh-120px)] w-full bg-register bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <Desktop>
          <div className="col-start-1 col-end-2 bg-white/[.80] max-w-[500px] p-4 lg:p-8 ml-4">
            <h2 className="text-2xl font-bold mb-4">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</h2>

            <div className="text-base my-4">
              <b>Hacia un desarrollo digital sostenible e inclusivo.</b>
            </div>

            <Countdown
              title="El congreso empieza en:"
              titlePadding={"-"}
              titleMargin={"my-2"}
              containerPadding={"py-8 px-2"}
              disableSponsors
              scale
              dark
            />

            <div className="py-4 max-w-[280px]">
              <Image className="inline-block" src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`} />
            </div>
          </div>
        </Desktop>

        <div className="lg:w-[450px] md:mr-[100px] md:ml-auto my-auto rounded-md p-8 bg-blackDarken mx-2">
          <div className="mb-4 grid grid-cols-[auto_1fr]">
            <div className="text-3xl text-bold text-primary text-left">Adquirir entrada</div>
            <span className="w-full h-[1px] bg-primary ml-6 m-auto" />
          </div>

          <div className="text-white text-left mb-6">
            Obtén acceso a toda la feria durante toda su duración, asiste a todas las presentaciones y recibe un
            certificado por tu participación.
          </div>

          <div className="text-primary">Precio general</div>

          <div className="text-white text-left">
            <div className="text-7xl text-bold">
              {cost}
              <span className="text-base text-normal">soles</span>
            </div>
          </div>

          <CouponForm
            {...props}
            isLoading={isLoading}
            setCoupon={setCoupon}
            setDiscount={setDiscount}
            setIsLoading={setIsLoading}
          />

          <div className="text-white">Sub total: {cost.toFixed(2)} </div>
          <div className="text-white">Descuento por cupón: {discount.toFixed(2)} </div>
          <div className="w-full h-[1px] bg-white mt-1 mb-2" />
          <div className="text-white text-xl">Total: {totalCost.toFixed(2)}</div>

          <CulqiComponent
            {...props}
            coupon={coupon}
            totalCost={totalCost}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>

      <Countdown />
    </>
  );
};
