import React, { useState } from "reactn";
import { useAuth } from "../../hooks/useAuth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../components/form";

export const ForgotPassword = (props) => {
  const { recoveryPassword } = useAuth();

  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loadingSendEmailStatus, setLoadingSendEmailStatus] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const recoverPassword = async (data) => {
    try {
      setLoadingSendEmailStatus(true);
      const response = await recoveryPassword(data.email.toLowerCase());

      if (!response.success) {
        setErrorMessage(response.error);
        throw response.error;
      }

      setEmailSent(true);
    } catch (error) {
      console.error(error);
    }
    setLoadingSendEmailStatus(false);
  };

  return (
    <div>
      <div className="w-full bg-landing bg-no-repeat bg-cover h-full p-4 justify-center md:p-8 md:min-h-[calc(100vh-100px)] md:flex md:justify-end">
        <form
          className="max-w-[500px] bg-white/[.60] h-[fit-content] rounded-[10px] p-4"
          onSubmit={handleSubmit(recoverPassword)}
        >
          {emailSent ? (
            <>
              <div className="text-['Encode Sans'] font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[44px]">
                Muy bien!
              </div>

              <p className="my-4 text-['Encode Sans'] text-[14px] leading-[16px] text-blackDarken">
                Le hemos enviado un correo electrónico con instrucciones para restablecer su contraseña.
              </p>
            </>
          ) : (
            <>
              <div className="text-['Encode Sans'] font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[44px]">
                Recuperar contraseña
              </div>
              <div className="text-['Encode Sans'] text-[14px] leading-[16px] text-blackDarken tracking-wide mt-4">
                Por favor, introduce la dirección de correo electrónico asociada a tu cuenta. Te enviaremos un correo
                electrónico que te permitirá crear una nueva contraseña.
              </div>
              {errorMessage ? <h3>{errorMessage}</h3> : <br />}
              <Input
                required
                variant="primary"
                type="email"
                name="email"
                ref={register}
                autoComplete="off"
                error={errors.email}
                className="input-forgot-password-desktop"
                placeholder={"Correo"}
              />
              <Button
                primary
                margin="m-0 mt-4"
                htmltype="submit"
                loading={loadingSendEmailStatus}
                disabled={loadingSendEmailStatus}
              >
                Recuperar contraseña
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
