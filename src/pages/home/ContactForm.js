import React, { useEffect, useState } from "reactn";
import { Image } from "../../components/common/Image";
import { Anchor, Button, Input, TextArea } from "../../components/form";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useFetch } from "../../hooks/useFetch";
import { useSendError } from "../../hooks";
import { config } from "../../firebase";

export const ContactForm = (props) => {
  const { Fetch } = useFetch();
  const { sendError } = useSendError();

  const schema = object().shape({
    email: string().required().email(),
    name: string().required(),
    lastName: string().required(),
    message: string(),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const submitContact = async (data) => {
    try {
      const fetchProps = {
        url: `${config.serverUrl}/contact`,
        method: "POST",
        body: data,
      };

      const { error } = await Fetch(fetchProps.url, fetchProps.method, fetchProps.body);

      if (error) throw new Error(error);

      props.showNotification("Enviado", "Tu mensaje se ha enviado exitósamente", "info");
    } catch (error) {
      sendError(error, "submitContact");
      props.showNotification("Error", error.toString());
    }
  };

  return (
    <div className="mx-8">
      <div className="grid grid-cols-[4px_auto] mb-8">
        <div className="bg-pink-500"></div>
        <div className="ml-2 text-grayLight text-2xl font-normal">Contáctanos</div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(submitContact)} className="max-w-[700px] grid gap-2">
          <div className="grid lg:grid-cols-2 gap-2">
            <Input name="name" type="text" ref={register} error={errors.name} height="50px" placeholder="Nombre" />
            <Input
              name="lastName"
              type="text"
              ref={register}
              error={errors.lastName}
              height="50px"
              placeholder="Apellido"
            />
          </div>
          <Input name="email" type="text" ref={register} error={errors.email} height="50px" placeholder="Correo" />
          <TextArea
            name="message"
            type="text"
            ref={register}
            error={errors.message}
            height="50px"
            rows={4}
            placeholder="Mensaje"
          />
          <div>
            <Button primary htmlType="submit" margin="m-0">
              <span className="px-8">Enviar</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
