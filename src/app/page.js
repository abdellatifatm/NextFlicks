"use client";

import { Footer } from "./components/Footer";
import MoviesApi from "./components/MoviesApi";
// import { motion } from "framer-motion";

export default function Home() {
  return (
    // <motion.div
    //   initial={{ opacity: 0 }} 
    //   animate={{ opacity: 1 }} 
    //   exit={{ opacity: 0 }} 
    //   transition={{ duration: 1.3 }}
    // >
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <MoviesApi />
      </div>
      {/* <Footer /> */}
    </div>
    // </motion.div>
  );
}
