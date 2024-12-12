import axios from "axios";

async function signupRequest(username, email, password) {
  const url = "http://localhost:3001/auth/signup";

  try {
    const response = await axios.post(url, { username, email, password });
    return response.data;
  } catch (error) {
    const errorCodes = [409];

    if (errorCodes.includes(error.status)) {
      throw new Error(error.response.data);
    }

    throw new Error(error.message);
  }
}

export { signupRequest };
