import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import axios from "axios";
import store from "../../store/store";
import { Shop } from "../Shop/Shop";

jest.mock("axios");

describe("Testing login error messages", () => {
  test("Complete all required fields", async () => {
    axios.post.mockRejectedValue(new Error("Complete all required fields"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const errorMessage = screen.getByRole("form-error-message");
    const button = screen.getByText("Login");

    fireEvent.change(emailField, {
      target: { value: "" },
    });

    fireEvent.change(passwordField, { target: { value: "" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(errorMessage.textContent).toBe("Complete all required fields");
    });
  });

  test("Invalid credentials", async () => {
    axios.post.mockRejectedValue(new Error("Invalid credentials"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const errorMessage = screen.getByRole("form-error-message");
    const button = screen.getByText("Login");

    fireEvent.change(emailField, {
      target: { value: "XavianMoody1025@gmail.com" },
    });

    fireEvent.change(passwordField, { target: { value: "Wwetna123#" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(errorMessage.textContent).toBe("Invalid credentials");
    });

    fireEvent.change(passwordField, { target: { value: "Wwetna123" } });

    await waitFor(() => {
      expect(errorMessage.style.opacity).toBe("0");
    });
  });
});

describe("Testing successful login", () => {
  test("Login is successful", async () => {
    axios.post.mockResolvedValue({
      response: {
        status: 200,
        data: {
          _id: "1",
          username: "Xavian10",
          email: "XavianMoody1025@gmail.com",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/auth/login"]}>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const button = screen.getByText("Login");

    fireEvent.change(emailField, {
      target: { value: "XavianMoody1025@gmail.com" },
    });
    fireEvent.change(passwordField, { target: { value: "Wwetna123#" } });

    fireEvent.click(button);

    await waitFor(() => {
      screen.getByRole("shop-section");
    });
  });
});
