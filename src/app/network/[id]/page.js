"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ScrollReveal from "../../components/ScrollReveal";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const API_BASE_URL = "https://api.themoviedb.org/3";

const networks = [
  { name: "Netflix", banner: "/netflix-banner.jpg", id: 8 },
  { name: "Apple TV+", banner: "/appleTv+-banner.jpg", id: 350 },
  { name: "Disney+", banner: "/disney+-banner.jpg", id: 337 },
  { name: "Max", banner: "/max-banner.jpg", id: 1899 },
  { name: "Prime Video", banner: "/prime-video-banner.webp", id: 9 },
  { name: "Hulu", banner: "/hulu-banner.webp", id: 15 },
  { name: "Paramount+", banner: "/paramount+-banner.jpg", id: 531 },
  { name: "Crunchyroll", banner: "/crunchyroll-banner.jpg", id: 283 },
];

const MediaGrid = ({ items, type }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
    {items.map((item) => (
      <div key={item.id} className="movie-item relative group">
        <Link
          href={`/${type}/${item.id}-${item[type === "movie" ? "title" : "name"]
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          <div className="relative rounded-lg overflow-hidden">
            <img
              loading="lazy"
              src={`${IMAGE_BASE_URL}/w500/${item.poster_path}`}
              alt={
                item[type === "movie" ? "title" : "name"] || `${type} Poster`
              }
              className="w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90 group-hover:scale-110"
            />
          </div>
        </Link>
      </div>
    ))}
  </div>
);

const Pagination = ({ active, totalPages, onNext, onPrev, onPageClick }) => (
  <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 mb-4 px-4">
    <Button
      variant="text"
      size="sm"
      className="flex items-center gap-1 sm:gap-2 dark:text-white"
      onClick={onPrev}
      disabled={active === 1}
    >
      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      <span className="hidden sm:inline">Previous</span>
    </Button>
    <div className="flex items-center gap-1 sm:gap-2">
      {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
        <IconButton
          key={i + 1}
          variant={active === i + 1 ? "filled" : "text"}
          color="gray"
          size="sm"
          className="hidden md:inline-flex dark:text-white"
          onClick={() => onPageClick(i + 1)}
        >
          {i + 1}
        </IconButton>
      ))}
      <span className="md:hidden text-sm">
        Page {active} of {totalPages}
      </span>
    </div>
    <Button
      variant="text"
      size="sm"
      className="flex items-center gap-1 sm:gap-2 dark:text-white"
      onClick={onNext}
      disabled={active === totalPages}
    >
      <span className="hidden sm:inline">Next</span>
      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
    </Button>
  </div>
);

export default function TopRatedMovies({ params }) {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resolvedParams = React.use(params);
  const networkId = resolvedParams?.id ? parseInt(resolvedParams.id) : null;
  const networkName =
    networks.find((n) => n.id === networkId)?.name || "Network";

  const fetchNetworkContent = useCallback(async () => {
    if (!networkId) return;

    try {
      const [moviesData, tvShowsData] = await Promise.all([
        axios.get(`${API_BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            include_adult: false,
            include_video: false,
            language: "en-US",
            page: active,
            sort_by: "popularity.desc",
            watch_region: "US",
            with_watch_providers: networkId,
          },
        }),
        axios.get(`${API_BASE_URL}/discover/tv`, {
          params: {
            api_key: API_KEY,
            include_adult: false,
            include_null_first_air_dates: false,
            language: "en-US",
            page: active,
            sort_by: "popularity.desc",
            watch_region: "US",
            with_watch_providers: networkId,
          },
        }),
      ]);

      setMovies(moviesData.data.results);
      setTvShows(tvShowsData.data.results);
      setTotalPages(moviesData.data.total_pages);
    } catch (error) {
      console.error("Error fetching network content:", error);
    }
  }, [networkId, active]);

  useEffect(() => {
    fetchNetworkContent();
  }, [fetchNetworkContent]);

  return (
    <>
      <div className="lg:pt-5 md:pt-5">
        <div className="flex-container flex-wrap">
          <div className="relative h-[300px] md:h-[450px] lg:h-[906px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden">
            <div className="absolute object-cover inset-0 rounded-xl">
              <ScrollReveal>
                <img
                  loading="lazy"
                  width="500"
                  className="w-full object-cover h-[300px] md:h-[450px] lg:h-[906px] rounded-xl"
                  src={networks.find((n) => n.id === networkId)?.banner}
                  alt="Network banner"
                />
              </ScrollReveal>
            </div>
          </div>

          <div className="rounded-lg mx-4 sm:mx-8 lg:mx-16 mt-5 md:mt-10 lg:mt-10 text-blue-gray-900 dark:text-gray-200">
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
                <MediaGrid items={movies} type="movie" />
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
                <MediaGrid items={tvShows} type="tv" />
              </ScrollReveal>
            )}
          </div>

          {tvShows.length > 0 && (
            <ScrollReveal>
              <Pagination
                active={active}
                totalPages={totalPages}
                onNext={() => setActive((p) => Math.min(p + 1, totalPages))}
                onPrev={() => setActive((p) => Math.max(p - 1, 1))}
                onPageClick={setActive}
              />
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
