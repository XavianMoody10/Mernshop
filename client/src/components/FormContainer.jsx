import React from "react";

export const FormContainer = ({ children, onSubmitEvent }) => {
  return (
    <form className=" w-[90%] max-w-[420px] space-y-5" onSubmit={onSubmitEvent}>
      {children}
    </form>
  );
};
