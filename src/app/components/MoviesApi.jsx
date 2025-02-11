import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Play, Info, Star, AlarmClockCheck, CalendarDays } from "lucide-react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import MustWatch from "./MustWatch";
import TopRatedTv from "./TopRatedTv";
import TopRatedMovies from "./TopRatedMovies";
import Networks from "./Networks";
import ScrollReveal from "../components/ScrollReveal";
import { Footer } from "./Footer";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const MOBILE_BREAKPOINT = 960;
const TITLE_DELAY = 1500;
const BASE_API_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const MoviesApi = () => {
  const [movieData, setMovieData] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [movieLogos, setMovieLogos] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [allGenres, setAllGenres] = useState({});

  const fetchMovieDetails = useCallback(async (item) => {
    const mediaType = item.media_type;
    const isMovie = mediaType === "movie";
    const endpoint = `${BASE_API_URL}/${isMovie ? "movie" : "tv"}/${item.id}?api_key=${API_KEY}&append_to_response=${isMovie ? "release_dates" : "content_ratings"}`;

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
        contentRating = usRelease?.release_dates.find(date => date.certification)?.certification || "NR";
      } else {
        const usRating = response.data.content_ratings?.results?.find(
          (rating) => rating.iso_3166_1 === "US"
        );
        contentRating = usRating?.rating || response.data.content_ratings.results[0]?.rating || "NR";
      }

      return { contentRating, voteAverage, formattedRuntime };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return { contentRating: "NR", voteAverage: 0, formattedRuntime: "" };
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const [movieGenres, tvGenres] = await Promise.all([
        axios.get(`${BASE_API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_API_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`)
      ]);

      const genresObject = [...movieGenres.data.genres, ...tvGenres.data.genres]
        .reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});

      setAllGenres(genresObject);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);

  const fetchMovieLogo = useCallback(async () => {
    if (!randomMovie) return;

    const mediaType = randomMovie.media_type;
    const endpoint = `${BASE_API_URL}/${mediaType === "movie" ? "movie" : "tv"}/${randomMovie.id}/images?api_key=${API_KEY}`;

    try {
      const response = await axios.get(endpoint);
      const englishLogo = response.data.logos.find(logo => logo.iso_639_1 === "en");

      if (englishLogo) {
        setMovieLogos(prev => ({
          ...prev,
          [randomMovie.id]: `${IMAGE_BASE_URL}/w500/${englishLogo.file_path}`
        }));
      }
    } catch (error) {
      console.error("Error fetching movie logo:", error);
    }
  }, [randomMovie]);

  const getTrendingMovieData = useCallback(async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/trending/all/day?api_key=${API_KEY}&page=1`);
      const resultsWithDetails = await Promise.all(
        resp.data.results.map(async (item) => ({
          ...item,
          ...(await fetchMovieDetails(item))
        }))
      );

      setMovieData(resultsWithDetails.slice(0, 18));
      setRandomMovie(resultsWithDetails[Math.floor(Math.random() * resultsWithDetails.length)]);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }, [fetchMovieDetails]);

  const getGenreNames = useCallback((genreIds) => {
    return genreIds
      .slice(0, 3)
      .map(id => allGenres[id])
      .filter(Boolean)
      .join(" • ");
  }, [allGenres]);

  const truncateOverview = useCallback((text) => {
    const wordsPerLine = isMobile ? 10 : 30;
    const totalWords = 3 * wordsPerLine;
    const words = text.split(" ");
    return words.length > totalWords
      ? `${words.slice(0, totalWords).join(" ")} ...`
      : text;
  }, [isMobile]);

  const getMediaLink = useCallback((item) => {
    const baseUrl = item.media_type === "movie" ? "/movie" : "/tv";
    return `${baseUrl}/${item.id}-${(item.title || item.name).toLowerCase().replace(/\s+/g, "-")}`;
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getTrendingMovieData();
    fetchGenres();
    const titleTimer = setTimeout(() => setShowTitle(true), TITLE_DELAY);
    return () => clearTimeout(titleTimer);
  }, [getTrendingMovieData, fetchGenres]);

  useEffect(() => {
    fetchMovieLogo();
  }, [fetchMovieLogo]);

  if (!randomMovie) return null;

  return (
    <>
      <div id="home" className="background_container lg:pt-5 md:pt-5 scroll-m-28">
        <ScrollReveal>
          <div className="flex-container flex-wrap">
            <div className="relative h-[300px] md:h-[450px] lg:h-[819px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden">
              <div className="absolute object-cover inset-0 bg-gray-900 rounded-xl">
                <img
                  loading="lazy"
                  width="500"
                  className="w-full h-full object-cover rounded-xl bg-black opacity-40"
                  src={`${IMAGE_BASE_URL}/w1280/${randomMovie.backdrop_path}`}
                  alt={randomMovie.title || randomMovie.name}
                />
              </div>

              <div className="relative z-20 h-full flex flex-col justify-end lg:py-64 pb-8 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto">
                <ScrollReveal>
                  {movieLogos[randomMovie.id] ? (
                    <div className="logo-container object-contain">
                      <img
                        loading="lazy"
                        src={movieLogos[randomMovie.id]}
                        alt={`${randomMovie.title || randomMovie.name} logo`}
                        className="h-12 lg:max-w-md lg:h-24 w-auto max-w-[150px] md:max-h-24 object-contain mb-2 md:mb-4"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                  ) : (
                    showTitle && (
                      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 tracking-wide">
                        {randomMovie.title || randomMovie.name}
                      </h1>
                    )
                  )}
                </ScrollReveal>
                <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                  <span className="px-2 py-1 bg-gray-100/20 text-white text-xs md:text-sm rounded">
                    {randomMovie.contentRating}
                  </span>
                  <span className="text-gray-300 ml-1 text-xs md:text-sm flex items-center gap-2">
                    <Star size={16} color="#f9fafb" />
                    {randomMovie.voteAverage > 0 ? ` ${randomMovie.voteAverage.toFixed(1)}` : "Not Rated"}
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
                      {randomMovie.release_date?.slice(0, 4) || randomMovie.first_air_date?.slice(0, 4)}
                    </span>
                  </span>
                </div>
                <p className="text-gray-300 text-[9px] md:text-sm lg:text-base max-w-xl mb-4 md:mb-6">
                  {truncateOverview(randomMovie.overview)}
                </p>
                <div className="text-gray-400 text-xs md:text-sm mb-4 md:mb-8">
                  {getGenreNames(randomMovie.genre_ids)}
                </div>
                <ScrollReveal>
                  <div className="flex gap-2 md:gap-4">
                    <Link href={getMediaLink(randomMovie)}>
                      <Button variant="gradient" size="sm" className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3">
                        <Play size={20} />
                        <span>Play</span>
                      </Button>
                    </Link>
                    <Link href={getMediaLink(randomMovie)}>
                      <Button variant="text" size="sm" className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-gray-600/50 text-white hover:bg-gray-600/70">
                        <Info size={20} />
                        <span>Info</span>
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <Networks />
      </ScrollReveal>
      <ScrollReveal>
        <MustWatch movies={movieData} />
      </ScrollReveal>
      <ScrollReveal>
        <TopRatedTv />
      </ScrollReveal>
      <ScrollReveal>
        <TopRatedMovies />
      </ScrollReveal>

      <Footer />
    </>
  );
};

export default MoviesApi;