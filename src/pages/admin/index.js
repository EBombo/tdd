import React from "reactn";
import { useAcl } from "../../hooks/acl";
import { menus } from "../../components/common/DataList";
import { Anchor } from "../../components/form/Anchor";

export const AdminIndex = (props) => {
  const { aclMenus } = useAcl();

  return (
    <div className="max-w-[1200px] mx-auto px-4 text-center py-8">
      <div className="title text-2xl mb-8">Bienvenido Administrador</div>
      <div className="list-subtitle text-xl mb-4">Lista de permisos otorgados</div>
      <div className="flex justify-center">
        <ul>
          {aclMenus({ menus: menus }).map((menu) => (
            <li key={menu.url} className="mb-4">
              <Anchor url={menu.url} variant="primary">
                <span className="text-lg hover:text-xl">{menu.name}</span>
              </Anchor>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

