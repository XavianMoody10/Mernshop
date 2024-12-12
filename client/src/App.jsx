import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Shop } from "./pages/Shop/Shop";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";

const App = () => {
  // All Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Shop></Shop>} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
