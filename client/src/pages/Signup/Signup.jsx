import React, { useState } from "react";
import { motion } from "motion/react";
import { validateUsingRegex } from "../../utils/validateUsingRegex";

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
      role="form-error-message"
    >
      {message}
    </motion.div>
  );
};

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: "This is an error message",
    isOpen: false,
  });
  const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;

  async function formHandler(e) {
    e.preventDefault();

    try {
      if (!username || !email || !password) {
        throw new Error("Complete all required fields");
      }

      if (validateUsingRegex(usernamePattern, username)) {
        throw new Error("Create a valid username");
      }

      if (validateUsingRegex(emailPattern, email)) {
        throw new Error("Create a valid email");
      }

      if (validateUsingRegex(passwordPattern, password)) {
        throw new Error("Create a valid password");
      }

      return;
    } catch (error) {
      setErrorMessage({
        message: error.message,
        isOpen: true,
      });
    }
  }

  return (
    <main>
      <section className=" h-screen flex flex-col items-center justify-center gap-6">
        <FormErrorMessage
          message={errorMessage.message}
          isOpen={errorMessage.isOpen}
        />

        <FormContainer onSubmitEvent={formHandler}>
          <div className=" space-y-4">
            <FormTextField
              placeholder={"Username"}
              rule={"This is a rule message"}
              onChangeEvent={(e) => setUsername(e.target.value)}
            />
            <FormTextField
              placeholder={"Email"}
              rule={"This is a rule message"}
              onChangeEvent={(e) => setEmail(e.target.value)}
            />
            <FormTextField
              type={"password"}
              placeholder={"Password"}
              rule={"This is a rule message"}
              onChangeEvent={(e) => setPassword(e.target.value)}
            />
          </div>

          <PrimaryButton>Create Account</PrimaryButton>
        </FormContainer>
      </section>
    </main>
  );
};
