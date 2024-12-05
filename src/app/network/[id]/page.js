"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// Network definitions (same as in your Networks component)
const networks = [
  {
    name: "Netflix",
    id: 8,
  },
  {
    name: "Apple TV+",
    id: 350,
  },
  {
    name: "Disney+",
    id: 337,
  },
  {
    name: "Max",
    id: 1899,
  },
  {
    name: "Prime Video",
    id: 9,
  },
  {
    name: "Hulu",
    id: 15,
  },
  {
    name: "Paramount+",
    id: 531,
  },
  {
    name: "Crunchyroll",
    id: 283,
  },
];

export default function TopRatedMovies({ params }) {
  const API_KEY = "84ef9a6a385dcf0d998c9d83dd821e47"
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resolvedParams = React.use(params);
  const networkId = resolvedParams?.id ? parseInt(resolvedParams.id) : null;
  
  // Find network name based on ID
  const networkName = networks.find(network => network.id === networkId)?.name || 'Network';

  useEffect(() => {
    if (!networkId) return;

    const fetchNetworks = async () => {
      try {
        // Fetch Movies
        const moviesData = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${active}&sort_by=popularity.desc&watch_region=US&with_watch_providers=${networkId}`
        );
        setMovies(moviesData.data.results);
        setTotalPages(moviesData.data.total_pages);

        // Fetch TV Shows
        const tvShowsData = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${active}&sort_by=popularity.desc&watch_region=US&with_watch_providers=${networkId}`
        );
        setTvShows(tvShowsData.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNetworks();
  }, [networkId, active]);

  const next = () => {
    setActive((prev) => Math.min(prev + 1, totalPages));
  };

  const prev = () => {
    setActive((prev) => Math.max(prev - 1, 1));
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 3;

    // Handle edge cases for total pages <= maxButtons
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <IconButton
            key={i}
            variant={active === i ? "filled" : "text"}
            color={active === i ? "gray" : "gray"}
            size="sm"
            className="hidden md:inline-flex dark:text-white "
            onClick={() => setActive(i)}
          >
            {i}
          </IconButton>
        );
      }
      return buttons;
    }

    // Responsive pagination logic
    const generatePageButton = (page) => (
      <IconButton
        key={page}
        variant={active === page ? "filled" : "text"}
        color={active === page ? "gray" : "gray"}
        size="sm"
        className="hidden md:inline-flex dark:text-white"
        onClick={() => setActive(page)}
      >
        {page}
      </IconButton>
    );

    // First page button
    buttons.push(generatePageButton(1));

    // Dynamic middle buttons
    if (active > 2) {
      buttons.push(<span key="start-ellipsis" className="hidden md:inline dark:text-white">...</span>);
    }

    // Surrounding page buttons
    const startPage = Math.max(2, active - 1);
    const endPage = Math.min(totalPages - 1, active + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(generatePageButton(i));
    }

    // Last page ellipsis and button
    if (active < totalPages - 1) {
      buttons.push(<span key="end-ellipsis" className="hidden md:inline dark:text-white">...</span>);
    }
    buttons.push(generatePageButton(totalPages));

    return buttons;
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="rounded-xl mx-4 sm:mx-8 lg:mx-16 px-3 pt-20 text-blue-gray-900 dark:text-gray-200">
          <div className="text-2xl font-semibold md:text-3xl ml-2 mb-6 text-left flex items-center">
            <h1>{networkName} Popular Movies</h1>
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <Link href={`/movie/${movie.id}`}>
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title || 'Movie Poster'}
                    className="rounded-xl w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90"
                  />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-2xl font-semibold md:text-3xl ml-2 mt-10 mb-6 text-left flex items-center">
            <h1>{networkName} Popular TV Shows</h1>
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {tvShows.map((tv) => (
              <div key={tv.id} className="movie-item">
                <Link href={`/tv/${tv.id}`}>
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                    alt={tv.name || 'TV Show Poster'}
                    className="rounded-xl w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90"
                  />
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
            {/* Mobile page indicator */}
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
      <Footer />
    </>
  );
}