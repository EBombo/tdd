import React, { memo, useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import { useAcl } from "../../../hooks";
import { firestore } from "../../../firebase";
import { snapshotToArray } from "../../../utils";
import { spinLoader } from "../../../components/common/loader";
import { Tooltip } from "antd";
import { Icon } from "../../../components/common/Icons";

export const Emails = (props) => {
  const router = useRouter();

  const { AclLink, Acl } = useAcl();

  const [authUser] = useGlobal("user");

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.prefetch("/admin/emails/[emailId]");

    const fetchEmails = () =>
      firestore
        .collection("emails")
        .where("deleted", "==", false)
        .orderBy("createAt", "desc")
        .onSnapshot((emailsSnapshot) => {
          setEmails(snapshotToArray(emailsSnapshot));
          setLoading(false);
        });

    const sub = fetchEmails();

    return () => sub && sub();
  }, []);

  const deleteEmail = async (email) =>
    await firestore
      .collection("emails")
      .doc(email.id)
      .set({ ...email, deleted: true }, { merge: true });

  const EmailsList = memo(({ data }) => (
    <div className="mx-4">
      {data.map((email, index) => (
        <div
          key={`email-${index}`}
          className={`block shadow p-4 my-4 relative ${!email.seen ? "bg-black/[0.3]" : "bg-white"}`}
        >
          <div className="float-right">
            <div className="flex flex-col gap-4">
              <Acl name="/admin/emails#delete">
                <Tooltip title={"Eliminar email"}>
                  <Icon
                    onClick={() => deleteEmail(email)}
                    style={{ color: "#DE0F0F", fontSize: "14px" }}
                    type="delete"
                  />
                </Tooltip>
              </Acl>
            </div>
          </div>
          <div className="cursor-pointer" onClick={() => router.push(`/admin/emails/${email.id}`)}>
            <p>De: {email?.email}</p>
            <p>Nombre: {`${email?.name} ${email?.lastName}`}</p>
          </div>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="max-w-[1200px] mx-auto p-8 md:p-12">
      <div className="mb-4">
        <AclLink name="/admin" to="/admin" variant="primary">
          Regresar
        </AclLink>
      </div>

      <h1 className="text-xl font-bold mb-4">Correos</h1>

      <div className="block">{loading ? spinLoader() : <EmailsList data={emails} />}</div>
    </div>
  );
};
