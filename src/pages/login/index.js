import React, { useEffect, useGlobal } from "reactn";
import { Anchor, Button, Input } from "../../components/form";
import { useForm } from "react-hook-form";
import Countdown from "../../components/Countdown";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

export const Login = (props) => {
  const router = useRouter();

  const { signIn } = useAuth();

  const [authUser] = useGlobal("user");

  useEffect(() => {
    router.prefetch("/buy-tickets");
    router.prefetch("/register");
  }, []);

  const schema = object().shape({
    email: string().required().email(),
    password: string().required(),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  return (
    <div>
      <div className="w-full bg-landing bg-no-repeat bg-cover h-[calc(100vh-50px)] p-4 justify-center md:p-8 md:flex md:justify-end">
        <form
          className="max-w-[500px] bg-white/[.60] h-[fit-content] rounded-[10px] p-4"
          onSubmit={handleSubmit(signIn)}
        >
          <div className="text-['Encode Sans'] font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[44px]">
            Iniciar sesión
          </div>
          <div className="my-4">Si ya tienes tu entrada, ingresa con tu correo y tu contraseña</div>
          <div className="mb-4">
            <Input name="email" type="text" ref={register} error={errors.email} height="50px" placeholder="Correo" />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              ref={register}
              error={errors.password}
              height="50px"
              placeholder="Contraseña"
            />
          </div>

          <div className="my-4">
            <span className="flex items-center gap-[5px] text-['Encode Sans'] text-blackDarken font-[400] text-[16px] leading-[20px]">
              <p className="">¿Olvidaste tu contraseña?</p>
              <Anchor
                underlined
                url="/recovery"
                variant="primary"
                display="block"
                fontSize="1rem"
                fontWeight="bold"
                textAlign="left"
              >
                Entra aquí
              </Anchor>
            </span>
          </div>
          <Button primary margin="my-4" htmlType="submit">
            Ingresar
          </Button>

          <div className="py-4">
            <div className="text-['Encode Sans'] text-blackDarken font-[400] text-[16px] leading-[20px]">
              Si aún no tienes tu entrada para la feria ¡Estás atiempo para conseguirla!
            </div>

            <Button primary margin="my-4" onClick={() => router.push(authUser ? "/buy-tickets" : "/register")}>
              Adquirir entrada
            </Button>
          </div>
        </form>
      </div>

      <Countdown />
    </div>
  );
};
