import React, {useGlobal, useState} from "reactn";
import {config} from "../../../../firebase";
import {Modal} from "antd";
import UrlAssembler from "url-assembler";
import {gaError} from "../../../../utils";
import {ButtonBombo, Input} from "../../../../components";
import {useForm} from "react-hook-form";
import {number, object, string} from "yup";
import styled from "styled-components";
import {useOwnFetch} from "../../../../utils/useFetch/useFetch";
import {useSendError} from "../../../../components/error-fallback/useSendError";

export const TakeMoneyFromUser = (props) => {
  const [admin] = useGlobal("user");
  const [userId] = useState(props.user.id);

  const { sendError } = useSendError();
  const { ownFetch } = useOwnFetch();

  const schema = object().shape({
    amount: number().positive().required(),
    reason: string().required(),
  });

  const { register, errors, handleSubmit, setValue } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const takeMoney = (data) =>
    Modal.confirm({
      title: `Esta seguro del monto de ${data.amount} que va a quitar?`,
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk: () => takeMoneyFromUser(data),
    });

  const takeMoneyFromUser = async (user) => {
    try {
      const { error } = await ownFetch(urlApiUserTakeMoney(), "PUT", {
        user,
        admin,
      });

      props.showNotification(
        error ? "ERROR" : "OK",
        error ? "Algo salió mal" : "Realizado",
        error ? "error" : "success"
      );

      if (error) return;

      cleanInputs();

      props.initialize();
    } catch (error) {
      gaError("Error", "PUT /admin/user/:userId/take-money");
      sendError({
        error: Object(error).toString(),
        action: "takeMoneyFromUser",
      });
    }
  };

  const cleanInputs = () => {
    setValue("amount", "");
    setValue("reason", "");
  };

  const urlApiUserTakeMoney = () => {
    let template = "/admin/user/:userId/take-money";

    return new UrlAssembler(`${config.serverUrl}`)
      .template(template)
      .param({ userId })
      .toString();
  };

  return (
    <FormContent onSubmit={handleSubmit(takeMoney)} noValidate>
      <h2 className="title-add-coins">Quitar dinero RETIRABLE</h2>
      <p>
        **Tomar en cuenta el dinero retirable que se muestra arriba. De no
        contar con el monto a retirar, se le quitara lo maximo posible.
      </p>
      <Input
        variant="secondary"
        error={errors.amount}
        required
        type="number"
        autoComplete="on"
        ref={register}
        name="amount"
        placeholder="Ingrese monto"
      />
      <Input
        variant="secondary"
        error={errors.reason}
        required
        type="text"
        autoComplete="on"
        ref={register}
        name="reason"
        placeholder="Motivo por el que se le quitara dinero"
      />
      <div className="item">
        <ButtonBombo variant="primary" htmlType="submit">
          Quitar
        </ButtonBombo>
      </div>
    </FormContent>
  );
};

const FormContent = styled.form`
  h2 {
    margin: 10px 0;
  }
  p {
    font-size: 10px;
    color: red;
  }
`;
