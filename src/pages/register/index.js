import React, { useEffect, useGlobal } from "reactn";
import { Button, Input } from "../../components/form";
import Countdown from "../../components/Countdown";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export const Register = (props) => {
  const router = useRouter();

  const { signUp } = useAuth();

  const [authUser] = useGlobal("user");
  const [isLoadingUser] = useGlobal("isLoadingUser");
  const [isLoadingCreateUser] = useGlobal("isLoadingCreateUser");

  useEffect(() => {
    router.prefetch("/login");
  }, []);

  const schema = object().shape({
    names: string().required(),
    surnames: string().required(),
    documentId: string().required(),
    phoneNumber: string().required().min(5),
    email: string().required().email(),
    email2: string().required().email(),
    password: string().required().min(6),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const signUpUser = async (user) => {
    if (user.email !== user.email2) return props.showNotification("Error", "Los emails no coinciden.");

    delete user.email2;

    await signUp({
      ...user,

    });
  };

  return (
    <div>
      <div className="w-full bg-register bg-no-repeat bg-cover h-full p-4 justify-center md:min-h-[calc(100vh-100px)] md:p-8 md:flex md:justify-end">
        <form
          className="max-w-[500px] bg-white/[.60] h-[fit-content] rounded-[10px] p-4"
          onSubmit={handleSubmit(signUpUser)}
        >
          <div className="text-['Encode Sans'] font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[44px]">
            Regístrate
          </div>
          <div className="my-4">Crea tu cuenta con tus datos para poder comprar tu entrada.</div>
          <div className="mb-4">
            <Input name="names" type="text" ref={register} error={errors.names} height="50px" placeholder="Nombres" />
          </div>
          <div className="mb-4">
            <Input
              name="surnames"
              type="text"
              ref={register}
              error={errors.surnames}
              height="50px"
              placeholder="Apellidos"
            />
          </div>
          <div className="mb-4">
            <Input
              name="documentId"
              type="text"
              ref={register}
              error={errors.documentId}
              height="50px"
              placeholder="DNI"
            />
          </div>
          <div className="mb-4">
            <Input
              name="phoneNumber"
              type="text"
              ref={register}
              error={errors.phoneNumber}
              height="50px"
              placeholder="Celular"
            />
          </div>
          <div className="mb-4">
            <Input name="email" type="text" ref={register} error={errors.email} height="50px" placeholder="Correo" />
          </div>
          <div className="mb-4">
            <Input
              name="email2"
              type="text"
              ref={register}
              error={errors.email2}
              height="50px"
              placeholder="Confirmar correo"
            />
          </div>

          <Input
            name="password"
            type="password"
            ref={register}
            error={errors.password}
            height="50px"
            placeholder="Contraseña"
          />

          <Button
            primary
            margin="mt-4"
            htmlType="submit"
            loading={isLoadingCreateUser}
            disabled={isLoadingUser || isLoadingCreateUser}
          >
            Registrarse
          </Button>

          <div className="py-4">
            <div className="text-['Encode Sans'] text-blackDarken font-[400] text-[16px] leading-[20px]">
              Si ya tienes una cuenta puedes ingresar con tu correo y contraseña.
            </div>

            <Button primary margin="mt-4" onClick={() => router.push("/login")}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>

      <Countdown />
    </div>
  );
};
