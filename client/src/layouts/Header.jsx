import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiUser as UserIcon } from "react-icons/fi";
import { RiShoppingBagLine as ShoppingBagIcon } from "react-icons/ri";
import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <>
      <header className=" fixed top-0 w-full py-7 bg-white">
        <div className=" flex items-center justify-between w-[90%] mx-auto max-w-[1500px]">
          <div>
            <img
              src={logo}
              alt="Header logo"
              width={160}
              className=" sm:w-[180px]"
            />
          </div>

          <div className=" flex gap-1">
            <Link to={"/auth/login"}>
              <UserIcon size={28} />
            </Link>

            <div>
              <ShoppingBagIcon size={28} />
            </div>
          </div>
        </div>
      </header>

      <Outlet></Outlet>
    </>
  );
};
