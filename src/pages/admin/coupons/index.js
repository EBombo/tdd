import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import moment from "moment";
import { firestore } from "../../../firebase";
import { Anchor } from "../../../components/form/Anchor";
import { spinLoaderMin } from "../../../components/common/loader";
import { snapshotToArray } from "../../../utils";

export const Coupons = (props) => {
  const router = useRouter();

  const [authUser] = useGlobal("user");
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.prefetch("/admin/coupons/[couponId]");

    const fetchCoupons = async () => {
      const couponsSnapshot = await firestore.collection("coupons")
        .where("deleted", "==", false)
        .orderBy("createAt", "desc")
        .get();

      const coupons_ = snapshotToArray(couponsSnapshot);

      setCoupons(coupons_);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchCoupons();
  }, []);

  const dateFormatted = (date) => date ? moment(date).format("L") : "";

  const CouponList = React.memo(({ data }) => (
    <div className="mx-4">
    {data.map((coupon, i) => (
      <div key={`coupon-${i}`} className="block bg-white shadow p-4 my-4">
        <div className="float-right">
          <Anchor url={`/admin/coupons/${coupon?.id}`}>Editar</Anchor>
        </div>
        <p className="text-lg font-bold">Cupón: {coupon?.code}</p>
        <p>Cantidad Máxima de uso: {coupon?.maxUsage}</p>
        <p>Descuento (%): {coupon?.discountFactor}</p>
        <p>Activo desde: {coupon?.activeSince ? dateFormatted(coupon?.activeSince?.toDate()) : dateFormatted(coupon?.createAt?.toDate())}</p>
        <p>Expiración: {coupon?.expireAt ? dateFormatted(coupon?.expireAt?.toDate()) : "Sin fecha de expiración"}</p>
      </div>
    ))}
    </div>
  ));

  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-xl font-bold">Cupones</h1>

      <div>
        <Anchor url="/admin/coupons/new">Crear cupón</Anchor>
      </div>

      <div className="block">
        {isLoading ? spinLoaderMin() : <CouponList data={coupons} />}
      </div>
    </div>
  );
};
