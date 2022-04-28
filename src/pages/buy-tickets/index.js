import React from "reactn";
import styled from "styled-components";

export const BuyTickets = (props) => {
  return (
    <BuyTicketsStyled>
      <div className="min-h-[calc(100vh-50px)] lg:min-h-[calc(100vh-120px)] w-full bg-index bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <div className="">
          <div>Comprar entradas</div>
        </div>
      </div>
    </BuyTicketsStyled>
  );
};

const BuyTicketsStyled = styled.div``;
