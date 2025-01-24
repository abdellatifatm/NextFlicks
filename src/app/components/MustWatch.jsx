"use client";
import React from 'react';
import Link from 'next/link';

export default function MustWatch({ movies }) {
  const getMediaLink = (item) => {
    const baseUrl = item.media_type === "movie" ? "/movie" : "/tv";
    return `${baseUrl}/${item.id}`;
  };

  return (
    <div className="rounded-lg mx-4 sm:mx-8 lg:mx-16   text-blue-gray-900 dark:text-gray-200 scroll-m-72 md:scroll-m-40 lg:scroll-m-40" id='trending'>
      <div className="text-2xl font-semibold md:text-3xl  mb-2 text-left flex items-center">
        <h1>Trending</h1>
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
          <div key={movie.id} className="relative movie-item group">
            <Link href={getMediaLink(movie)}>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || 'Movie Poster'}
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
