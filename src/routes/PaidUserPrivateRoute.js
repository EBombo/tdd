import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import { spinLoader } from "../components/common/loader";
import { firestore } from "../firebase";

export const PaidUserPrivateRoute = (props) => {
  const router = useRouter();

  const [authUser] = useGlobal("user");
  const [isFreeDay] = useGlobal("isFreeDay");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return router.push("/");

    if (isFreeDay) return setIsLoading(false);
    if (authUser?.studentId) return setIsLoading(false);
    if (authUser?.hasPayment) return setIsLoading(false);

    const fetchPayments = () =>
      firestore
        .collection("payments")
        .where("user.id", "==", authUser.id)
        .limit(1)
        .onSnapshot((paymentSnapShot) => {
          if (!paymentSnapShot.empty) return setIsLoading(false);

          // Redirect to / if does not have a payment.
          router.push("/");
        });

    const sub = fetchPayments();

    return () => sub && sub();
  }, [authUser, isFreeDay]);

  if (isLoading) return spinLoader();

  return props.children;
};
