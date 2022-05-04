import React from "reactn";
import { CulqiComponent } from "./CulqiComponent";
import Countdown from "../../components/Countdown";

export const BuyTickets = (props) => {
  return (
    <>
      <div className="min-h-[calc(100vh-50px)] sm:px-1 lg:min-h-[calc(100vh-120px)] w-full bg-index bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <div className="lg:w-[450px] sm:w-[300px] md:mr-[100px] md:ml-auto my-auto rounded-md p-6 bg-blackDarken">
          <div className="text-xl text-primary mb-4 text-left">Arquirir entrada</div>

          <div className="text-white text-left mb-4">
            Obtén acceso a toda la feria durante toda su duración y asiste a todas las presentaciones
          </div>

          <div className="text-primary">Precio general</div>

          <div className="text-white text-left text-7xl text-bold flex">
            200
            <div className="text-white text-center text-xl">soles</div>
          </div>

          <CulqiComponent {...props} />
        </div>
      </div>

      <Countdown />
    </>
  );
};
