import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3001/auth/signup", async ({ request }) => {
    const { username, email, password } = await request.json();

    // return HttpResponse.json(
    //   {
    //     _id: "1",
    //     username,
    //     email,
    //   },
    //   { status: 200 }
    // );

    return HttpResponse.text("Email already registered", { status: 409 });
  }),
];
