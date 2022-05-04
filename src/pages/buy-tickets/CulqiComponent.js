import React, { useEffect, useGlobal } from "reactn";
import { Button } from "../../components/form";
import { Culqi, CulqiProvider } from "react-culqi";
import { config } from "../../firebase";
import { useSendError } from "../../hooks";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";

const currency = "PEN";

// Reference:
// Tarjetas de prueba: https://docs.culqi.com/#/desarrollo/tarjetas
// dev dashboard: https://integ-panel.culqi.com/#/dashboard
// prod dashboard: https://panel.culqi.com/#/dashboard
export const CulqiComponent = (props) => {
  const router = useRouter();

  const { Fetch } = useFetch();
  const { sendError } = useSendError();

  const [authUser] = useGlobal("user");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) return;

    router.push("/login");
  }, [authUser]);

  const purchasing = async (event) => {
    try {
      setIsLoading(true);

      const { error } = await Fetch(`${config.serverUrl}/users/${authUser.id}/payment`, "POST", {
        user: authUser,
        email: event.email,
        source_id: event.id,
        currency_code: currency,
        amount: +props.totalCost,
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
                fontSize="text-lg"
                loading={isLoading}
                disabled={isLoading}
                margin="mx-auto mt-2"
                onClick={() => {
                  const formattedCost = +props.totalCost * 100;
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
  );
};
