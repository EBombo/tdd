import React, { useEffect, useGlobal, useState } from "reactn";
import { firestore } from "../../../../firebase";
import get from "lodash/get";
import { Checkbox, Modal } from "antd";
import moment from "moment";
import { Button } from "../../../../components/form/Button";
import { spinLoader } from "../../../../components/common/loader";
import { useRouter } from "next/router";
import { useAcl } from "../../../../hooks/acl";

export const User = (props) => {
  const [authUser] = useGlobal("user");

  const { Acl, AclLink } = useAcl();

  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const sub = fetchUser();
    return () => sub && sub();
  }, [userId]);

  const fetchUser = () =>
    firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((userOnSnapShot) => {
        if (!userOnSnapShot.exists) return goBack();

        setUser(userOnSnapShot.data());
        setLoadingUser(false);
      });

  const goBack = () => router.push("/admin/users");

  const banAccount = (isBanned) =>
    Modal.confirm({
      title: "Esta seguro?",
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk: async () => await firestore.doc("users/" + userId).update({ isBanned }),
    });

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

            {user.isAdmin && <div className="border-primary border-2 rounded text-primary px-2 my-1">ADMIN</div>}
            {user.studentId && (
              <div className="border-primaryDarken border-2 rounded text-primaryDarken px-2 my-1">STUDENT</div>
            )}
            {user.hasPayment && <div className="border-success border-2 rounded text-success px-2 my-1">PAID</div>}
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
          <Acl name="/admin/users/[userId]#banner">
            <fieldset>
              <legend>
                <span className="title-legend">Banear</span>
              </legend>
              <div className="item">
                <label>Banear cuenta :</label>
                <Checkbox
                  key={`key-is-banned-${get(user, "isBanned", false)}`}
                  defaultChecked={get(user, "isBanned", false)}
                  onChange={(event) => banAccount(event.target.checked)}
                />
              </div>
            </fieldset>
          </Acl>
        </div>
      </div>
    </div>
  );
};
