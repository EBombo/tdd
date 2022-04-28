import React from "reactn";
import styled from "styled-components";

import { Button } from "../../components/form";

export const BuyTickets = (props) => {
  return (
    <BuyTicketsStyled>
      <div className="min-h-[calc(100vh-50px)] lg:min-h-[calc(100vh-120px)] w-full bg-index bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <div className="w-[90%] m-auto bg-whiteTransparent rounded-md p-6">
          <div className="text-xl mb-2">Comprar entradas</div>

          <div className="lg:w-[50%] sm:w-[90%] m-auto rounded-md p-6 bg-blackDarken">
            <div className="text-xl text-primary mb-4 text-center">Entrada Full Access</div>

            <div className="text-white text-center mb-4">
              Obtén acceso a toda la feria durante toda su duración y asiste a todas las presentaciones
            </div>

            <div className="text-white text-center text-7xl text-bold">200</div>

            <div className="text-white text-center text-xl">soles</div>

            <div className="flex mt-4">
              <Button primary margin="m-auto" fontSize="text-xl">
                Pagar entrada
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BuyTicketsStyled>
  );
};

const BuyTicketsStyled = styled.div``;
