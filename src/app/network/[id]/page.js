"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ScrollReveal from "../../components/ScrollReveal";

// Network definitions (same as in your Networks component)
const networks = [
  {
    name: "Netflix",
    banner:
      "https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg",
    id: 8,
  },
  {
    name: "Apple TV+",
    banner:
      "https://cdn1.filmozercy.com/uploads/images/original/apple-tv-seriale-2023.jpg",
    id: 350,
  },
  {
    name: "Disney+",
    banner:
      "https://suomimobiili.fi/wp-content/uploads/2023/11/disney-plus.jpg",
    id: 337,
  },
  {
    name: "Max",
    banner:
      "https://scontent.frba3-2.fna.fbcdn.net/v/t39.30808-6/384998944_706731491499334_9129873369067753023_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ONm5kj2dDkwQ7kNvgHZyM8u&_nc_oc=AdhkVd9EXG-NhGcy_K9DFQMMT2di2GAqo--8Q21lT4BHHfDh88lL5_nY2stqftBx-9E&_nc_zt=23&_nc_ht=scontent.frba3-2.fna&_nc_gid=AL2i8GJohkSJ9Ny9b_iaNH9&oh=00_AYATuvMFz7w7nGTMrfmHng-lDEVgu5NEa5aJsBLmIu91Qg&oe=67ADE7BD",
    id: 1899,
  },
  {
    name: "Prime Video",
    banner:
      "https://vodafoneziggo.scene7.com/is/image/vodafoneziggo/article_1920x1080_primevideo?fmt=webp-alpha&qlt=100,0&bfc=off&wid=1128&fit=constrain",
    id: 9,
  },
  {
    name: "Hulu",
    banner:
      "https://www.etonline.com/sites/default/files/images/2023-09/hulu_0.jpeg",
    id: 15,
  },
  {
    name: "Paramount+",
    banner:
      "https://www.4kfilme.de/wp-content/uploads/2025/01/paramount-plus-vorbereitungen-werbung-neue-abo-tarife.jpg",
    id: 531,
  },
  {
    name: "Crunchyroll",
    banner:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAl-HcMWLNSynuHjcuP8LcDMkC_uEb80-WE4mHpMDEaxAK0tuKTaS5a5skREFF16gNGSShxgHE9uq49mK9T6WohA7AmHIsFF5liyasc0a5PTcWslBA_dLjw0V0tE2USLVfgaFlrB9xPKcoo3CBpIoWqkqKJ13VdTBQMb6uiLtDw2EC90RTGlHcCBiuYbc/s1920/IMG_20240119_091240.jpg",
    id: 283,
  },
];

export default function TopRatedMovies({ params }) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resolvedParams = React.use(params);
  const networkId = resolvedParams?.id ? parseInt(resolvedParams.id) : null;

  // Find network name based on ID
  const networkName =
    networks.find((network) => network.id === networkId)?.name || "Network";

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
      buttons.push(
        <span key="start-ellipsis" className="hidden md:inline dark:text-white">
          ...
        </span>
      );
    }

    // Surrounding page buttons
    const startPage = Math.max(2, active - 1);
    const endPage = Math.min(totalPages - 1, active + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(generatePageButton(i));
    }

    // Last page ellipsis and button
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
      <div className="lg:pt-5 md:pt-5">
        <div className="flex-container flex-wrap">
          <div className="relative h-[300px] md:h-[450px] lg:h-[906px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden  ">
            <div className="absolute object-cover inset-0 rounded-xl ">
              <ScrollReveal>
                <img
                  loading="lazy"
                  width="500"
                  className="w-full  object-cover h-[300px] md:h-[450px] lg:h-[906px]  rounded-xl "
                  src={
                    networks.find((network) => network.id === networkId)?.banner
                  }
                  alt="Network banner"
                />
              </ScrollReveal>
            </div>
          </div>

          <div className="rounded-lg mx-4 sm:mx-8 lg:mx-16 mt-10  text-blue-gray-900 dark:text-gray-200">
            {movies.length > 0 && (
              <ScrollReveal>
                <div className="text-2xl font-semibold md:text-3xl ml-2 mb-2 text-left flex items-center">
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
                  {movies.map((movie) => (
                    <div key={movie.id} className="movie-item relative group">
                      <Link
                        href={`/movie/${movie.id}-${movie.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            loading="lazy"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title || "Movie Poster"}
                            className="w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90 group-hover:scale-110"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {tvShows.length > 0 && (
              <ScrollReveal>
                <div className="text-2xl font-semibold md:text-3xl ml-2 mt-10 mb-2 text-left flex items-center">
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
                  {tvShows.map((tv) => (
                    <div key={tv.id} className="movie-item relative group">
                      <Link
                        href={`/tv/${tv.id}-${tv.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            loading="lazy"
                            src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                            alt={tv.name || "TV Show Poster"}
                            className="w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90 group-hover:scale-110"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {tvShows.length > 0 && (
            <ScrollReveal>
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
            </ScrollReveal>
          )}
        </div>
      </div>
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </>
  );
}
