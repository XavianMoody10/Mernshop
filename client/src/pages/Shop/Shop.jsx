import React, { useEffect, useState } from "react";
import { productsRequest } from "../../services/products.services";
import { PrimaryButton } from "../../components/PrimaryButton";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { ShoppingProduct } from "../../components/ShoppingProduct";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const page = "1";
  const categories = "";
  const sortby = "";

  // Fetch products data
  async function getProducts() {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await productsRequest(page, categories, sortby);
      const results = response.results;
      setProducts(results);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }

  // Fetch products when page loads
  useEffect(() => {
    getProducts();
  }, []);

  // Display all products
  const productsMap = products.map((p) => {
    return <ShoppingProduct key={p.code} info={p} />;
  });

  return (
    <main>
      <section role="shop-section">
        {!isError ? (
          <>
            <LoadingOverlay isLoading={isLoading} />

            <div className=" pt-24 pb-10 grid grid-cols-1 gap-8 w-[90%] mx-auto max-w-[1500px] min-[500px]:grid-cols-2 md:grid-cols-3 min-[1200px]:grid-cols-4 2xl:grid-cols-5">
              {productsMap}
            </div>
          </>
        ) : (
          <div className=" h-screen flex items-center justify-center">
            <div className=" space-y-3 max-w-fit">
              <p className=" text-xl font-bold text-center sm:text-3xl">
                ERROR GETTING PRODUCTS
              </p>
              <PrimaryButton onClickEvent={getProducts}>
                Reload Products
              </PrimaryButton>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
