"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, AlarmClockCheck, CalendarDays } from "lucide-react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Cast from "../../components/Cast";
import { Footer } from "../../components/Footer";
import OverviewTv from "../../components/OverviewTv";
import ScrollReveal from "../../components/ScrollReveal";
import { Alert } from "@material-tailwind/react";

export default function Page({ params }) {
  const MOBILE_BREAKPOINT = 960;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const TITLE_DELAY = 1500;

  const resolvedParams = React.use(params);
  const id = resolvedParams?.id;

  const [tvDetails, setTvDetails] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [trailer, setTrailer] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [tvLogos, setTvLogos] = useState({});
  const [showTitle, setShowTitle] = useState(false);
  const [cast, setCast] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  // const [directorName, setDirectorName] = useState([]);
  const [open, setOpen] = useState(true);

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
      const fetchTvDetails = async () => {
        try {
          // Fetch main TV show details
          const detailsResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
          );

          // Fetch content rating (age rating)
          const ratingsResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}`
          );

          //Get the credits
          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${API_KEY}`
          );

          // const directorName = await axios.get(
          //   `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`
          // );

          setCast(castResponse.data.cast);
          setOverviewData(detailsResponse.data);

          // Get US rating or first available rating
          const contentRating =
            ratingsResponse.data.results.find(
              (rating) => rating.iso_3166_1 === "US"
            )?.rating || ratingsResponse.data.results[0]?.rating;

          setTvDetails({
            ...detailsResponse.data,
            contentRating,
            voteAverage: detailsResponse.data.vote_average,
            numberOfSeasons: detailsResponse.data.number_of_seasons,
            numberOfEpisodes: detailsResponse.data.number_of_episodes,
            status: detailsResponse.data.status,
          });

          // Start timer to show trailer after backdrop
          setTimeout(() => {
            setShowTrailer(true);
          }, 5000);
        } catch (error) {
          console.error("Error fetching TV details:", error);
        }
      };
      fetchTvDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`
        );

        // Try to find official trailer first
        let trailerVideo = response.data.results.find(
          (video) => video.type === "Trailer" && video.official
        );

        // If no official trailer, try any trailer
        if (!trailerVideo) {
          trailerVideo = response.data.results.find(
            (video) => video.type === "Trailer"
          );
        }

        // If still no trailer, try any video
        if (!trailerVideo && response.data.results.length > 0) {
          trailerVideo = response.data.results[0];
        }

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        } else {
          console.error("No trailer or video found for this TV show.");
        }
      } catch (error) {
        console.error("Error fetching the trailer:", error);
      }
    };

    fetchTrailer();
  }, [id]);

  const getGenreNames = (genres) => {
    return genres
      .slice(0, 3) // Take only the first 3 genres
      .map((genre) => genre.name) // Extract the name of each genre
      .join(" • "); // Join names with a " • " separator
  };

  // const getMediaLink = (item) => {
  //   return `/tv/${item.id}`;
  // };

  const formatStatus = (status) => {
    switch (status) {
      case "Returning Series":
        return "Ongoing";
      case "Ended":
        return "Completed";
      case "Canceled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const fetchMovieLogo = async () => {
    if (!tvDetails) return;

    const endpoint = `https://api.themoviedb.org/3/tv/${tvDetails.id}/images?api_key=${API_KEY}`;

    try {
      const response = await axios.get(endpoint);
      const englishLogo = response.data.logos.find(
        (logo) => logo.iso_639_1 === "en"
      );

      if (englishLogo) {
        setTvLogos((prev) => ({
          ...prev,
          [tvDetails.id]: `https://image.tmdb.org/t/p/w500/${englishLogo.file_path}`,
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
  }, [tvDetails]);

  if (!tvDetails) return null;
  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="background_container lg:pt-5 md:pt-5">
        <ScrollReveal>
          <div className="flex-container flex-wrap">
            <div className="relative h-[222px] sm:h-[250px] md:h-[450px] lg:h-[819px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gray-900 rounded-xl overflow-hidden">
                
                {tvDetails && (
                  <div className="relative w-full h-full bg-black opacity-40">
                    {/* Backdrop Image */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        showTrailer ? "opacity-0" : "opacity-100"
                      }`}
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvDetails.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* YouTube Trailer */}
                    <div
                      className={`relative w-full h-full pt-[56.25%] transition-opacity object-cover duration-1000 ${
                        showTrailer ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {trailer && showTrailer && (
                        <iframe
                          className="absolute inset-0 w-full h-full object-cover"
                          src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&loop=1&playlist=${trailer}&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${
                            typeof window !== "undefined"
                              ? window.location.origin
                              : ""
                          }&vq=hd720`}
                          title="TV Show Trailer"
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
                      )}
                    </div>
                  </div>
                )}
              </div>
             
                <div className="relative z-20 h-full flex flex-col justify-end lg:py-64 py-6 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
               <ScrollReveal>    {tvLogos[tvDetails.id] ? (
                    <div className="logo-container object-contain">
                      <img
                        loading="lazy"
                        src={tvLogos[tvDetails.id]}
                        alt={`${tvDetails.title || tvDetails.name} logo`}
                        className="h-12 lg:max-w-md lg:h-24 w-auto max-w-[150px] md:max-h-24 object-contain mb-2 md:mb-4"
                        // style={{ filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))" }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    showTitle && (
                      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 tracking-wide">
                        {tvDetails.title || tvDetails.name}
                      </h1>
                    )
                  )}</ScrollReveal>

                  <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                    {tvDetails.contentRating && (
                      <span className="px-2 py-1 bg-gray-100/20 text-white text-xs md:text-sm rounded">
                        {tvDetails.contentRating}
                      </span>
                    )}

                    <span className="text-gray-300 ml-1 text-xs md:text-sm flex items-center gap-2">
                      <Star size={16} color="#f9fafb" />
                      {tvDetails.voteAverage > 0
                        ? ` ${tvDetails.voteAverage.toFixed(1)}`
                        : "Not Rated"}
                    </span>

                    <span className="text-gray-300 text-xs md:text-sm flex items-center gap-2">
                      <CalendarDays size={16} color="#f9fafb" />
                      <span>
                        {tvDetails.first_air_date?.slice(0, 4)}
                        {tvDetails.status !== "Ended" && " - Present"}
                      </span>
                    </span>

                    <span className="text-gray-300 text-xs md:text-sm px-2 py-1 bg-gray-100/20 rounded">
                      {formatStatus(tvDetails.status)}
                    </span>
                  </div>

                            {/* <div className="text-gray-300 text-xs md:text-sm mb-2">
                        {tvDetails.numberOfSeasons} Season{tvDetails.numberOfSeasons !== 1 ? 's' : ''} •{' '}
                        {tvDetails.numberOfEpisodes} Episode{tvDetails.numberOfEpisodes !== 1 ? 's' : ''}
                      </div> */}

                  <p className="text-gray-300 text-[9px] md:text-sm lg:text-base max-w-xl mb-4 md:mb-6">
                    {isMobile
                      ? truncateTextByWords(tvDetails.overview, 3, 10)
                      : truncateTextByWords(tvDetails.overview, 3, 30)}
                  </p>

                  <div className="text-gray-400 text-xs md:text-sm mb-2">
                    {getGenreNames(tvDetails.genres || [])}
                  </div>
                </div>
              
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <OverviewTv data={overviewData} />
        </ScrollReveal>
        <ScrollReveal>
          <Cast cast={cast} />
        </ScrollReveal>
        {/* <ScrollReveal>
          <div className=" m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 text-sm font-bold  ">
            <Alert
              variant="filled"
              open={open}
              icon={<Icon />}
              className="mb-5 rounded-2xl w-full h-full  flex items-center"
              action={
                <Button
                  variant="text"
                  color="white"
                  size="sm"
                  className="!absolute right-3 "
                  onClick={() => setOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x h-6 w-6"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              }
            >
              For a better experience, use an ad blocker (e.g., AdGuard, uBlock
              Origin).
            </Alert>
          </div>
          <div className="h-[200px] md:h-[330px] lg:h-[819px] m-2 md:m-5 mt-10 lg:mx-8 px-2 md:px-4 mb-10">
            <iframe
              src={`https://vidsrc.xyz/embed/tv/${tvDetails.id}`}
              className="w-full h-full rounded-2xl shadow-xl"
              frameBorder="0"
              allowFullScreen
              title="Movie Video"
            />
          </div>
        </ScrollReveal> */}

        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}
