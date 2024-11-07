"use client";

import Header from "./components/Header";

import MoviesApi from "./components/MoviesApi";
// import MustWatch from "./components/MustWatch";

export default function Home() {
  return (
    <div>
      <div className="pt-4 px-4 sticky top-4 z-50">
        <Header />
      </div>

      <MoviesApi />
      {/* <MustWatch /> */}
    </div>
  );
}
