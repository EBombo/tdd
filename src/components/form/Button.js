import React, { forwardRef } from "reactn";
import { LoadingOutlined } from "@ant-design/icons";

export const Button = forwardRef((props, ref) => (
  <button
    ref={ref}
    className={`inline-block
      px-4 py-3 leading-none border rounded-3xl ${
        props.disabled ? "border-blackDarken pointer-events-none cursor-not-allowed" : "border-pink-500 cursor-pointer"
      }
      ${
        props.disabled
          ? "bg-blackLighten text-gray"
          : props.primary
          ? "bg-primary text-white hover:bg-primaryDark"
          : "bg-white text-primary hover:bg-primaryLight hover:text-white"
      }
      ${props.margin ?? "ml-4 mt-4 lg:mt-0"}
      ${props.fontSize ?? "text-base"}
      `}
    {...props}
  >
    {props.loading && <LoadingOutlined />} {props.children}
  </button>
));
