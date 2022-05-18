import React, { useEffect, useRef, useState } from "react";
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
import { CSVLink } from "react-csv";
import { spinLoaderMin } from "../../../components/common/loader";

const defaultLimitUsers = 100;

const headers = [
  { label: "Nombre", key: "name" },
  { label: "Apellidos", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Document", key: "documentId" },
  { label: "Codigo de estudiante", key: "studentId" },
  { label: "Compañia", key: "company" },
  { label: "Cargo", key: "title" },
  { label: "Num. tlf", key: "phoneNumber" },
  { label: "Referencia", key: "reference" },
];

export const Users = (props) => {
  const router = useRouter();
  const { AclLink, Acl } = useAcl();

  const csvRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(defaultLimitUsers);
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  useEffect(() => {
    if (!allUsers?.length) return;

    csvRef.current.link.click();
  }, [allUsers]);

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

  const fetchAllUsers = async () => {
    setIsLoadingDownload(true);
    const usersQuery = await firestore.collection("users").get();

    const allUsers_ = snapshotToArray(usersQuery);

    const usersMapped = allUsers_.map((user) => {
      return {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        documentId: user.documentId,
        university: user.university,
        studentId: user.studentId,
        career: user.career,
        company: user.company,
        companyRole: user.title,
        phoneNumber: user.phoneNumber,
        reference: user.reference,
        register: user.createAt.toDate(),
        countryCode: user.countryCode,
        hasPayment: user.hasPayment ? "yes" : "no",
      };
    });

    setAllUsers(usersMapped);
    setIsLoadingDownload(false);
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
        <h2 className="text-lg text-center">Lista de usuarios</h2>
      </div>

      <div className="content-filters">
        <Input.Search className="search-team" placeholder="Buscar usuario" onSearch={(value) => setSearch(value)} />
      </div>

      <div className="text-center">
        <Anchor onClick={() => fetchAllUsers()} loading={isLoadingDownload} variant="primary">
          Descargar todos los usuarios
        </Anchor>
        <CSVLink data={allUsers} ref={csvRef} key={`key-all-users-csv-${allUsers.length}`} filename="users.csv" />
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

      {limit <= users?.length && (
        <Anchor onClick={() => setLimit(limit + defaultLimitUsers)} loading={loadingUsers} variant="primary">
          Ver más
        </Anchor>
      )}
    </div>
  );
};
