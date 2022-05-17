import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import moment from "moment";
import { firestore } from "../../../firebase";
import { useAcl } from "../../../hooks/acl";
import { spinLoaderMin } from "../../../components/common/loader";
import { snapshotToArray } from "../../../utils";
import { Icon } from "../../../components/common/Icons";
import { ModalConfirm } from "../../../components/modal/ModalConfirm";
import { darkTheme } from "../../../theme";
import { Tooltip } from "antd";

export const Coupons = (props) => {
  const router = useRouter();

  const { AclLink, Acl } = useAcl();

  const [authUser] = useGlobal("user");
  const [coupons, setCoupons] = useState([]);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);

  useEffect(() => {
    router.prefetch("/admin/coupons/[couponId]");

    const listenCoupons = () =>
      firestore
        .collection("coupons")
        .where("deleted", "==", false)
        .orderBy("createAt", "desc")
        .onSnapshot((couponsSnapShot) => {
          const coupons_ = snapshotToArray(couponsSnapShot);

          setCoupons(coupons_);
          setIsLoading(false);
        });

    setIsLoading(true);
    const sub = listenCoupons();

    return () => sub && sub();
  }, []);

  const dateFormatted = (date) => (date ? moment(date).format("DD/MM/YYYY") : "");

  const CouponList = React.memo(({ data }) => (
    <div className="mx-4">
      <ModalConfirm
        isVisibleModalConfirm={deleteModal}
        title={`Eliminar Cupón ${currentCoupon?.code}`}
        description="Al eliminar el cupón ya no podrá revertir la acción"
        action={async () => {
          setDeleteModal(false);
          await firestore.doc(`coupons/${currentCoupon?.id}`).update({ deleted: true });
        }}
        setIsVisibleModalConfirm={setDeleteModal}
        onCloseModalConfirm={() => setCurrentCoupon(null)}
      />
      <ModalConfirm
        isVisibleModalConfirm={disableModal}
        title={`${currentCoupon?.enabled ? "Deshabilitar" : "Habilitar"} Cupón ${currentCoupon?.code}`}
        description={`${
          currentCoupon?.enabled
            ? "Deshabilitar bloquea desde el momento el uso de este cupón"
            : "Activar permite el uso del cupón"
        }`}
        action={async () => {
          setDisableModal(false);
          await firestore.doc(`coupons/${currentCoupon?.id}`).update({ enabled: !currentCoupon.enabled });
        }}
        setIsVisibleModalConfirm={setDisableModal}
        onCloseModalConfirm={() => setCurrentCoupon(null)}
      />

      {data.map((coupon, i) => (
        <div key={`coupon-${i}`} className="block bg-white shadow p-4 my-4">
          <div className="float-right">
            <div className="flex flex-col gap-4">
              <AclLink name="/admin/coupons/[couponId]" to={`/admin/coupons/${coupon?.id}`} variant="primary">
                Editar
              </AclLink>
              <Acl name="/admin/coupons#disable">
                <Tooltip title={"Desactivar/Activar cupón"}>
                  <Icon
                    onClick={() => {
                      setCurrentCoupon(coupon);
                      setDisableModal(true);
                    }}
                    style={{ color: coupon.enabled ? "#fe008f" : darkTheme.basic.grayLight, fontSize: "24px" }}
                    type="poweroff"
                  />
                </Tooltip>
              </Acl>
              <Acl name="/admin/coupons#delete">
                <Tooltip title={"Eliminar cupón"}>
                  <Icon
                    onClick={() => {
                      setCurrentCoupon(coupon);
                      setDeleteModal(true);
                    }}
                    style={{ color: "#fe008f", fontSize: "24px" }}
                    type="delete"
                  />
                </Tooltip>
              </Acl>
            </div>
          </div>
          <p className="text-lg font-bold">Cupón: {coupon?.code}</p>
          <p>
            Estado:{" "}
            <span
              className={`rounded border-2 px-2 ${
                coupon?.enabled ? "border-primary text-primary" : "border-gray text-gray"
              }`}
            >
              {coupon?.enabled ? "Habilitado" : "Deshabilitado"}
            </span>
          </p>
          <p>Cantidad Máxima de uso: {coupon?.maxUsage}</p>
          <p>Cantidad veces que fue usado: {coupon?.totalUsed ?? 0}</p>
          <p>Descuento (%): {coupon?.discountFactor}</p>
          <p>
            Activo desde:{" "}
            {coupon?.activeSince
              ? dateFormatted(coupon?.activeSince?.toDate())
              : dateFormatted(coupon?.createAt?.toDate())}
          </p>
          <p>Expiración: {coupon?.expireAt ? dateFormatted(coupon?.expireAt?.toDate()) : "Sin fecha de expiración"}</p>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <div className="mb-4">
        <AclLink name="/admin" to="/admin" variant="primary">
          Regresar
        </AclLink>
      </div>

      <h1 className="text-xl font-bold mb-4">Cupones</h1>

      <div>
        <AclLink name="/admin/coupons/new" to="/admin/coupons/new" variant="primary">
          Crear cupón
        </AclLink>
      </div>

      <div className="block">{isLoading ? spinLoaderMin() : <CouponList data={coupons} />}</div>
    </div>
  );
};
