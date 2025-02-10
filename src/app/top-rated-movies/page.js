"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ScrollReveal from "../components/ScrollReveal";

export default function MoviesPages() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // ✅ Use env variable
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${active}&watch_region=US`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [active]);

  // ✅ Handle Previous & Next Page Clicks
  const prev = () => setActive((prev) => Math.max(1, prev - 1));
  const next = () => setActive((prev) => Math.min(totalPages, prev + 1));

  // ✅ Render Pagination Buttons
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 3;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <IconButton
            key={i}
            variant={active === i ? "filled" : "text"}
            color="gray"
            size="sm"
            className="hidden md:inline-flex dark:text-white"
            onClick={() => setActive(i)}
          >
            {i}
          </IconButton>
        );
      }
      return buttons;
    }

    const generatePageButton = (page) => (
      <IconButton
        key={page}
        variant={active === page ? "filled" : "text"}
        color="gray"
        size="sm"
        className="hidden md:inline-flex dark:text-white"
        onClick={() => setActive(page)}
      >
        {page}
      </IconButton>
    );

    buttons.push(generatePageButton(1));

    if (active > 2) {
      buttons.push(
        <span key="start-ellipsis" className="hidden md:inline dark:text-white">
          ...
        </span>
      );
    }

    const startPage = Math.max(2, active - 1);
    const endPage = Math.min(totalPages - 1, active + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(generatePageButton(i));
    }

    if (active < totalPages - 1) {
      buttons.push(
        <span key="end-ellipsis" className="hidden md:inline dark:text-white">
          ...
        </span>
      );
    }
    buttons.push(generatePageButton(totalPages));

    return buttons;
  };

  return (
    <>
    {movies.length > 0 && (
      <ScrollReveal>
        <div className="flex flex-col min-h-screen">
          <div className="rounded-lg mx-4 sm:mx-8 lg:mx-16 pt-20 text-blue-gray-900 dark:text-gray-200">
            <div className="text-2xl font-semibold md:text-3xl ml-2 mb-2 text-left flex items-center">
              <h1>Top Rated Movies</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right md:w-[28px] md:h-[28px] w-6 h-6"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-item relative group">
                  <Link href={`/movie/${movie.id}`}>
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        loading="lazy"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "/fallback-image.jpg"
                        } // ✅ Handle missing posters
                        alt={movie.title || "Movie Poster"}
                        className="w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 mb-4 px-4">
            <Button
              variant="text"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 dark:text-white"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <div className="flex items-center gap-1 sm:gap-2">
              {renderPageButtons()}
              <span className="md:hidden text-sm">
                Page {active} of {totalPages}
              </span>
            </div>
            <Button
              variant="text"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 dark:text-white"
              onClick={next}
              disabled={active === totalPages}
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ScrollReveal>
      )}
       {movies.length > 0 && (
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
      )}
    </>
  );
}
