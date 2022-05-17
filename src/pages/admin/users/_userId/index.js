import React, { useEffect, useState } from "reactn";
import { firestore } from "../../../../firebase";
import get from "lodash/get";
import moment from "moment";
import { Button } from "../../../../components/form";
import { spinLoader } from "../../../../components/common/loader";
import { useRouter } from "next/router";
import { useAcl } from "../../../../hooks";
import { snapshotToArray } from "../../../../utils";

export const User = (props) => {
  const router = useRouter();
  const { userId } = router.query;

  const { Acl, AclLink } = useAcl();

  const [user, setUser] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = () =>
      firestore
        .collection("users")
        .doc(userId)
        .onSnapshot((userOnSnapShot) => {
          if (!userOnSnapShot.exists) return router.push("/admin/users");

          setUser(userOnSnapShot.data());
          setLoadingUser(false);
        });

    const sub = fetchUser();
    return () => sub && sub();
  }, [userId]);

  useEffect(() => {
    if (!user) return;
    if (!userId) return;
    if (!user.hasPayment) return;

    const fetchPayment = async () => {
      const querySnapshotPayment = await firestore
        .collection("payments")
        .where("user.id", "==", user.id)
        .limit(1)
        .get();

      const payments = snapshotToArray(querySnapshotPayment);
      setPayment(payments[0]);
    };

    fetchPayment();
  }, [user]);

  return loadingUser ? (
    spinLoader()
  ) : (
    <div className="mx-auto max-w-[1200px] py-8">
      <div className="mx-4">
        <AclLink variant="primary" name="/admin/users" to="/admin/users">
          Regresar
        </AclLink>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="mx-2">
          <fieldset>
            <legend>
              <span className="title-legend">Información</span>
            </legend>

            <div className="item">
              <label>Email: </label> <span>{get(user, "email", "")} </span>
            </div>

            <div className="item">
              <label>Teléfono: </label>
              <span
                onClick={() => window.open(`https://wa.me/51${get(user, "phoneNumber", "")}`, "_blank")}
                style={{ cursor: "pointer", color: "green" }}
              >
                {get(user, "phoneNumber", "")}{" "}
              </span>
            </div>

            <div className="item">
              <label> Creado: </label>

              <span>{user.createAt && moment(get(user, "createAt", null)?.toDate()).format("DD/MM/YYYY")} </span>
            </div>

            {payment && (
              <>
                <div>El usuario pago: S/ {payment.amount}</div>
                {payment.coupon && <div>El usuario uso el cupon: {payment.coupon.code}</div>}
              </>
            )}

            {user.isAdmin && <span className="border-primary border-2 rounded text-primary px-2 m-1">ADMIN</span>}
            {user.studentId && (
              <span className="border-primaryDarken border-2 rounded text-primaryDarken px-2 m-1">STUDENT</span>
            )}
            {user.hasPayment && <span className="border-success border-2 rounded text-success px-2 m-1">PAID</span>}
          </fieldset>

          <Acl name="/admin/users/[userId]/acls">
            <fieldset>
              <legend>
                <span className="title-legend">Cuenta</span>
              </legend>
              <div className="item">
                <label>Editar permisos :</label>
                <Button variant="primary" display="inline" onClick={() => router.push(`/admin/users/${userId}/acls`)}>
                  EDITAR PERMISOS
                </Button>
                <br />
                <br />
              </div>
            </fieldset>
          </Acl>
        </div>
      </div>
    </div>
  );
};
