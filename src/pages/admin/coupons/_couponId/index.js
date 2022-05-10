import get from "lodash/get";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { useAcl, useSendError } from "../../../../hooks";
import { firestore } from "../../../../firebase";
import { date, number, object, string } from "yup";
import { snapshotToArray } from "../../../../utils";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useGlobal, useMemo, useState } from "reactn";
import { Button, DatePicker, Input } from "../../../../components/form";

const COUPONS_COLLECTION = "coupons";

export const CouponForm = (props) => {
  const router = useRouter();
  const { couponId } = router.query;

  const { AclLink } = useAcl();
  const { sendError } = useSendError();

  const [serverDate] = useGlobal("serverDate");

  const schema = object().shape({
    code: string().required(),
    maxUsage: number().required().positive().integer(),
    activeSince: date().required(),
    expireAt: date().nullable(),
    discountFactor: number().required().positive().integer().max(100),
  });

  const { register, errors, handleSubmit, control, reset } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  const [loading, setLoading] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({});

  useEffect(() => {
    router.prefetch("/admin/coupons");
  }, []);

  useEffect(() => {
    if (!couponId) return;

    if (isNew) return;

    const fetchCoupon = async () => {
      setLoading(true);

      const couponSnapshot = await firestore.doc(`${COUPONS_COLLECTION}/${couponId}`).get();
      const couponData = couponSnapshot.data();

      const coupon_ = {
        ...couponData,
        discountFactor: couponData.discountFactor * 100,
        activeSince: couponData.activeSince ? moment(couponData.activeSince?.toDate()) : couponData.activeSince,
        expireAt: couponData.expireAt ? moment(couponData.expireAt?.toDate()) : couponData.expireAt,
      };
      setCurrentCoupon(coupon_);

      reset({
        activeSince: couponData.activeSince ? moment(couponData.activeSince?.toDate()) : couponData.activeSince,
      });

      setLoading(false);
    };

    fetchCoupon();
  }, [couponId]);

  const isNew = useMemo(() => couponId === "new", [couponId]);

  const documentId = useMemo(() => {
    return isNew ? firestore.collection(COUPONS_COLLECTION).doc().id : couponId;
  }, [couponId]);

  const createCoupon = async (data) => {
    try {
      setLoading(true);

      const validation = await validateCoupon(data);

      if (!validation.ok) {
        setLoading(false);
        return props.showNotification("Error", validation.error);
      }

      const discountFactor = data.discountFactor / 100;

      await firestore.doc(`${COUPONS_COLLECTION}/${documentId}`).set(
        {
          ...data,
          createAt: isNew ? new Date() : currentCoupon?.createAt?.toDate(),
          updateAt: new Date(),
          id: documentId,
          discountFactor,
          deleted: isNew ? false : currentCoupon?.deleted,
          enabled: isNew ? true : currentCoupon?.enabled,
        },
        { merge: true }
      );

      router.push("/admin/coupons");
    } catch (error) {
      console.error(error);
      sendError("Error", error.toString());
      props.showNotification(`Error ${error.toString()}`);
    }

    setLoading(false);
  };

  const validateCoupon = async (data) => {
    const couponsQuery = await firestore
      .collection("coupons")
      .where("deleted", "==", false)
      .where("code", "==", data.code)
      .where("expireAt", ">", serverDate)
      .get();

    const coupons = snapshotToArray(couponsQuery).filter((coupon) => coupon.id !== couponId);

    if (isEmpty(coupons)) return { ok: true };

    return { ok: false, error: "Ya existe un coupon con este nombre para la fecha" };
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4">
      <div className="mb-4">
        <AclLink variant="primary" name="/admin/coupons" to="/admin/coupons">
          Regresar
        </AclLink>
      </div>
      <h1 className="text-xl font-bold mb-4">{isNew ? "Crear nuevo" : "Editar"} cupón</h1>
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
            defaultValue={currentCoupon?.discountFactor?.toFixed(0)}
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
            defaultValue={currentCoupon?.activeSince}
            as={<DatePicker showTime type="datetime-local" error={errors.activeSince} placeholder="Activo desde" />}
          />

          <label htmlFor="expireAt">Expira el</label>
          <Controller
            name="expireAt"
            control={control}
            defaultValue={currentCoupon?.expireAt}
            as={
              <DatePicker
                showTime
                name="expireAt"
                type="datetime-local"
                ref={register}
                error={errors.expireAt}
                placeholder="Expira el"
              />
            }
          />

          <div>
            <Button primary htmltype="submit" margin="m-0" loading={loading} disabled={loading}>
              <span className="px-8">{isNew ? "Crear cupón" : "Actualizar cupón"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
