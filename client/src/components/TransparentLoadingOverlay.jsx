import React from "react";
import { AnimatePresence, motion } from "motion/react";
import ClipLoader from "react-spinners/ClipLoader";

export const TransparentLoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className=" fixed top-0 left-0 bottom-0 right-0 bg-white bg-opacity-75 flex items-center justify-center z-20"
        >
          <ClipLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
