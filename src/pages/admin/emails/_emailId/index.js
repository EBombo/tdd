import React, { useEffect, useState } from "reactn";
import { firestore } from "../../../../firebase";
import { useRouter } from "next/router";
import { spinLoader } from "../../../../components/common/loader";
import { Input, TextArea } from "../../../../components/form";
import { Icon } from "../../../../components/common/Icons";

export const Email = (props) => {
  const router = useRouter();

  const { emailId } = router.query;

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.prefetch("/admin/emails");
    if (!emailId) return;

    const fetchEmail = () =>
      firestore
        .collection("emails")
        .doc(emailId)
        .onSnapshot((emailSnap) => {
          if (!emailSnap.exists) return router.push("/admin/emails");

          setEmail(emailSnap.data());
          setLoading(false);
        });

    const sub = fetchEmail();

    return () => sub && sub();
  }, [emailId]);

  useEffect(() => {
    if (!email || email?.seen) return;

    const updateEmail = async () =>
      await firestore.collection("emails").doc(emailId).set({ seen: true }, { merge: true });

    updateEmail();
  }, [email]);

  if (loading) return spinLoader();

  return (
    <div className="mx-8 p-4 md:p-12 max-w-[1000px]">
      <div
        onClick={() => router.push("/admin/emails")}
        className="cursor-pointer flex items-center gap-[5px] mb-8 text-[14px] leading-[16px] underlined"
      >
        <Icon style={{ color: "#000000", fontSize: "14px" }} type="arrow-left" />
        Atras
      </div>
      <div className="grid grid-cols-[4px_auto] mb-8">
        <div className="bg-pink-500"></div>
        <div className="ml-2 text-grayLight text-2xl font-normal">Correo</div>
      </div>
      <div className="">
        <div className="grid lg:grid-cols-2 gap-2 mb-4">
          <Input name="name" type="text" value={email?.name} height="50px" placeholder="Nombre" />
          <Input name="lastName" type="text" value={email?.lastName} height="50px" placeholder="Apellido" />
        </div>
        <div className="mb-4">
          <Input name="email" type="text" value={email?.email} height="50px" placeholder="Correo" />
        </div>
        <div className="mb-4">
          <TextArea name="message" value={email?.message} type="text" height="50px" rows={4} placeholder="Mensaje" />
        </div>
      </div>
    </div>
  );
};
