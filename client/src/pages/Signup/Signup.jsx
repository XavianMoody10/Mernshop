import React, { useState } from "react";
import { validateUsingRegex } from "../../utils/validateUsingRegex";
import { FormContainer } from "../../components/FormContainer";
import { PrimaryButton } from "../../components/PrimaryButton";
import { FormTextField } from "../../components/FormTextField";
import { FormErrorMessage } from "../../components/FormErrorMessage";
import { signupRequest } from "../../services/auth.services";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../store/features/user/userSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Closes error message
  function closeErrorMessage() {
    if (errorMessage.isOpen) {
      setErrorMessage((prev) => {
        return { message: prev.message, isOpen: false };
      });
    }
  }

  // Handles events when form submits
  async function formHandler(e) {
    e.preventDefault();

    try {
      if (!username || !email || !password) {
        throw new Error("Complete all required fields");
      }

      if (!validateUsingRegex(usernamePattern, username)) {
        throw new Error("Create a valid username");
      }

      if (!validateUsingRegex(emailPattern, email)) {
        throw new Error("Create a valid email");
      }

      if (!validateUsingRegex(passwordPattern, password)) {
        throw new Error("Create a valid password");
      }

      const response = await signupRequest(username, email, password);
      dispatch(updateUser(response));
      navigate("/");
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
              rule={"At least one uppercase, one lowercase, and no symbols"}
              onChangeEvent={(e) => {
                closeErrorMessage();
                setUsername(e.target.value);
              }}
            />
            <FormTextField
              placeholder={"Email"}
              rule={"Must be a valid email"}
              onChangeEvent={(e) => {
                closeErrorMessage();
                setEmail(e.target.value);
              }}
            />
            <FormTextField
              type={"password"}
              placeholder={"Password"}
              rule={"At least one uppercase, one lowercase, and one symbol"}
              onChangeEvent={(e) => {
                closeErrorMessage();
                setPassword(e.target.value);
              }}
            />
          </div>

          <PrimaryButton>Create Account</PrimaryButton>
        </FormContainer>

        <Link to={"/auth/login"} className=" font-medium hover:underline">
          Already have an account?
        </Link>
      </section>
    </main>
  );
};
