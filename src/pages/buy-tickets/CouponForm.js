import React, { useState } from "reactn";
import { Button, Input } from "../../components/form";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useSendError } from "../../hooks";

export const CouponForm = (props) => {
  const { sendError } = useSendError();

  const [isLoading, setIsLoading] = useState(false);

  const schema = object().shape({
    couponCode: string().required(),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const validateCouponCode = (data) => {
    try {
      setIsLoading(true);

      console.log({ data });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      sendError(error, "validateCouponCode");
    }
  };

  return (
    <div className="mb-6">
      <div className="text-primary mt-6 mb-2">Ingresa un cupón</div>

      <form onSubmit={handleSubmit(validateCouponCode)}>
        <div className="grid grid-cols-[2fr_1fr]">
          <Input
            type="text"
            border="none"
            ref={register}
            name="couponCode"
            disabled={isLoading}
            error={errors.couponCode}
            placeholder="Ingresa tu cupón"
          />
          <Button fontSize="text-xs" htmlType="submit" loading={isLoading} disabled={isLoading} primary>
            Validar cupón
          </Button>
        </div>
      </form>
    </div>
  );
};
