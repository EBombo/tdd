import React, { useEffect, useGlobal } from "reactn";
import styled from "styled-components";
import { Button } from "../../components/form";
import { Culqi, CulqiProvider } from "react-culqi";
import { config } from "../../firebase";
import { useSendError } from "../../hooks";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";

const currency = "PEN";
const defaultCost = 200;

// Reference:
// Tarjetas de prueba: https://docs.culqi.com/#/desarrollo/tarjetas

export const CulqiComponent = (props) => {
  const router = useRouter();

  const { Fetch } = useFetch();
  const { sendError } = useSendError();

  const [authUser] = useGlobal("user");

  const [cost, setCost] = useState(defaultCost);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) return;

    // TODO: Redirect after register page is available.
    //router.push("/login");
  }, [authUser]);

  const purchasing = async (event) => {
    try {
      setIsLoading(true);

      const { error } = await Fetch(`${config.serverUrl}/users/${authUser.id}/payment`, "POST", {
        user: authUser,
        email: event.email,
        source_id: event.id,
        currency_code: currency,
        amount: cost,
      });

      if (error) throw Error(error);

      props.showNotification("Ok", "Su compra fue exitosa", "success");
    } catch (error) {
      console.error(error);
      sendError(error, "purchasing");
      props.showNotification("Error", "Algo salio mal, intente nuevamente");
    }

    setIsLoading(false);
  };

  const onError = (error) => {
    console.log("error", error);
    sendError(error, "Culqi-onError");
    props.showNotification("Error", "Algo salio mal intentalo nuevamente");
  };

  return (
    <CulqiComponentStyled>
      <CulqiProvider
        title="TDD"
        onError={onError}
        currency={currency}
        onToken={purchasing}
        publicKey={config.culqi}
        description="COMPRAR ENTRADAS"
        options={{ style: { logo: `${config.storageUrl}/resources/logo-tdd-utp-vector.svg` } }}
      >
        <Culqi>
          {({ openCulqi, setAmount }) => {
            return (
              <div className="flex mt-6">
                <Button
                  primary
                  margin="m-auto"
                  fontSize="text-xl"
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={() => {
                    // TODO: Implement coupons.
                    const formattedCost = cost * 100;
                    setAmount(formattedCost);
                    openCulqi();
                  }}
                >
                  PAGAR ENTRADA
                </Button>
              </div>
            );
          }}
        </Culqi>
      </CulqiProvider>
    </CulqiComponentStyled>
  );
};

const CulqiComponentStyled = styled.div``;
