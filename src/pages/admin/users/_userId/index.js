import React, { useEffect, useGlobal, useState } from "reactn";
import { config, firestore } from "../../../../firebase";
import get from "lodash/get";
import { Checkbox, Modal } from "antd";
import { snapshotToArray } from "../../../../utils";
import moment from "moment";
import { Button } from "../../../../components/form/Button";
import { spinLoader } from "../../../../components/common/loader";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  userAccountState,
  userVerifiedState,
} from "../../../../components/common/getDataOfList";
import { mediaQuery } from "../../../../constants";
import { useAcl } from "../../../../hooks/acl";
import { useFetch } from "../../../../hooks/useFetch";
import { useSendError } from "../../../../hooks/useSendError";

export const User = (props) => {
  const [authUser] = useGlobal("user");

  const { Acl } = useAcl();

  const router = useRouter();
  const { userId } = router.query;

  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [limitTransactions, setLimitTransactions] = useState(20);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loading, setLoading] = useState(false);

  const { sendError } = useSendError();
  const { Fetch } = useFetch();

  useEffect(() => {
    if (!userId) return;

    const sub = fetchUser();
    return () => sub && sub();
  }, [userId]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // fetchTransactions();
  }, [limitTransactions]); //eslint-disable-line react-hooks/exhaustive-deps

  const fetchUser = () =>
    firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((userOnSnapShot) => {
        if (!userOnSnapShot.exists) return goBack();

        setUser(userOnSnapShot.data());
        setLoadingUser(false);
      });

  const fetchTransactions = async () => {
    const querySnapshot = await firestore
      .collection("transactions")
      .where("user.id", "==", userId)
      .orderBy("createAt", "desc")
      .limit(limitTransactions)
      .get();

    setTransactions(snapshotToArray(querySnapshot));
    setLoadingTransactions(false);
  };

  const goBack = () => router.push("/admin/users");

  const urlApiRequestIsVerified = () => `${config.serverUrl}/admin/users/${userId}/verified`;

  const banAccount = (isBanned) =>
    Modal.confirm({
      title: "Esta seguro?",
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk: async () =>
        await firestore.doc("users/" + userId).update({ isBanned }),
    });

  const actionColor = (action) => {
    if (action === "user-win") return "green";
    if (action === "user-lose") return "red";
    if (action === "user-cancel-match") return "black";
    if (action === "charge") return "green";
    if (action === "free") return "#cece03";

    return "black";
  };

  const verifyUser = async () => {
    try {
      setLoadingVerify(true);

      const { error } = await Fetch(urlApiRequestIsVerified(), "PUT");

      props.showNotification(
        error ? "ERROR" : "OK",
        error ? "Algo salió mal" : "Realizado",
        error ? "error" : "success"
      );

      !error && fetchTransactions();
    } catch (error) {
      sendError({ error: Object(error).toString(), action: "verifyUser" });
    }
    setLoadingVerify(false);
  };

  const deleteAuthenticationUser = async (email) => {
    setLoading(true);
    try {
      const { error } = await Fetch(
        `${config.serverUrlAdmin}/admin/${get(authUser, "id", "")}/delete-user`,
        "POST",
        {
          email,
        }
      );

      props.showNotification(
        "OK",
        error ? "Algo salió mal" : "Se elimino correctamente el email",
        "success"
      );
    } catch (error) {
      sendError({
        error: Object(error).toString(),
        action: "sendSuggestion",
      });
    }
    setLoading(false);
    router.push("/admin/users");
  };

  return loadingUser ? (
    spinLoader()
  ) : (
    <UserContainer>
      <div className="container-items">
        <div className="content-coins-left">
          <fieldset>
            <legend>
              <span className="title-legend">Información</span>
            </legend>
            <div className="item">
              <label>Estado de cuenta: </label>
              <span>
                {" "}
                <Text color={userAccountState(user).color}>
                  {userAccountState(user).label}
                </Text>{" "}
              </span>
            </div>
            <div className="item">
              <label>Nickname: </label>
              <span>{get(user, "nickname", "")} </span>
            </div>
            <div className="item">
              <label>Email: </label> <span>{get(user, "email", "")} </span>
            </div>
            <div className="item">
              <label>Género: </label> <span>{get(user, "gender", "")} </span>
            </div>
            <div className="item">
              <label>Cumpleaños: </label>{" "}
              <span>
                {user.birthDate &&
                  moment(get(user, "birthDate")).format("DD/MM/YYYY")}{" "}
              </span>
            </div>
            <div className="item">
              <label>Teléfono: </label>
              <span
                onClick={() =>
                  window.open(
                    `https://wa.me/51${get(user, "phoneNumber", "")}`,
                    "_blank"
                  )
                }
                style={{ cursor: "pointer", color: "green" }}
              >
                {get(user, "phoneNumber", "")}{" "}
              </span>
            </div>
            <div className="item">
              <label> Creado: </label>

              <span>
                {user.createAt &&
                  moment(get(user, "createAt", null)?.toDate()).format(
                    "DD/MM/YYYY"
                  )}{" "}
              </span>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className="title-legend">Verificar</span>
            </legend>
            <div className="item">
              <ContainerValidate>
                <label>Verificar usuario: </label>
                <Button
                  loading={loadingVerify}
                  variant={userVerifiedState(user).type}
                  onClick={() => verifyUser()}
                >
                  {userVerifiedState(user).text}
                </Button>
              </ContainerValidate>
            </div>
          </fieldset>
          <Acl name="/admin/users/[userId]/acls">
            <fieldset>
              <legend>
                <span className="title-legend">Cuenta</span>
              </legend>
              <div className="item">
                <label>Editar permisos :</label>
                <Button
                  variant="primary"
                  display="inline"
                  onClick={() => router.push(`/admin/users/${userId}/acls`)}
                >
                  EDITAR PERMISOS
                </Button>
                <br />
                <br />
                <label>Eliminar Usuario :</label>
                <Button
                  variant="danger"
                  display="inline"
                  onClick={() =>
                    deleteAuthenticationUser(get(user, "email", ""))
                  }
                  loading={loading}
                >
                  Eliminar Usuario
                </Button>
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
        <div className="content-coins-right">
          <fieldset>
            <legend>
              <span className="title-legend">Transacciones</span>
            </legend>
            <div className="item-transactions">
              <div className="scrollbar" id="style-scroll">
                <div className="force-overflow">
                  {transactions.map((transaction, index) => (
                    <ul
                      key={index}
                      className="list-transaction"
                      onClick={() => console.log(transaction)}
                    >
                      <li>
                        Creado:{" "}
                        <span className="text-bold">
                          {" "}
                          {moment(transaction.createAt.toDate()).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}{" "}
                        </span>
                      </li>
                      <li style={{ color: actionColor(transaction.action) }}>
                        Acción:{" "}
                        <span className="text-bold">{transaction.action}</span>
                      </li>
                      <li>
                        Descripción:{" "}
                        <span className="text-bold">
                          {transaction.description}
                        </span>
                      </li>
                      <li>
                        Nota:{" "}
                        <span className="text-bold">{transaction.note}</span>
                      </li>
                      <li>
                        Dinero:{" "}
                        <span className="text-bold">{transaction.amount}</span>
                      </li>
                      <br />
                      <hr />
                    </ul>
                  ))}
                  {limitTransactions <= transactions.length && (
                    <Button
                      loading={loadingTransactions}
                      disabled={loadingTransactions}
                      onClick={() => {
                        setLoadingTransactions(true);
                        setLimitTransactions(limitTransactions + 20);
                      }}
                    >
                      VER MAS
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </UserContainer>
  );
};

const Text = styled.span`
  color: ${(props) => props.color} !important;
  font-weight: 500;
`;

const ContainerValidate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  width: 100%;

  .container-items {
    display: flex;
    flex-direction: column;

    ${mediaQuery.afterMobile} {
      flex-direction: row;
      width: 100%;
    }

    .content-coins-left {
      width: 100%;
      padding: 5px;

      ${mediaQuery.afterMobile} {
        width: 50%;
      }

      @media (min-width: 1450px) {
        width: auto;
      }
    }

    .content-coins-right {
      width: 100%;
      padding: 5px;

      ${mediaQuery.afterMobile} {
        width: 50%;
      }

      .item-transactions {
        scroll-behavior: smooth;
        background-color: ${(props) => props.theme.basic.white};
        float: left;
        width: 100%;
        height: 700px;
        margin-bottom: 15px;
        overflow-y: scroll;
        overflow-x: unset;
        padding: 3px;
        border-radius: 3px;
        @media (max-width: 992px) {
          height: 566px;
        }
        @media (max-width: 769px) {
          height: 366px;
        }

        .scrollbar {
          float: left;
          height: 100%;
          width: 100%;
          background: ${(props) => props.theme.basic.white};
          overflow-y: scroll;
          z-index: 9999;
          @media (max-width: 992px) {
            width: 100%;
          }
        }

        .force-overflow {
          padding: 0px 20px;

          .list-transaction {
            list-style: none;
          }

          .text-bold {
            @include fontWeightFont(600);
            margin-left: 5px;
          }
        }

        #style-scroll::-webkit-scrollbar {
          width: 10px;
          background-color: ${(props) => props.theme.basic.white};
        }

        #style-scroll::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: ${(props) => props.theme.basic.white};
        }

        #style-scroll::-webkit-scrollbar-thumb {
          background-color: ${(props) => props.theme.basic.blackDarken};
          border: 2px solid ${(props) => props.theme.basic.white};
        }
      }
    }
  }

  .title-add-coins {
    margin-top: 1rem;
  }

  .item-switch-yape {
    width: 100%;
    text-align: left;
    padding: 10px 0;
    color: ${(props) => props.theme.basic.white};

    .ant-switch {
      width: 100px;
      text-align: right;

      .ant-switch-handle {
        width: 55px;

        ::before {
          content: "REGALO";
          font-weight: bold;
          font-size: 11px;
          background: ${(props) => props.theme.basic.primary};
          color: ${(props) => props.theme.basic.white};
          padding: 0 5px;
        }
      }

      &.ant-switch-checked {
        text-align: left;
        background: rgba(0, 0, 0, 0.25);

        .ant-switch-handle {
          left: 50px;

          ::before {
            content: "PAGO";
            font-weight: bold;
            font-size: 11px;
            background: ${(props) => props.theme.basic.primary};
            color: ${(props) => props.theme.basic.white};
            padding: 0 5px;
          }
        }
      }
    }
  }

  .item {
    width: 100%;

    h2,
    label {
      padding-right: 10px;
    }

    p {
      padding-right: 10px;
      margin-bottom: 0;
    }

    input {
      margin-bottom: 10px;
    }

    button {
      margin-right: 5px;
    }

    span {
      @include fontWeightFont(600);
    }
  }
`;
