import { useEffect, useState } from "react";
import axios from "axios";
import { Play, Info, Star, AlarmClockCheck, CalendarDays } from "lucide-react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import MustWatch from "./MustWatch";

const API_KEY = "84ef9a6a385dcf0d998c9d83dd821e47";
const MOBILE_BREAKPOINT = 960;
const TITLE_DELAY = 1500;

const MoviesApi = () => {
  const [movieData, setMovieData] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [movieLogos, setMovieLogos] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [allGenres, setAllGenres] = useState({});

  const fetchMovieDetails = async (item) => {
    const mediaType = item.media_type;
    const isMovie = mediaType === "movie";
    const endpoint = `https://api.themoviedb.org/3/${isMovie ? "movie" : "tv"}/${
      item.id
    }?api_key=${API_KEY}&append_to_response=${
      isMovie ? "release_dates" : "content_ratings"
    }`;

    try {
      const response = await axios.get(endpoint);
      const voteAverage = response.data.vote_average;

      let contentRating = "NR";
      let formattedRuntime = "";

      if (isMovie) {
        if (response.data.runtime) {
          const hours = Math.floor(response.data.runtime / 60);
          const minutes = response.data.runtime % 60;
          formattedRuntime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        }

        const usRelease = response.data.release_dates?.results?.find(
          (release) => release.iso_3166_1 === "US"
        );
        contentRating =
          usRelease?.release_dates[1]?.certification || contentRating;
      } else {
        const usRating = response.data.content_ratings?.results?.find(
          (rating) => rating.iso_3166_1 === "US"
        );
        contentRating = usRating?.rating || contentRating;
      }

      return { contentRating, voteAverage, formattedRuntime };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return { contentRating: "NR", voteAverage: 0, formattedRuntime: "" };
    }
  };

  const fetchGenres = async () => {
    try {
      const [movieGenres, tvGenres] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
        ),
      ]);

      const combinedGenres = [
        ...movieGenres.data.genres,
        ...tvGenres.data.genres,
      ];

      const genresObject = combinedGenres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});

      setAllGenres(genresObject);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovieLogo = async () => {
    if (!randomMovie) return;

    const mediaType = randomMovie.media_type;
    const endpoint = `https://api.themoviedb.org/3/${
      mediaType === "movie" ? "movie" : "tv"
    }/${randomMovie.id}/images?api_key=${API_KEY}`;

    try {
      const response = await axios.get(endpoint);
      const englishLogo = response.data.logos.find(
        (logo) => logo.iso_639_1 === "en"
      );

      if (englishLogo) {
        setMovieLogos((prev) => ({
          ...prev,
          [randomMovie.id]: `https://image.tmdb.org/t/p/w500/${englishLogo.file_path}`,
        }));
      }
    } catch (error) {
      console.error("Error fetching movie logo:", error);
    }
  };

  const getTrendingMovieData = async () => {
    try {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=1`
      );

      const resultsWithDetails = await Promise.all(
        resp.data.results.map(async (item) => {
          const details = await fetchMovieDetails(item);
          return { ...item, ...details };
        })
      );

      setMovieData(resultsWithDetails);
      const randomIndex = Math.floor(Math.random() * resultsWithDetails.length);
      setRandomMovie(resultsWithDetails[randomIndex]);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => allGenres[id]).filter(Boolean).join(" • ");
  };

  const truncateTextByWords = (text, lines, wordsPerLine) => {
    const totalWords = lines * wordsPerLine;
    const words = text.split(" ");
    return words.length > totalWords
      ? `${words.slice(0, totalWords).join(" ")} ...`
      : text;
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getTrendingMovieData();
    fetchGenres();
    const titleTimer = setTimeout(() => setShowTitle(true), TITLE_DELAY);
    return () => clearTimeout(titleTimer);
  }, []);

  useEffect(() => {
    fetchMovieLogo();
  }, [randomMovie]);

  if (!randomMovie) return null;

  return (
    <div className="background_container lg:pt-5 md:pt-5">
      <div className="flex-container flex-wrap">
        <div className="relative h-[300px] md:h-[450px] lg:h-[600px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden">
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
                  className="h-12 lg:max-w-md lg:h-24 w-auto max-w-[150px] md:max-h-24 object-contain mb-2 md:mb-4"
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

            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
              <span className="px-2 py-1 bg-gray-100/20 text-white text-xs md:text-sm rounded">
                {randomMovie.contentRating}
              </span>

              <span className="text-gray-300 ml-1 text-xs md:text-sm flex items-center gap-2">
                <Star size={16} color="#f9fafb" />
                {randomMovie.voteAverage > 0
                  ? ` ${randomMovie.voteAverage.toFixed(1)}`
                  : "Not Rated"}
              </span>

              {randomMovie.media_type === "movie" && randomMovie.formattedRuntime && (
                <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                  <AlarmClockCheck size={16} color="#f9fafb" />
                  <span>{randomMovie.formattedRuntime}</span>
                </span>
              )}

              <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                <CalendarDays size={16} color="#f9fafb" />
                <span>
                  {randomMovie.release_date?.slice(0, 4) ||
                    randomMovie.first_air_date?.slice(0, 4)}
                </span>
              </span>
            </div>

            <p className="text-gray-300 text-[9px] md:text-sm lg:text-base max-w-xl mb-4 md:mb-6">
              {isMobile
                ? truncateTextByWords(randomMovie.overview, 3, 10)
                : randomMovie.overview}
            </p>

            <div className="text-gray-300 text-xs md:text-sm mb-4 md:mb-8">
              {getGenreNames(randomMovie.genre_ids)}
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
              <Link href="/info">
                <Button
                  variant="text"
                  size="sm"
                  className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-gray-600/50 text-white hover:bg-gray-600/70"
                >
                  <Info size={20} />
                  <span>Info</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MustWatch movies={movieData} />
    </div>
  );
};

export default MoviesApi;