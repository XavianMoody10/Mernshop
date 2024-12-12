import { validateUsingRegex } from "./validateUsingRegex";

describe("Testing Regex patterns validation", () => {
  const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;

  test("Validate Username", () => {
    expect(validateUsingRegex(usernamePattern, "User123")).toBe(true);
    expect(validateUsingRegex(usernamePattern, "john ")).toBe(false);
  });

  test("Validate Email", () => {
    expect(validateUsingRegex(emailPattern, "example@example.com")).toBe(true);
    expect(validateUsingRegex(emailPattern, "@missinglocal.org")).toBe(false);
  });

  test("Validate Password", () => {
    expect(validateUsingRegex(passwordPattern, "Password@123")).toBe(true);
    expect(validateUsingRegex(passwordPattern, "Hello123")).toBe(false);
  });
});
