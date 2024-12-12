import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Signup } from "./Signup";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../../store/store";

jest.mock("axios");

describe("Testing error messages", () => {
  test("Complete all required fields", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
    const usernameField = screen.getByPlaceholderText("Username");
    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const errorMessage = screen.getByRole("form-error-message");
    const button = screen.getByText("Create Account");

    fireEvent.change(usernameField, { target: { value: "" } });
    fireEvent.change(emailField, { target: { value: "" } });
    fireEvent.change(passwordField, { target: { value: "" } });

    fireEvent.click(button);

    await expect(errorMessage.textContent).toBe("Complete all required fields");
  });

  test("Email already registered", async () => {
    axios.post.mockRejectedValue(new Error("Email already registered"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByPlaceholderText("Username");
    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const errorMessage = screen.getByRole("form-error-message");
    const button = screen.getByText("Create Account");

    fireEvent.change(usernameField, { target: { value: "Xavian10" } });
    fireEvent.change(emailField, {
      target: { value: "XavianMoody1025@gmail.com" },
    });
    fireEvent.change(passwordField, { target: { value: "Wwetna123#" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(errorMessage.textContent).toBe("Email already registered");
    });
  });
});
