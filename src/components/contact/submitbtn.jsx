import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SubmitButton = ({ isSubmitting, isSubmitted }) => {
  return (
    <motion.button
      type="submit"
      className='submitbtn'
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div 
            key="spinner"
            className='spinner'
            animate={{ rotate: 360, opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.span
            key="text"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {isSubmitted ? "Verzonden!" : "Verzenden"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
