import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Play, Info, Star, AlarmClockCheck, CalendarDays } from "lucide-react";
import { Button } from "@material-tailwind/react";
import MustWatch from "./MustWatch";

function MoviesApi() {
  const [movieData, setMovieData] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [movieLogos, setMovieLogos] = useState({});
  const [isMobile, setIsMobile] = useState(false); // Default value changed
  const apiKey = "84ef9a6a385dcf0d998c9d83dd821e47";
  const [showTitle, setShowTitle] = useState(false);

  // Initialize isMobile on client side only
  useEffect(() => {
    setIsMobile(window.innerWidth <= 960);
  }, []);

  useEffect(() => {
    getTrendingMovieData();
    setTimeout(() => {
      setShowTitle(true);
    }, 1500);
  }, []);

  async function getTrendingMovieData() {
    try {
      const allResults = [];
      let currentPage = 1;
      const totalPages = 1;

      while (currentPage <= totalPages) {
        const resp = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${currentPage}`
        );
        allResults.push(...resp.data.results);
        currentPage++;
      }

      const resultsWithDetails = await Promise.all(
        allResults.map(async (item) => {
          const { contentRating, voteAverage, formattedRuntime } =
            await fetchMovieDetails(item);
          return { ...item, contentRating, voteAverage, formattedRuntime };
        })
      );

      setMovieData(resultsWithDetails);
      const randomIndex = Math.floor(Math.random() * resultsWithDetails.length);
      setRandomMovie(resultsWithDetails[randomIndex]);

      console.log("Random Movie:", resultsWithDetails[randomIndex]); // Log to verify formattedRuntime
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  async function fetchMovieDetails(item) {
    const ratingEndpoint =
      item.media_type === "movie"
        ? `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&append_to_response=release_dates`
        : `https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}&append_to_response=content_ratings`;

    try {
      const response = await axios.get(ratingEndpoint);

      let contentRating = "NR";
      const voteAverage = response.data.vote_average;

      // Movie runtime
      let formattedRuntime = "";
      if (item.media_type === "movie" && response.data.runtime) {
        const hours = Math.floor(response.data.runtime / 60);
        const minutes = response.data.runtime % 60;
        formattedRuntime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }

      // For TV shows, do not calculate or return runtime
      if (item.media_type === "tv") {
        formattedRuntime = ""; // Clear runtime for TV shows
      }

      // Get age rating
      if (item.media_type === "movie") {
        const usRelease = response.data.release_dates?.results?.find(
          (release) => release.iso_3166_1 === "US"
        );
        if (usRelease && usRelease.release_dates.length > 1) {
          contentRating =
            usRelease.release_dates[1].certification || contentRating;
        }
      } else if (item.media_type === "tv") {
        const usRating = response.data.content_ratings?.results?.find(
          (rating) => rating.iso_3166_1 === "US"
        );
        if (usRating) {
          contentRating = usRating.rating || contentRating;
        }
      }

      return { contentRating, voteAverage, formattedRuntime };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return { contentRating: "NR", voteAverage: 0, formattedRuntime: "" };
    }
  }

  // Effect to fetch logo for the randomly selected movie and tv show
  useEffect(() => {
    const fetchLogo = async () => {
      if (randomMovie) {
        const endpoint =
          randomMovie.media_type === "movie"
            ? `https://api.themoviedb.org/3/movie/${randomMovie.id}/images?api_key=${apiKey}`
            : `https://api.themoviedb.org/3/tv/${randomMovie.id}/images?api_key=${apiKey}`;

        try {
          const response = await axios.get(endpoint);
          const logos = response.data.logos;
          const englishLogo = logos.find((logo) => logo.iso_639_1 === "en");

          if (englishLogo) {
            setMovieLogos({
              [randomMovie.id]: `https://image.tmdb.org/t/p/w500/${englishLogo.file_path}`,
            });
          }
        } catch (error) {
          console.error("Error fetching movie logo:", error);
        }
      }
    };

    fetchLogo();
  }, [randomMovie, apiKey]);

  // Handle window resizing to detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);

    // Only add the event listener client-side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Function to truncate text by words
  function truncateTextByWords(text, lines, wordsPerLine) {
    const totalWords = lines * wordsPerLine;
    const words = text.split(" ");
    if (words.length > totalWords) {
      return words.slice(0, totalWords).join(" ") + " ...";
    }
    return text;
  }

  if (!randomMovie) return null;

  return (
    <div className="background_container lg:pt-5 md:pt-5">
      <div className="flex-container flex-wrap">
        <div
          className="relative h-[300px] md:h-[450px] lg:h-[600px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden"
          key={randomMovie.id}
        >
          <div className="absolute object-cover inset-0 bg-gray-900 rounded-xl">
            <img
              width="500"
              className="w-full h-full object-cover rounded-xl bg-black opacity-40"
              src={`https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path}`}
              alt={randomMovie.title || randomMovie.name}
            />
          </div>

          <div className="relative z-20 h-full flex flex-col justify-end pb-8 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto">
            {movieLogos[randomMovie.id] ? (
              <div className="logo-container object-contain">
                <img
                  src={movieLogos[randomMovie.id]}
                  alt={`${randomMovie.title || randomMovie.name} logo`}
                  className="h-12 lg:max-w-md  lg:h-24 w-auto max-w-[150px] md:max-h-24 object-contain mb-2 md:mb-4"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              showTitle && (
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 tracking-wide">
                  {randomMovie.title || randomMovie.name}
                </h1>
              )
            )}

            <div className="flex items-center gap-2 md:gap-2 mb-2 md:mb-4">
              <span className="px-2 py-1 bg-gray-100/20 text-white text-xs md:text-sm rounded">
                {randomMovie.contentRating || "NR"}
              </span>

              <span className="text-gray-300 ml-1 text-xs md:text-sm flex items-center gap-2">
                <Star size={16} color="#f9fafb" />
                {randomMovie.voteAverage > 0
                  ? ` ${randomMovie.voteAverage.toFixed(1)}`
                  : "Not Rated"}
              </span>
              <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                {randomMovie.media_type === "movie" &&
                randomMovie.formattedRuntime ? (
                  <>
                    <AlarmClockCheck size={16} color="#f9fafb" />
                    <span>{` ${randomMovie.formattedRuntime}`}</span>
                  </>
                ) : (
                  null
                )}
              </span>

              <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                {<> 
                  <CalendarDays size={16} color='#f9fafb' />
                <span>
                {`${
                  randomMovie.release_date?.slice(0, 4) ||
                  randomMovie.first_air_date?.slice(0, 4)
                }`}
                </span>
               </>}
              </span>
            </div>

            <p className="text-gray-300 text-[9px] md:text-sm lg:text-base max-w-xl mb-4 md:mb-6">
              {isMobile
                ? truncateTextByWords(randomMovie.overview, 3, 10)
                : randomMovie.overview}
            </p>

            <div className="text-gray-300 text-xs md:text-sm mb-4 md:mb-8">
              Action • Adventure • Sci-fi
            </div>

            <div className="flex gap-2 md:gap-4">
              <Button
                variant="gradient"
                size="sm"
                className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3"
              >
                <Play size={20} />
                <span>Play</span>
              </Button>

              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-gray-600/50 text-white hover:bg-gray-600/70"
              >
                <Info size={20} />
                <span>Info</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MustWatch movies={movieData} />
    </div>
  );
}

export default MoviesApi;
