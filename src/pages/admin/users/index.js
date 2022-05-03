import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { Divider, Input, List, Tooltip } from "antd";
import { useRouter } from "next/router";
import { snapshotToArray } from "../../../utils";
import { firestore } from "../../../firebase";
import { useAcl } from "../../../hooks/acl";
import { Icon } from "../../../components/common/Icons";
import { Button } from "../../../components/form";
import { spinLoaderMin } from "../../../components/common/loader";
// import { ModalDeleteUser } from "./ModalDeleteUser";
import { userAccountState } from "../../../components/common/getDataOfList";

export const Users = (props) => {
  const router = useRouter();
  const { AclLink, Acl } = useAcl();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    !search.trim() ? fetchUsers() : fetchUsersByName();
  }, [search]);

  const fetchUsers = async () => {
    const users = await firestore
      .collection("users")
      .orderBy("createAt", "desc")
      .limit(100)
      .get();

    setUsers(snapshotToArray(users));

    setLoadingUsers(false);
  };

  const fetchUsersByName = async () => {
    const users = await firestore
      .collection("users")
      .where("searchName", "array-contains", search.toUpperCase())
      .limit(100)
      .get();

    setUsers(snapshotToArray(users));

    setLoadingUsers(false);
  };

  return loadingUsers ? (
    spinLoaderMin()
  ) : (
    <div className="mx-auto max-w-[1200px]">
      {/*
      {isVisibleModalDelete && (
        <ModalDeleteUser
          isVisibleModalDelete={isVisibleModalDelete}
          setIsVisibleModalDelete={setIsVisibleModalDelete}
        />
      )}
      */}
      <div className="title">
        <h2>Usuarios</h2>
        <Button
          variant="primary"
          margin="0"
          onClick={() => setIsVisibleModalDelete(true)}
        >
          Eliminar Usuario
        </Button>
      </div>
      <br />
      <div className="content-filters">
        <Input.Search
          className="search-team"
          placeholder="Buscar usuario"
          onSearch={(value) => setSearch(value)}
        />
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
              <ContentAdminUser>
                <p>{`${get(user, "name", "")} ${get(user, "lastName", "")}`}</p>
                <span>Nickname: {user.nickname}</span>
                <span>{`Monto: ${get(user, "money", 0)}`}</span>
                <span>{get(user, "email", "without email")}</span>
                {/*
                <span>
                  Estado de cuenta:{" "}
                  <Text color={userAccountState(user).color}>
                    {userAccountState(user).label}
                  </Text>
                </span>
                */}

                <h4>{`Creado: ${
                  user.createAt &&
                  moment(user.createAt.toDate()).format("DD MMM YYYY")
                }`}</h4>
              </ContentAdminUser>
            </AclLink>
          </List.Item>
        )}
      />
    </div>
  );
};

const Text = styled.span`
  color: ${(props) => props.color} !important;
  font-weight: 500;
`;

const ContentAdminUser = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: ${(props) => props.theme.basic.default};
    font-size: 0.8rem;
  }
`;
