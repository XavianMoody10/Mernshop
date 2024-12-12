import React from "react";

export const FormTextField = ({ type, placeholder, rule, onChangeEvent }) => {
  return (
    <div className=" space-y-2">
      <input
        type={type || "text"}
        placeholder={placeholder}
        className=" border w-full p-2"
        onChange={onChangeEvent}
      />
      {rule && <p className=" font-medium text-sm text-gray-400">{rule}</p>}
    </div>
  );
};
