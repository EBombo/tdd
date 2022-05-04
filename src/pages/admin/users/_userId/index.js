import React, { useEffect, useGlobal, useState } from "reactn";
import { config, firestore } from "../../../../firebase";
import get from "lodash/get";
import { Checkbox, Modal } from "antd";
import moment from "moment";
import { Button } from "../../../../components/form/Button";
import { spinLoader } from "../../../../components/common/loader";
import { useRouter } from "next/router";
import styled from "styled-components";
import { userAccountState } from "../../../../components/common/getDataOfList";
import { mediaQuery } from "../../../../constants";
import { useAcl } from "../../../../hooks/acl";

export const User = (props) => {
  const [authUser] = useGlobal("user");

  const { Acl } = useAcl();

  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const sub = fetchUser();
    return () => sub && sub();
  }, [userId]); //eslint-disable-line react-hooks/exhaustive-deps

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
                <Text color={userAccountState(user).color}>{userAccountState(user).label}</Text>{" "}
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
              <span>{user.birthDate && moment(get(user, "birthDate")).format("DD/MM/YYYY")} </span>
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
    </UserContainer>
  );
};

const Text = styled.span`
  color: ${(props) => props.color} !important;
  font-weight: 500;
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
