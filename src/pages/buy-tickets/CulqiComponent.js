import React, { useEffect, useGlobal } from "reactn";
import styled from "styled-components";
import { Button } from "../../components/form";
import { Culqi, CulqiProvider } from "react-culqi";
import { config } from "../../firebase";
import { useSendError } from "../../hooks";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";

const currency = "PEN";
const defaultCost = 20000;

// Reference:
// Tarjetas de prueba: https://docs.culqi.com/#/desarrollo/tarjetas

export const CulqiComponent = (props) => {
  const router = useRouter();

  const { Fetch } = useFetch();
  const { sendError } = useSendError();

  const [authUser] = useGlobal("user");

  useEffect(() => {
    if (authUser) return;

    //router.push("/login");
  }, [authUser]);

  const purchasing = async (event) => {
    try {
      console.log({ event });

      const { error } = await Fetch(`${config.serverUrl}/users/:userId/pucharse/:amount`, "POST", {
        user: authUser,
        pucharse: event,
      });

      if (error) throw Error(error);

      props.showNotification("Ok", "Su compra fue exitosa", "success");
    } catch (error) {
      console.error(error);
      sendError(error, "purchasing");
    }
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
                  onClick={() => {
                    setAmount(defaultCost);
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
