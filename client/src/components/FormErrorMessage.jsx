import React from "react";
import { motion } from "motion/react";

export const FormErrorMessage = ({ message, isOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-10px" }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-10px" }}
      className=" bg-red-500 w-[90%] max-w-[420px] text-center text-white font-semibold py-3 rounded-md"
      role="form-error-message"
    >
      {message}
    </motion.div>
  );
};
