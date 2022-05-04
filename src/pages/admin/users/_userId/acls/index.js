import React, { useEffect, useState } from "reactn";
import { firestore } from "../../../../../firebase";
import { useRouter } from "next/router";
import { spinLoader } from "../../../../../components/common/loader";
import { Checkbox, message } from "antd";
import get from "lodash/get";
import map from "lodash/map";
import mapValues from "lodash/mapValues";
import acls from "../../../../../hooks/acl/acls.json";
import { Controller, useForm } from "react-hook-form";
import flatMap from "lodash/flatMap";
import isEmpty from "lodash/isEmpty";
import { Button, Anchor } from "../../../../../components/form";

export const AdminUserAcls = (props) => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState({});
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [allChecked, setAllChecked] = useState(false);

  const { handleSubmit, control, setValue, watch } = useForm({
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (!userId) return;

    fetchUser();
    setAllChecked(validateAll());
  }, [watch, userId]);

  const validateAll = () => {
    const allCheckboxes = watch();
    if (isEmpty(allCheckboxes)) return;
    const cbxValues = Object.values(allCheckboxes);
    return cbxValues.every((item) => item);
  };

  const fetchUser = async () => {
    const userQuery = await firestore.doc(`users/${userId}`).get();

    if (!userQuery.exists) return router.push("/");

    setUser(userQuery.data());
    setLoadingUser(false);
  };

  const updateUser = async (data) => {
    console.log("data->", data);
    setLoadingUpdateUser(true);
    const newAcls = mapValues(data, (moduleUrls) =>
      map(moduleUrls, (moduleUrl, key) => (moduleUrl ? key.replaceAll("<", "[").replaceAll(">", "]") : null)).filter(
        (moduleUrl) => moduleUrl
      )
    );

    await firestore.doc(`users/${userId}`).update({
      acls: newAcls,
      isAdmin: flatMap(Object.values(newAcls)).some((acl) => acl.includes("admin")),
    });

    props.showNotification("OK", "Guardado", "success");
    setLoadingUpdateUser(false);
  };

  const toggle = () =>
    map(acls, (moduleAcl, module) =>
      map(moduleAcl.items, (description, urlAcl) => {
        setValue(`${module}.${urlAcl}`.replaceAll("[", "<").replaceAll("]", ">"), !allChecked);
        setAllChecked(!allChecked);
      })
    );

  return loadingUser ? (
    spinLoader()
  ) : (
    <div className="mx-auto max-w-[1200px]">
      <div className="my-4">
        <Anchor url="/admin/users" disabled={loadingUpdateUser} variant="primary">
          Regresar
        </Anchor>
      </div>
      <form onSubmit={handleSubmit(updateUser)} noValidate>
        <div>
          Nombre: <b>{user.name}</b>
        </div>
        <div>
          Email: <b>{user.email}</b>
        </div>
        <div>
          Nick: <b>{user.nickname}</b>
        </div>
        <br />
        <h3 className="text-lg">PERMISOS PARA ADMINISTRADORES</h3>
        <hr />
        <br />
        <label>
          <input type="checkbox" onClick={toggle} checked={allChecked} /> Marcar todos
        </label>
        {map(acls, (moduleAcl, module) => (
          <ul key={module} className="my-4">
            <li className="text-base mb-2">{moduleAcl.label}</li>
            {map(moduleAcl.items, (description, urlAcl) => (
              <Controller
                key={urlAcl}
                name={`${module}.${urlAcl.replaceAll("[", "<").replaceAll("]", ">")}`}
                control={control}
                onChange={([value]) => value.target.checked}
                defaultValue={get(user, `acls[${module}]`, []).includes(urlAcl)}
                as={<Checkbox variant="primary">{description}</Checkbox>}
              />
            ))}
          </ul>
        ))}
        <Button
          margin="my-2"
          variant="primary"
          htmltype="submit"
          loading={loadingUpdateUser}
          disabled={loadingUpdateUser}
        >
          GUARDAR
        </Button>
      </form>
    </div>
  );
};
