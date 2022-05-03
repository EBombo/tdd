import React, { useState, useGlobal } from "reactn";
import styled from "styled-components";
import { string, object } from "yup";
import { useForm } from "react-hook-form";
import get from "lodash/get";
import { ModalContainer } from "../../../components/common/ModalContainer";
import { ButtonBombo, Input } from "../../../components";
import { useSendError } from "../../../hooks/useSendError";
import { useFetch } from "../../../hooks/useFetch";
import { config } from "../../../firebase";

export const ModalDeleteUser = (props) => {
  const [authUser] = useGlobal("user");
  const [loading, setLoading] = useState(false);

  const { sendError } = useSendError();
  const { Fetch } = useFetch();

  const schema = object().shape({
    email: string().required(),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const deleteAuthenticationUser = async (data) => {
    setLoading(true);
    try {
      const { error } = await Fetch(
        `${config.serverUrlAdmin}/admin/${get(authUser, "id", "")}/delete-user`,
        "POST",
        {
          email: data.email,
        }
      );

      props.showNotification(
        "OK",
        error ? "Algo salió mal" : "Se elimino correctamente el email",
        "success"
      );
    } catch (error) {
      sendError({
        error: Object(error).toString(),
        action: "sendSuggestion",
      });
    }
    setLoading(false);
    props.setIsVisibleModalDelete(false);
  };

  return (
    <ModalContainer
      footer={null}
      visible={props.isVisibleModalDelete}
      onCancel={() => props.setIsVisibleModalDelete(false)}
    >
      <FormContainer onSubmit={handleSubmit(deleteAuthenticationUser)}>
        <h2>Eliminar correo de usuario de la base de datos</h2>
        <Input
          variant="clear"
          error={errors.email}
          type="email"
          name="email"
          ref={register}
          placeholder="Email"
        />
        <ButtonBombo
          variant="danger"
          htmlType="submit"
          margin={"1rem auto"}
          loading={loading}
        >
          Eliminar
        </ButtonBombo>
      </FormContainer>
    </ModalContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;

  h2 {
    margin: 1rem 0;
    color: ${(props) => props.theme.basic.white};
  }
`;
