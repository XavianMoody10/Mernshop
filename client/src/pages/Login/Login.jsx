import React, { useState } from "react";
import { FormErrorMessage } from "../../components/FormErrorMessage";
import { FormTextField } from "../../components/FormTextField";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { loginRequest } from "../../services/auth.services";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/features/user/userSlice";
import { TransparentLoadingOverlay } from "../../components/TransparentLoadingOverlay";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: "This is an error message",
    isOpen: false,
  });
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
      if (!email || !password) {
        throw new Error("Complete all required fields");
      }

      setIsLoading(true);
      const response = await loginRequest(email, password);
      dispatch(updateUser(response));
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage({
        message: error.message,
        isOpen: true,
      });
    }
  }

  return (
    <main>
      <TransparentLoadingOverlay isLoading={isLoading} />

      <section className=" h-screen flex flex-col items-center justify-center gap-6">
        <FormErrorMessage
          message={errorMessage.message}
          isOpen={errorMessage.isOpen}
        />

        <FormContainer onSubmitEvent={formHandler}>
          <div className=" space-y-4">
            <FormTextField
              placeholder={"Email"}
              onChangeEvent={(e) => {
                closeErrorMessage();
                setEmail(e.target.value);
              }}
            />
            <FormTextField
              type={"password"}
              placeholder={"Password"}
              onChangeEvent={(e) => {
                closeErrorMessage();
                setPassword(e.target.value);
              }}
            />
          </div>

          <PrimaryButton>Login</PrimaryButton>
        </FormContainer>

        <Link to={"/auth/signup"} className=" font-medium hover:underline">
          Need a account?
        </Link>
      </section>
    </main>
  );
};
