import React from "react";
import { AnimatePresence, motion } from "motion/react";
import ClipLoader from "react-spinners/ClipLoader";

export const LoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
          className=" fixed top-0 left-0 bottom-0 right-0 bg-white flex items-center justify-center"
        >
          <ClipLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
