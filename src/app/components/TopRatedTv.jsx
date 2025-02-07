"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function TopRatedTv() {
  const API_KEY = "84ef9a6a385dcf0d998c9d83dd821e47";
  const [topTvShows, setTopTvShows] = useState([]);

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
        );
        setTopTvShows(detailsResponse.data.results.slice(0,18));
      } catch (error) {
        console.error("Error fetching TV details:", error);
      }
    };
    fetchTvDetails();
  }, []);

  const getMediaLink = (item) => {
    const formattedTitle = (item.title || item.name).toLowerCase().replace(/\s+/g, '-');
    return `/tv/${item.id}-${formattedTitle}`;
  };

  return (
    <div className="rounded-lg mx-4 sm:mx-8 lg:mx-16 pt-10 text-blue-gray-900 dark:text-gray-200">
      <div className="text-2xl font-semibold md:text-3xl  mb-2 text-left flex items-center">
        <h1>Top Rated TV Shows</h1>
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
        {topTvShows.map((show) => (
          <div key={show.id} className="relative movie-item group">
            <Link href={getMediaLink(show)}>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt={show.name || 'TV Show Poster'}
                  className="w-full aspect-[2/3] object-cover drop-shadow-lg transition-transform transform hover:drop-shadow-2xl hover:opacity-90 group-hover:scale-110"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
