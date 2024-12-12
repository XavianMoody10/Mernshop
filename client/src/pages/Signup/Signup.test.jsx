import { fireEvent, render, screen } from "@testing-library/react";
import { Signup } from "./Signup";
import { MemoryRouter } from "react-router-dom";

describe("Testing error messages", () => {
  test("Complete all required fields", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
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
});
