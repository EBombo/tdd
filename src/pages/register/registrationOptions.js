import React, { useEffect } from "reactn";
import { registrationOptions } from "./dataList";
import { Button } from "../../components/form";
import { useRouter } from "next/router";
import { Image } from "../../components/common/Image";

export const RegistrationOptions = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/login");
  }, []);

  return (
    <div>
      <div className="text-['Encode Sans'] font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[44px]">
        Regístrate
      </div>

      <div className="mt-4 mb-8">Crea tu cuenta con tus datos para poder comprar tu entrada.</div>

      <div className="my-4">
        <b>Selecciona si eres o no alumno universitario:</b>
      </div>

      <div className="md:px-20 px-8">
        <div className="grid md:grid-cols-2 grid-cols-1">
          {Object.values(registrationOptions).map((registrationOption) => {
            return (
              <div className="w-[250px] cursor-pointer" key={registrationOption.title}>
                <div
                  className="mx-4 px-2 py-6 bg-white border border-2 hover:border-primary hover:text-primary hover:filter-none rounded-md grid filter grayscale cursor-pointer"
                  onClick={() => props.setRegisterOption(registrationOption)}
                >
                  <Image
                    className="inline-block"
                    src={registrationOption.icon}
                    desktopHeight="120px"
                    desktopWidth="120px"
                    cursor="pointer"
                    size="contain"
                    margin="auto"
                  />
                  <div className="text-lg px-8 text-center cursor-pointer">{registrationOption.title}</div>
                </div>

                <div className="text-xs mx-4 mt-4">{registrationOption.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">Si ya tienes una cuenta puedes ingresar con tu correo y contraseña.</div>

      <Button onClick={() => router.push("/login")}>Iniciar sesión</Button>
    </div>
  );
};
