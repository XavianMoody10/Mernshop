import React, { useState } from "react";
import { motion } from "motion/react";

const FormTextField = ({ type, placeholder, rule, onChangeEvent }) => {
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

const FormContainer = ({ children, onSubmitEvent }) => {
  return (
    <form className=" w-[90%] max-w-[420px] space-y-5" onSubmit={onSubmitEvent}>
      {children}
    </form>
  );
};

const PrimaryButton = ({ children, onClickEvent }) => {
  return (
    <button
      className=" w-full bg-black text-white text-lg font-semibold py-3 rounded-md hover:bg-green-500 duration-150"
      onClick={onClickEvent}
    >
      {children}
    </button>
  );
};

const FormErrorMessage = ({ message, isOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-10px" }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-10px" }}
      className=" bg-red-500 w-[90%] max-w-[420px] text-center text-white font-semibold py-3 rounded-md"
    >
      {message}
    </motion.div>
  );
};

export const Signup = () => {
  const [errorMessage, setErrorMessage] = useState({
    message: "This is an error message",
    isOpen: false,
  });

  return (
    <main>
      <section className=" h-screen flex flex-col items-center justify-center gap-6">
        <FormErrorMessage
          message={errorMessage.message}
          isOpen={errorMessage.isOpen}
        />

        <FormContainer>
          <div className=" space-y-4">
            <FormTextField
              placeholder={"Username"}
              rule={"This is a rule message"}
            />
            <FormTextField
              placeholder={"Email"}
              rule={"This is a rule message"}
            />
            <FormTextField
              type={"password"}
              placeholder={"Password"}
              rule={"This is a rule message"}
            />
          </div>

          <PrimaryButton>Create Account</PrimaryButton>
        </FormContainer>
      </section>
    </main>
  );
};
