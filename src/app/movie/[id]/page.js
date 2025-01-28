"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Play, Info, Star, AlarmClockCheck, CalendarDays } from "lucide-react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Cast from "../../components/Cast";
import { Footer } from "../../components/Footer";
import OverviewMovie from "../../components/OverviewMovie";

export default function MovieHero({ params }) {
  const MOBILE_BREAKPOINT = 960;
  const API_KEY = "84ef9a6a385dcf0d998c9d83dd821e47";
  const TITLE_DELAY = 1500;

  const resolvedParams = React.use(params);
  const id = resolvedParams?.id;

  const [movieDetails, setMovieDetails] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [trailer, setTrailer] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [movieLogos, setMovieLogos] = useState({});
  const [showTitle, setShowTitle] = useState(false);
  const [cast, setCast] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [directorName, setDirectorName] = useState([]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncateTextByWords = (text, lines, wordsPerLine) => {
    const totalWords = lines * wordsPerLine;
    const words = text.split(" ");
    return words.length > totalWords
      ? `${words.slice(0, totalWords).join(" ")} ...`
      : text;
  };

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const [detailsResponse, ratingsResponse] = await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
            ),
          ]);

          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
          );

          setCast(castResponse.data.cast);
          setOverviewData(detailsResponse.data);
          const director = castResponse.data.crew.find(
            (member) => member.job === "Director"
          );
          setDirectorName(director.name);

          const usRating = (() => {
            const usRatingEntry = ratingsResponse.data.results?.find(
              (rating) => rating.iso_3166_1 === "US"
            );

            if (usRatingEntry) {
              const releaseDates = usRatingEntry.release_dates || [];
              return (
                releaseDates[0]?.certification ||
                releaseDates[1]?.certification ||
                releaseDates[2]?.certification ||
                releaseDates[3]?.certification ||
                releaseDates[4]?.certification ||
                releaseDates[5]?.certification ||
                "NR"
              );
            }

            return "NR";
          })();

          const formattedRuntime = detailsResponse.data.runtime
            ? `${Math.floor(detailsResponse.data.runtime / 60)}h ${
                detailsResponse.data.runtime % 60
              }m`
            : null;

          setMovieDetails({
            ...detailsResponse.data,
            contentRating: usRating,
            voteAverage: detailsResponse.data.vote_average,
            formattedRuntime,
          });

          setTimeout(() => setShowTrailer(true), 5000);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };
      fetchMovieDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );

        let trailerVideo =
          response.data.results.find(
            (video) => video.type === "Trailer" && video.official
          ) ||
          response.data.results.find((video) => video.type === "Trailer") ||
          response.data.results[0];

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
      } catch (error) {
        console.error("Error fetching the trailer:", error);
      }
    };

    fetchTrailer();
  }, [id]);

  const fetchMovieLogo = async () => {
    if (!movieDetails) return;

    const endpoint = `https://api.themoviedb.org/3/movie/${movieDetails.id}/images?api_key=${API_KEY}`;

    try {
      const response = await axios.get(endpoint);
      const englishLogo = response.data.logos.find(
        (logo) => logo.iso_639_1 === "en"
      );

      if (englishLogo) {
        setMovieLogos((prev) => ({
          ...prev,
          [movieDetails.id]: `https://image.tmdb.org/t/p/w500/${englishLogo.file_path}`,
        }));
      }
    } catch (error) {
      console.error("Error fetching movie logo:", error);
    }
  };

  useEffect(() => {
    fetchMovieLogo();
    const titleTimer = setTimeout(() => setShowTitle(true), TITLE_DELAY);
    return () => clearTimeout(titleTimer);
  }, [movieDetails]);

  if (!movieDetails) return null;

  return (
    <div className="background_container lg:pt-5 md:pt-5 ">
      <div className="flex-container flex-wrap">
        <div className="relative h-[222px] sm:h-[250px] md:h-[450px] lg:h-[819px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 rounded-xl overflow-hidden">
            <div className="relative w-full h-full bg-black opacity-40">
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  showTrailer ? "opacity-0" : "opacity-100"
                }`}
              >
                <img
                  className="w-full h-full object-cover rounded-xl "
                  src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
                  alt={movieDetails.title}
                />
              </div>

              {trailer && showTrailer && (
                <div className="absolute inset-0 w-full h-full ">
                  <iframe
                    className="absolute w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&loop=1&playlist=${trailer}&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : ""
                    }&vq=hd720`}
                    title="Movie Trailer"
                    allow="autoplay; encrypted-media"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      transform: "translate(-50%, -50%) scale(1.5)",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="relative z-20 h-full flex flex-col justify-end lg:py-64 py-4 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
            {movieLogos[movieDetails.id] ? (
              <div className="logo-container object-contain">
                <img
                  src={movieLogos[movieDetails.id]}
                  alt={`${movieDetails.title || movieDetails.name} logo`}
                  className="h-12 lg:max-w-md lg:h-24 w-auto max-w-[150px] md:max-h-24 object-contain mb-2 md:mb-4"
                  // style={{ filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              showTitle && (
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 tracking-wide">
                  {movieDetails.title || movieDetails.name}
                </h1>
              )
            )}

            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
              <span className="px-2 py-1 bg-gray-100/20 text-white text-xs md:text-sm rounded">
                {movieDetails.contentRating}
              </span>

              <span className="text-gray-300 ml-1 text-xs md:text-sm flex items-center gap-2">
                <Star size={16} color="#f9fafb" />
                {movieDetails.voteAverage > 0
                  ? ` ${movieDetails.voteAverage.toFixed(1)}`
                  : "Not Rated"}
              </span>

              {movieDetails.formattedRuntime && (
                <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                  <AlarmClockCheck size={16} color="#f9fafb" />
                  <span>{movieDetails.formattedRuntime}</span>
                </span>
              )}

              <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                <CalendarDays size={16} color="#f9fafb" />
                <span>{movieDetails.release_date?.slice(0, 4)}</span>
              </span>
            </div>

            <p className="text-gray-300 text-[9px] md:text-sm lg:text-base max-w-xl mb-4 md:mb-6">
              {isMobile
                ? truncateTextByWords(movieDetails.overview, 3, 10)
                : movieDetails.overview}
            </p>

            <div className="text-gray-300 text-xs md:text-sm mb-4 md:mb-8">
              {movieDetails.genres?.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index < movieDetails.genres.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>

            {/* <div className="flex gap-2 md:gap-4">
              <Link href={`/movie/${movieDetails.id}`}>
                <Button
                  variant="gradient"
                  size="sm"
                  className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3"
                >
                  <Play size={20} />
                  <span>Play</span>
                </Button>
              </Link>
              <Link href={`/movie/${movieDetails.id}`}>
                <Button
                  variant="text"
                  size="sm"
                  className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-gray-600/50 text-white hover:bg-gray-600/70"
                >
                  <Info size={20} />
                  <span>Info</span>
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <OverviewMovie data={overviewData} directorName={directorName} />
      <div className="h-[200px] md:h-[330px] lg:h-[819px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 mb-10">
        <iframe
          src={`https://embed.su/embed/movie/${movieDetails.id}`}
          className="w-full h-full rounded-2xl shadow-xl"
          frameBorder="0"
          allowFullScreen
          title="Movie Video"
        />
      </div>
      <Cast cast={cast} />
      <Footer />
    </div>
  );
}
