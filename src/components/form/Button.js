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
          ? "bg-pink-500 text-white hover:bg-pink-700 hover:border-pink-700"
          : "bg-white text-pink-500  hover:bg-pink-500 hover:border-pink-700 hover:text-white"
      }
      ${props.margin ?? "ml-4 mt-4 lg:mt-0"}
      ${props.fontSize ?? "text-base"}
      `}
    {...props}
  >
    {props.loading && <LoadingOutlined />} {props.children}
  </button>
));
