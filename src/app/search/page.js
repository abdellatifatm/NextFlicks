"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
// import { Footer } from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { motion } from "framer-motion";

export default function Page() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const type = "multi"; // Default to searching all types

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}&watch_region=US`
        );

        setMovies((prevMovies) => {
          const newMovies = response.data.results.filter(
            (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setHasMore(response.data.results.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [query, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore) setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="flex flex-col">
      <ScrollReveal>
        <div className="flex-grow">
          <div className="flex rounded-md border-2 dark:border-gray-800 border-gray-900 overflow-hidden max-w-md mx-auto font-[sans-serif] mt-24">
            <input
              type="text"
              placeholder="Search Movies, TV Shows, People..."
              className="w-full outline-none dark:bg-[#171717] bg-white dark:text-gray-200 text-gray-900 text-base px-4 py-3 placeholder-gray-900 dark:placeholder-gray-200"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setMovies([]);
                setPage(1);
              }}
            />
          </div>

          {movies.length > 0 && (
            <div className="flex-grow">
              <div className="rounded-lg mx-4 sm:mx-8 lg:mx-16 pt-20 text-blue-gray-900 dark:text-gray-200">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
                  {movies.map((movie) => (
                    <motion.div
                      key={movie.id}
                      className="movie-item relative group"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Link
                       href={`/${movie.media_type}/${movie.id}-${(movie.title || movie.name)
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      >
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            loading="lazy"
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : movie.profile_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.profile_path}`
                                : "/avatar.png"
                            }
                            alt={movie.title || movie.name || "Movie Poster"}
                            className="w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90 group-hover:scale-110"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
      {/* <Footer /> */}
    </div>
  );
}
