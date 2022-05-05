import React, { useEffect, useGlobal, useState } from "reactn";
import { Button, Input } from "../../components/form";
import Countdown from "../../components/Countdown";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import { StudentRegister } from "./StudentRegister";
import { VisitorRegister } from "./VisitorRegister";

export const Register = (props) => {
  const router = useRouter();

  const { signUp } = useAuth();

  const [authUser] = useGlobal("user");

  const [tab, setTab] = useState(0);

  useEffect(() => {
    router.prefetch("/login");
  }, []);

  useEffect(() => {
    //TODO: DEFINIR A DONDE SE REDIRIGE AL USUARIO LUEGO DEL REGISTRO
    if (authUser) router.push("/");
  }, [authUser]);

  const signUpUser = async (user) => {
    if (user.email !== user.email2) return props.showNotification("Error", "Los emails no coinciden.");

    delete user.email2;

    await signUp(user);
  };

  return (
    <div>
      <div className="w-full relative bg-register bg-no-repeat bg-cover p-4 justify-center lg:min-h-[calc(100vh-100px)] md:p-8 lg:flex lg:justify-end">
        <div className="col-start-1 col-end-2 bg-white/[.60] max-w-[500px] p-4 hidden absolute bottom-0 left-8 xl:block lg:p-8">
          <h2 className="text-xl lg:text-4xl font-bold mb-6">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</h2>

          <p className="text-base lg:text-xl mb-8">Hacia un desarrollo digital sostenible e inclusivo.</p>

          <Button margin="m-0" primary onClick={() => router.push(authUser ? "/buy-tickets" : "/register")}>
            Adquirir entrada
          </Button>

          <div className="my-8">
            <Image
              src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`}
              height="130px"
              width="340px"
              size="contain"
              margin="0"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center px-2 gap-[5px]">
            <div
              className={`rounded-tl-[10px] p-2 cursor-pointer rounded-tr-[10px] text-['Encode Sans'] text-[12px] leading-[14px] md:text-[16px] md:leading-[20px] font-600 text-white ${
                tab === 0 ? `bg-primary` : `bg-grayLighten`
              }`}
              onClick={() => setTab(0)}
            >
              No soy alumno universitario
            </div>
            <div
              className={`rounded-tl-[10px] p-2 cursor-pointer rounded-tr-[10px] text-['Encode Sans'] text-[12px] leading-[14px] md:text-[16px] md:leading-[20px] font-600 text-white ${
                tab === 1 ? `bg-primary` : `bg-grayLighten`
              }`}
              onClick={() => setTab(1)}
            >
              Soy alumno universitario
            </div>
          </div>
          <div className="w-full lg:w-[800px] bg-white/[.60] h-[fit-content] rounded-[10px] p-4">
            {tab === 1 ? (
              <StudentRegister signUpUser={signUpUser} {...props} />
            ) : (
              <VisitorRegister signUpUser={signUpUser} {...props} />
            )}
          </div>
        </div>
      </div>

      <Countdown />
    </div>
  );
};
