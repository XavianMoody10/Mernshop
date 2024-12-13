import React from "react";
import { PrimaryButton } from "./PrimaryButton";

export const ShoppingProduct = ({ info }) => {
  return (
    <div className=" flex flex-col justify-between gap-8" role="product">
      <div>
        <img src={info.images[0].url} alt="" />
      </div>

      <ul className=" text-center space-y-1">
        <li className=" text-lg">{info.name}</li>
        <li className=" font-medium text-lg">${info.price.value}</li>
      </ul>

      <PrimaryButton>Add To Cart</PrimaryButton>
    </div>
  );
};
