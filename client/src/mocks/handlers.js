"use strict";
import { delay, http, HttpResponse } from "msw";
import productsListPage1Mockdata from "./data/productsListPage1.mockdata";

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

    await delay(3000);

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

  http.get("http://localhost:3001/products/list", async ({ request }) => {
    await delay(3000);

    return HttpResponse.json(productsListPage1Mockdata, { status: 200 });
    // return HttpResponse.text("Error getting products", { status: 400 });
  }),
];
