import React, { useEffect, useState } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { Input, message } from "antd";
import { config } from "../../../../firebase";
import { useRouter } from "next/router";
import { useFetch } from "../../../../hooks/useFetch";
import { Button } from "../../../../components/form/Button";
import { useSendError } from "../../../../hooks/useSendError";

export const ValidateAccount = (props) => {
  const router = useRouter();

  const { sendError } = useSendError();
  const { Fetch } = useFetch();

  const schema = object().shape({
    name: string().required(),
    lastName: string().required(),
    documentNumber: string().required(),
  });

  const { errors, handleSubmit, control } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const [isLoadingValidateAccount, setIsLoadingValidateAccount] = useState(
    false
  );

  const [
    isLoadingRequestNewDocument,
    setIsLoadingRequestNewDocument,
  ] = useState(false);

  useEffect(() => {
    if (isEmpty(errors)) return;

    message.error("Complete todo los campos del formulario", 5);
  }, [errors]);

  const validateAccount = async (data) => {
    try {
      setIsLoadingValidateAccount(true);

      const { error } = await Fetch(urlApiValidateAccount(), "PUT", data);

      props.showNotification(
        error ? "ERROR" : "OK",
        error ? "Algo salió mal" : "Realizado",
        error ? "error" : "success"
      );

      !error && router.goBack();
    } catch (error) {
      sendError({ error: Object(error).toString(), action: "validateAccount" });
    }
    setIsLoadingValidateAccount(false);
  };

  const urlApiValidateAccount = () => `${config.serverUrl}/users/${props.user.id}/validate-account`;

  const requestNewDocument = async () => {
    try {
      setIsLoadingRequestNewDocument(true);
      const { error } = await Fetch(urlApiRequestNewDocument(), "PUT");

      props.showNotification(
        error ? "ERROR" : "OK",
        error ? "Algo salió mal" : "Realizado",
        error ? "error" : "success"
      );

      !error && router.goBack();
    } catch (error) {
      sendError({
        error: Object(error).toString(),
        action: "requestNewDocument",
      });
    }
    setIsLoadingRequestNewDocument(false);
  };

  const urlApiRequestNewDocument = () => `${config.serverUrl}/users/${props.user.id}/request-new-document`;

  const isEnabledValidateAccount = () => !!props.user.documentImageUrl;

  if (!isEnabledValidateAccount())
    return <label>No se solicitó validar la cuenta</label>;

  return (
    <Container>
      <form onSubmit={handleSubmit(validateAccount)}>
        <div className="wrapper-input">
          <label>* Nombre :</label>
          <Controller
            key={`name-${get(props.user, "name", "")}`}
            defaultValue={get(props.user, "name", "")}
            name="name"
            control={control}
            as={<Input />}
          />
          {get(errors, "name", false) && <Error>{errors.name.message}</Error>}
        </div>
        <div className="wrapper-input">
          <label>* Apellido :</label>
          <Controller
            key={`lastname-${get(props.user, "lastName", "")}`}
            defaultValue={get(props.user, "lastName", "")}
            name="lastName"
            control={control}
            as={<Input />}
          />
          {get(errors, "lastName", false) && (
            <Error>{errors.lastName.message}</Error>
          )}
        </div>
        <div className="wrapper-input">
          <label>* Documento de identidad :</label>
          <Controller
            key={`documentnumber-${get(props.user, "documentNumber", "")}`}
            defaultValue={get(props.user, "documentNumber", "")}
            name="documentNumber"
            control={control}
            as={<Input />}
          />
          {get(errors, "documentNumber", false) && (
            <Error>{errors.documentNumber.message}</Error>
          )}
        </div>
        {props.isVisibleImageDocument && (
          <div className="image">
            <img src={get(props.user, "documentImageUrl", "")} alt="" />
          </div>
        )}
        <div className="wrapper-buttons">
          <Button
            disabled={props.user.verifiedDocument}
            loading={isLoadingValidateAccount}
            variant="primary"
            htmlType="submit"
          >
            Validar cuenta
          </Button>
          <Button
            loading={isLoadingRequestNewDocument}
            variant="danger"
            onClick={() => requestNewDocument()}
          >
            Solicitar nueva foto
          </Button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  .image {
    text-align: center;
    padding: 0.5rem 0;

    label {
      margin: 1rem 0;
      font-weight: 500;
    }

    img {
      width: 100%;
    }
  }

  .wrapper-input {
    margin-bottom: 0.6rem;
  }

  .wrapper-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    button {
      margin: 0.5rem;
    }
  }
`;

const Error = styled.div`
  color: ${(props) => props.theme.basic.danger};
  font-weight: 500;
`;
