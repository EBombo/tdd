import React, {forwardRef} from "reactn";

export const Button = forwardRef((props, ref) => (
  <button
    ref={ref}
    className={`inline-block text-base
      px-4 py-3 leading-none border rounded-3xl border-pink-500
      ${props.primary ? "bg-pink-500 text-white" : "bg-white text-pink-500"}
      ${props.margin ?? "ml-4 mt-4 lg:mt-0"}
      `}
    {...props}
  >{props.children}</button>
));

