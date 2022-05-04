import React from "reactn";
import styled from "styled-components";
import { useRouter } from "next/router";

export const AclLink = (props) => {
  const router = useRouter();

  const isEnabled = props.userAcls.some((acl) => acl === props.name);

  const onClick = () => (isEnabled && props.onClick ? props.onClick() : router.push(props.to));

  return (
    <AnchorTag isEnabled={isEnabled} onClick={onClick} {...props}>
      {props.children}
    </AnchorTag>
  );
};

const AnchorTag = styled.div`
  cursor: ${({ isEnabled }) => (isEnabled ? "pointer" : "default")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "16px")};
  text-decoration: ${(props) => (props.underlined ? `underline` : "")};
  border: ${(props) => (props.border ? props.border : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  display: ${(props) => (props.display ? props.display : "inline-block")};
  color: ${({ variant = "default", theme }) =>
    variant === "primary"
      ? theme.basic.primary
      : variant === "secondary"
      ? theme.basic.secondary
      : variant === "warning"
      ? theme.basic.warning
      : variant === "danger"
      ? theme.basic.danger
      : variant === "dark"
      ? theme.basic.blackDarken
      : theme.basic.default};

  :hover {
    text-decoration: ${(props) => (props.underlined ? `underline` : "")};
    color: ${({ variant = "default", theme }) =>
      variant === "primary"
        ? theme.basic.primaryDark
        : variant === "secondary"
        ? theme.basic.secondaryDark
        : variant === "warning"
        ? theme.basic.warning
        : variant === "danger"
        ? theme.basic.danger
        : theme.basic.primary};
  }

  &[disabled] {
    cursor: not-allowed;
    filter: grayscale(1);
    pointer-events: none;
    color: ${(props) => props.theme.basic.whiteDarken} !important;
  }
`;
