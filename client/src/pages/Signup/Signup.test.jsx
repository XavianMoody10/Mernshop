import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Signup } from "./Signup";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../../store/store";
import { Shop } from "../Shop/Shop";

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

  test("Create a valid username", async () => {
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

    fireEvent.change(usernameField, { target: { value: "user" } });
    fireEvent.change(emailField, {
      target: { value: "XavianMoody1025@gmail.com" },
    });
    fireEvent.change(passwordField, { target: { value: "Wwetna123#" } });

    fireEvent.click(button);

    await expect(errorMessage.textContent).toBe("Create a valid username");
  });

  test("Create a valid email", async () => {
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
      target: { value: "XavianMoody1025gmail.com" },
    });
    fireEvent.change(passwordField, { target: { value: "Wwetna123#" } });
    fireEvent.click(button);

    await expect(errorMessage.textContent).toBe("Create a valid email");
  });

  test("Create a valid password", async () => {
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
    fireEvent.change(passwordField, { target: { value: "Wwetna123" } });
    fireEvent.click(button);

    await expect(errorMessage.textContent).toBe("Create a valid password");
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

describe("Testing successfull signup", () => {
  test("Signup is successful", async () => {
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
        <MemoryRouter initialEntries={["/auth/signup"]}>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByPlaceholderText("Username");
    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const button = screen.getByText("Create Account");

    fireEvent.change(usernameField, { target: { value: "Xavian10" } });
    fireEvent.change(emailField, {
      target: { value: "XavianMoody1025@gmail.com" },
    });
    fireEvent.change(passwordField, { target: { value: "Wwetna123#" } });

    fireEvent.click(button);

    await screen.findByText("Shop");
  });
});
