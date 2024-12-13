import { screen, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Shop } from "./Shop";
import store from "../../store/store";
import axios from "axios";
import productsListPage1Mockdata from "../../mocks/data/productsListPage1.mockdata";

jest.mock("axios");

test("Should get all products", async () => {
  axios.get.mockResolvedValue({
    data: productsListPage1Mockdata,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    screen.getAllByRole("product");
  });
});

test("Should get error message", async () => {
  axios.get.mockRejectedValue(new Error("Error getting products"));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    // screen.getAllByRole("product");
    screen.getByText("ERROR GETTING PRODUCTS");
  });
});
