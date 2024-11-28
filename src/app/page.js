"use client";

import { Footer } from "./components/Footer";
import MoviesApi from "./components/MoviesApi";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <MoviesApi />
      </div>
      <Footer />
    </div>
  );
}
