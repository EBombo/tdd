import React from "reactn";
import { CulqiComponent } from "./CulqiComponent";
import Countdown from "../../components/Countdown";
import { CouponForm } from "./CouponForm";
import { useMemo, useState } from "react";

const defaultCost = 200;
const defaultDiscount = 0;

export const BuyTickets = (props) => {
  const [cost] = useState(defaultCost);
  const [discount, setDiscount] = useState(defaultDiscount);

  const totalCost = useMemo(() => {
    return +(cost - discount);
  }, [cost, discount]);

  return (
    <>
      <div className="min-h-[calc(100vh-50px)] sm:px-1 lg:min-h-[calc(100vh-120px)] w-full bg-index bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <div className="lg:w-[450px] sm:w-[300px] md:mr-[100px] md:ml-auto my-auto rounded-md p-6 bg-blackDarken">
          <div className="text-xl text-primary mb-4 text-left">Arquirir entrada</div>

          <div className="text-white text-left mb-4">
            Obtén acceso a toda la feria durante toda su duración y asiste a todas las presentaciones
          </div>

          <div className="text-primary">Precio general</div>

          <div className="text-white text-left">
            <div className="text-7xl text-bold">
              {cost}
              <span className="text-xs text-normal">soles</span>
            </div>
          </div>

          <CouponForm {...props} setDiscount={setDiscount} />

          <div className="text-white">Sub total: {cost.toFixed(2)} </div>
          <div className="text-white">Descuento por cupón: {discount.toFixed(2)} </div>
          <div />
          <div className="text-white text-md">Total: {totalCost.toFixed(2)}</div>

          <CulqiComponent {...props} totalCost={totalCost} />
        </div>
      </div>

      <Countdown />
    </>
  );
};
