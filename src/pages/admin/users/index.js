import React, { useEffect, useState } from "react";
import moment from "moment";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { Divider, Input, List, Tooltip } from "antd";
import { useRouter } from "next/router";
import { snapshotToArray } from "../../../utils";
import { firestore } from "../../../firebase";
import { useAcl } from "../../../hooks";
import { Anchor } from "../../../components/form";
import { Icon } from "../../../components/common/Icons";
import { spinLoaderMin } from "../../../components/common/loader";

const defaultLimitUsers = 100;

export const Users = (props) => {
  const router = useRouter();
  const { AclLink, Acl } = useAcl();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(defaultLimitUsers);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    !search.trim() ? fetchUsers() : fetchUsersByName();
  }, [search, limit]);

  const fetchUsers = async () => {
    const users = await firestore.collection("users").orderBy("createAt", "desc").limit(limit).get();

    setUsers(snapshotToArray(users));

    setLoadingUsers(false);
  };

  const fetchUsersByName = async () => {
    const users = await firestore
      .collection("users")
      .where("searchName", "array-contains", search.toUpperCase())
      .limit(defaultLimitUsers)
      .get();

    setUsers(snapshotToArray(users));

    setLoadingUsers(false);
  };

  return loadingUsers ? (
    spinLoaderMin()
  ) : (
    <div className="mx-auto max-w-[1200px] py-8">
      <div className="mb-4">
        <Anchor url="/admin" variant="primary">
          Regresar
        </Anchor>
      </div>
      <div className="title">
        <h2 className="text-lg">Usuarios</h2>
      </div>
      <br />
      <div className="content-filters">
        <Input.Search className="search-team" placeholder="Buscar usuario" onSearch={(value) => setSearch(value)} />
      </div>
      <Divider />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={orderBy(users, ["createAt"], ["desc"])}
        renderItem={(user) => (
          <List.Item
            style={{ cursor: "pointer", display: "flex" }}
            actions={[
              <div
                style={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  cursor: "pointer",
                }}
              >
                <Acl name="/admin/users/[userId]">
                  <Tooltip title="Editar usuario">
                    <Icon
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                      style={{ color: "gray", fontSize: "24px" }}
                      type="edit"
                    />
                  </Tooltip>
                </Acl>
              </div>,
            ]}
          >
            <AclLink name="/admin/users/[userId]" to={`/admin/users/${user.id}`}>
              <div className="flex flex-col items-start text-base">
                <p>{`${get(user, "name", "")} ${get(user, "lastName", "")}`}</p>
                <span className="text-black">{get(user, "email", "without email")}</span>
                <h4>{`Creado: ${user.createAt && moment(user.createAt.toDate()).format("DD MMM YYYY")}`}</h4>

                {user.isAdmin && <div className="border-primary border-2 rounded text-primary px-2 my-1">ADMIN</div>}
                {user.studentId && (
                  <div className="border-primaryDarken border-2 rounded text-primaryDarken px-2 my-1">STUDENT</div>
                )}
                {user.hasPayment && <div className="border-success border-2 rounded text-success px-2 my-1">PAID</div>}
              </div>
            </AclLink>
          </List.Item>
        )}
      />

      {limit <= users?.length && <Anchor onClick={() => setLimit(limit + defaultLimitUsers)}>Ver más</Anchor>}
    </div>
  );
};
