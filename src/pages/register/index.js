import React, { useEffect, useGlobal, useState } from "reactn";
import { Button } from "../../components/form";
import Countdown from "../../components/Countdown";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import { StudentRegister } from "./StudentRegister";
import { VisitorRegister } from "./VisitorRegister";
import { useMemo } from "react";
import { registrationOptions } from "./dataList";
import { RegistrationOptions } from "./registrationOptions";

export const Register = (props) => {
  const router = useRouter();

  const { signUp } = useAuth();

  const [authUser] = useGlobal("user");

  const [registrationOption, setRegisterOption] = useState(null);

  useEffect(() => {
    router.prefetch("/login");
  }, []);

  useEffect(() => {
    if (!authUser) return;

    router.push("/buy-tickets");
  }, [authUser]);

  const signUpUser = async (user) => {
    if (user.email !== user.email2) return props.showNotification("Error", "Los emails no coinciden.");

    delete user.email2;

    await signUp(user);
  };

  const register = useMemo(() => {
    /** Show sign-up options. **/
    if (!registrationOption) return <RegistrationOptions setRegisterOption={setRegisterOption} {...props} />;

    /** Student form. **/
    if (registrationOption?.title === registrationOptions.student.title)
      return <StudentRegister setRegisterOption={setRegisterOption} signUpUser={signUpUser} {...props} />;

    /** Visitor form. **/
    return <VisitorRegister setRegisterOption={setRegisterOption} signUpUser={signUpUser} {...props} />;
  }, [registrationOption]);

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
          <div className="w-full lg:w-[800px] bg-white/[.60] h-[fit-content] rounded-[10px] p-4">{register}</div>
        </div>
      </div>

      <Countdown />
    </div>
  );
};
