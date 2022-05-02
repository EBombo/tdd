import React, { useEffect, useState, useMemo } from "reactn";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import get from "lodash/get";
import { object, string, number, date } from "yup";
import { useSendError } from "../../../hooks";

import { firestore } from "../../../firebase";
import { Input, Button, DatePicker  } from "../../../components/form";
import PickerTag from "antd/lib/date-picker/PickerTag";

const COUPONS_COLLECTION = "coupons";

export const CouponForm = (props) => {
  const router = useRouter();

  const { couponId } = router.query;

  const [currentCoupon, setCurrentCoupon] = useState({});

  const { sendError } = useSendError();

  const schema = object().shape({
    code: string().required(),
    maxUsage: number().required().positive().integer(),
    activeSince: date().nullable(),
    expireAt: date().nullable(),
    discountFactor: number().required().positive().integer().max(100),
  });

  const { register, errors, handleSubmit, control, reset } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    router.prefetch("/admin/coupons");
  }, []);

  useEffect(() => {
    if (!couponId) return;

    if (isNew) return;

    const fetchCoupon = async () => {
      const couponSnapshot = await firestore.doc(`${COUPONS_COLLECTION}/${couponId}`).get();
      const couponData = couponSnapshot.data();

      const coupon_ = {
        ...couponData,
        discountFactor: couponData.discountFactor * 100,
        activeSince: couponData.activeSince.toDate(),
        expireAt: couponData.expireAt.toDate(),

      };
      setCurrentCoupon(coupon_);

    };

    fetchCoupon();
  }, [couponId]);

  const isNew = useMemo(() => (couponId === "new"), [couponId]);

  const documentId = useMemo(() => {
    return isNew ? firestore.collection(COUPONS_COLLECTION).doc().id : couponId;
  }, [couponId]);

  const createCoupon = async (data) => {
    try {
      data.hasActivationDate = !!data.activeSince;
      data.hasExpirationDate = !!data.expireAt;
      const discountFactor = data.discountFactor / 100;

      const docRef = firestore.doc(`${COUPONS_COLLECTION}/${documentId}`);
      await (isNew
        ? docRef.set({ ...data, createdAt: new Date(), updateAt: new Date(), id: documentId, discountFactor })
        : docRef.update({ ...data, updateAt: new Date(), discountFactor }));

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
          <label htmlFor="code">Código</label>
          <Input
            defaultValue={get(currentCoupon, "code", "")}
            name="code"
            type="text"
            ref={register}
            error={errors.code}
            height="50px"
            placeholder="code"
          />
          <label htmlFor="discountFactor">Descuento (%)</label>
          <Input
            defaultValue={currentCoupon?.discountFactor}
            name="discountFactor"
            type="number"
            ref={register}
            error={errors.discountFactor}
            height="50px"
            placeholder="Factor de descuento"
          />
          <label htmlFor="maxUsage">Cantidad máxima de uso</label>
          <Input
            defaultValue={currentCoupon?.maxUsage}
            name="maxUsage"
            type="number"
            ref={register}
            error={errors.maxUsage}
            height="50px"
            placeholder="Cantidad máxima de uso"
          />

          <label htmlFor="activeSince">Activo desde</label>
          <Controller
            name="activeSince"
            control={control}
            as={
              <DatePicker
                defaultValue={currentCoupon?.activeSince || null}
                name="activeSince"
                type="datetime-local"
                ref={register}
                error={errors.activeSince}
                placeholder="Activo desde"
              />
            }
          />

          <label htmlFor="expireAt">Expira el</label>
          <Controller
            name="expireAt"
            control={control}
            defaultValue={currentCoupon?.expireAt}
            as={
              <DatePicker
                defaultValue={get(currentCoupon, "expireAt", null)}
                name="expireAt"
                type="datetime-local"
                ref={register}
                error={errors.expireAt}
                placeholder="Expira el"
              />
            }
          />

          <div>
            <Button primary htmltype="submit" margin="m-0">
              <span className="px-8">Crear cupón</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
