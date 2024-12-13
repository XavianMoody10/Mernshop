import axios from "axios";

async function productsRequest(page, categories, sortby) {
  const url = "http://localhost:3001/products/list";

  try {
    const response = await axios.get(url, {
      params: {
        page,
        categories,
        sortby,
      },
    });

    return response.data;
  } catch (error) {
    const errorCodes = [400];

    if (errorCodes.includes(error.status)) {
      throw new Error(error.response.data);
    }

    throw new Error(error.message);
  }
}

export { productsRequest };
