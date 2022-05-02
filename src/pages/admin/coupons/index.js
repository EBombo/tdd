import React, { useEffect, useGlobal, useState } from "reactn";
// import { useRouter } from "next/router";

import { firestore } from "../../../firebase";
import { Anchor } from "../../../components/form/Anchor";

export const Coupons = (props) => {
  // const router = useRouter();

  const [authUser] = useGlobal("user");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // router.prefetch("/events/[eventId]");
    const fetchCoupons = async () => {
      const couponsSnapshot = await firestore.collection("coupons").get();
      const coupons_ = couponsSnapshot.data();

      setCoupons(coupons_);
    };

    fetchCoupons();
  }, []);

  const CouponList = ({ data }) => (
    <div className="mx-4">
      {data.map((coupon, i) => (
        <div key={`coupon-${i}`} className="block bg-white shadow p-4">
          Coupon {coupon?.id}{" "}
        </div>
      ))}
    </div>
  );

  return (
    <div className="">
      <h1 className="text-xl font-bold">Cupones</h1>

      <div><Anchor url="/admin/coupons/new">Crear cupón</Anchor></div>

      <div className="block">
        <CouponList data={coupons} />
      </div>
    </div>
  );
};
