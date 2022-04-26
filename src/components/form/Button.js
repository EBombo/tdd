import React, {forwardRef} from "reactn";

export const Button = forwardRef((props, ref) => (
  <button
    ref={ref}
    className={`ml-4 inline-block text-base
      px-4 py-3 leading-none border rounded-3xl border-pink-500 mt-4 lg:mt-0
      ${props.primary ? "bg-pink-500 text-white" : "bg-white text-pink-500"}
      `}
    {...props}
  >{props.children}</button>
));

