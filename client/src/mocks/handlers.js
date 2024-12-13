"use strict";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3001/auth/signup", async ({ request }) => {
    const { username, email, password } = await request.json();

    const user = {
      _id: "1",
      username: "Xavian",
      email: "XavianMoody1025@gmail.com",
      password: "Wwetna123#",
    };

    if (email === user) {
      return HttpResponse.text("Email already registered", { status: 409 });
    }

    return HttpResponse.json(
      {
        _id: "1",
        username,
        email,
      },
      { status: 200 }
    );
  }),

  http.post("http://localhost:3001/auth/login", async ({ request }) => {
    const { email, password } = await request.json();
    const user = {
      _id: "1",
      username: "Xavian",
      email: "XavianMoody1025@gmail.com",
      password: "Wwetna123#",
    };

    if (email === user.email) {
      if (password === user.password) {
        return HttpResponse.json(
          {
            _id: "1",
            username: "Xavian",
            email: "XavianMoody1025@gmail.com",
          },
          { status: 200 }
        );
      }
    }

    return HttpResponse.text("Invalid credentials", { status: 401 });
  }),
];
