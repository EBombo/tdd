import React, { useGlobal } from "reactn";
import { CulqiComponent } from "./CulqiComponent";
import Countdown from "../../components/Countdown";
import { CouponForm } from "./CouponForm";
import { useEffect, useMemo, useState } from "react";
import { firestore } from "../../firebase";

const defaultCost = 200;
const defaultDiscount = 0;

export const BuyTickets = (props) => {
  const [authUser] = useGlobal("user");

  const [cost] = useState(defaultCost);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(defaultDiscount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authUser) return;

    const fetchPayments = () =>
      firestore
        .collection("payments")
        .where("user.id", "==", authUser.id)
        .limit(1)
        .onSnapshot((paymentSnapShot) => {
          if (paymentSnapShot.empty) return;

          // TODO: Redirect to event.
          //router.push("/")
        });

    const sub = fetchPayments();
    return () => {
      sub && sub();
    };
  }, [authUser]);

  const totalCost = useMemo(() => {
    return +(cost - discount);
  }, [cost, discount]);

  return (
    <>
      <div className="min-h-[calc(100vh-50px)] sm:px-1 lg:min-h-[calc(100vh-120px)] w-full bg-register bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <div className="lg:w-[450px] md:mr-[100px] md:ml-auto my-auto rounded-md p-8 bg-blackDarken mx-2">
          <div className="mb-4 grid grid-cols-[auto_1fr]">
            <div className="text-3xl text-bold text-primary text-left">Adquirir entrada</div>
            <span className="w-full h-[1px] bg-primary ml-6 m-auto" />
          </div>

          <div className="text-white text-left mb-6">
            Obtén acceso a toda la feria durante toda su duración y asiste a todas las presentaciones
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
