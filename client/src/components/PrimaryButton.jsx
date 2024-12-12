import React from "react";

export const PrimaryButton = ({ children, onClickEvent }) => {
  return (
    <button
      className=" w-full bg-black text-white text-lg font-semibold py-3 rounded-md hover:bg-green-500 duration-150"
      onClick={onClickEvent}
    >
      {children}
    </button>
  );
};
