import React, { useEffect, useGlobal } from "reactn";
import { Button } from "../../components/form";
import { Culqi, CulqiProvider } from "react-culqi";
import { config } from "../../firebase";
import { useSendError } from "../../hooks";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";

const currency = "PEN";
const minCost = 0;

// Reference:
// Tarjetas de prueba: https://docs.culqi.com/#/desarrollo/tarjetas
// dev dashboard: https://integ-panel.culqi.com/#/dashboard
// prod dashboard: https://panel.culqi.com/#/dashboard
export const CulqiComponent = (props) => {
  const router = useRouter();

  const { Fetch } = useFetch();
  const { sendError } = useSendError();

  const [authUser] = useGlobal("user");

  useEffect(() => {
    if (authUser) return;

    router.push("/login");
  }, [authUser]);

  const purchasing = async (event) => {
    try {
      props.setIsLoading(true);

      const { error } = await Fetch(`${config.serverUrl}/users/${authUser.id}/payment`, "POST", {
        user: authUser,
        coupon: props.coupon,
        source_id: event?.id,
        currency_code: currency,
        amount: +props.totalCost,
        email: event?.email ?? authUser.email,
      });

      if (error) throw Error(error);

      props.showNotification("Ok", "Su compra fue exitosa", "success");
    } catch (error) {
      console.error(error);
      sendError(error, "purchasing");
      props.showNotification("Error", "Algo salio mal, intente nuevamente");
    }

    props.setIsLoading(false);
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
                width="w-full"
                fontSize="text-base"
                margin="mx-auto mt-2"
                loading={props.isLoading}
                disabled={props.isLoading}
                onClick={() => {
                  /** Total cost can be less than zero. **/
                  if (props.totalCost * 100 <= minCost) return purchasing();

                  const formattedCost = +props.totalCost * 100;
                  setAmount(formattedCost);
                  openCulqi();
                }}
              >
                Comprar
              </Button>
            </div>
          );
        }}
      </Culqi>
    </CulqiProvider>
  );
};
