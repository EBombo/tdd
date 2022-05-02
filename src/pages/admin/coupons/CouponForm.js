import React, { useEffect, useState } from "reactn";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import get from "lodash/get";
import { object, string, number, date } from "yup";
import { useSendError } from "../../hooks";

import { firestore } from "../../../firebase";

const COUPONS_COLLECTION = "coupons";

export const CouponForm = (props) => {
  const router = useRouter();

  const { couponId } = router.query;

  const [currentCoupon, setCurrentCoupon] = useState([]);

  const { sendError } = useSendError();

  const schema = object().shape({
    code: string().required(),
    maxUsage: number().required().positive().integer(),
    activeSince: date(),
    expireAt: date(),
    discountFactor: number().required().positive().max(1),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    router.prefetch("/admin/coupons");
  }, []);

  useEffect(() => {
    if (!couponId) return;

    if (couponId === "new") return;

    const fetchCoupon = async () => {
      const couponSnapshot = await firestore.doc(`${COUPONS_COLLECTION}/${couponId}`).get();

      setCurrentCoupon(couponSnapshot.data());
    };

    fetchCoupon();
  }, [couponId]);

  const createCoupon = async (data) => {
    try {
      data.hasActivationDate = !!data.activeSince;
      data.hasExpirationDate = !!data.expireAt;

      await firestore.doc(`${COUPONS_COLLECTION}/${couponId}`).update({ ...data });

      router.push("/admin/coupons");
    } catch (e) {
      sendError("Error", e.toString());
      props.showNotification(`Error ${e.toString()}`);
    }
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold">Crear nuevo cupón</h1>
      <div className="block">
        <form onSubmit={handleSubmit(createCoupon)} className="max-w-[700px] grid gap-2">
          <Input
            defaultValue={get(currentCoupon, "code", "")}
            name="code"
            type="text"
            ref={register}
            error={errors.code}
            height="50px"
            placeholder="code"
          />
          <Input
            defaultValue={get(currentCoupon, "discountFactor", 1)}
            name="discountFactor"
            type="number"
            ref={register}
            error={errors.maxUsage}
            height="50px"
            placeholder="Factor de descuento"
          />
          <Input
            defaultValue={get(currentCoupon, "maxUsage", 1)}
            name="maxUsage"
            type="number"
            ref={register}
            error={errors.maxUsage}
            height="50px"
            placeholder="Cantidad máxima de uso"
          />
          <Input
            defaultValue={get(currentCoupon, "activeSince", null)}
            name="activeSince"
            type="datetime-local"
            ref={register}
            error={errors.activeSince}
            placeholder="Activo desde"
          />
          <Input
            defaultValue={get(currentCoupon, "expireAt", null)}
            name="expireAt"
            type="datetime-local"
            ref={register}
            error={errors.expireAt}
            placeholder="Expira el"
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
