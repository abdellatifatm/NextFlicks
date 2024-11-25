import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function MustWatch({ movies }) {
  const containerRef = useRef(null);
  const [posterWidth, setPosterWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      setPosterWidth(containerRef.current.children[0].offsetWidth);
    }
  }, [movies]);

  const scrollSlider = (direction) => {
    const container = containerRef.current;
    const scrollAmount = direction === "left" ? -posterWidth * 3 : posterWidth * 3;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };



  const getMediaLink = (item) => {
    const baseUrl = item.media_type === "movie" ? "/movie" : "/tv";
    return `${baseUrl}/${item.id}`;
  };

  return (
    <div className="rounded-xl mx-4 px-3 pt-10 text-blue-gray-900 " id='trending'>
      <div className="text-2xl font-semibold md:text-3xl ml-2 mb-6 text-left flex items-center ">
        <h1>Trending </h1>
        {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up md:w-[28px] md:h-[28px] w-6 h-6"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> */}

        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right md:w-[28px] md:h-[28px] w-6 h-6"><path d="m9 18 6-6-6-6" /></svg>
      </div>

      {movies && movies.length > 0 ? (
        <div className="relative" >

          <div
            className="movie-slider-container flex gap-4 h-[350px] overflow-x-auto scrollbar-hide"
            ref={containerRef}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item md:p-1 max-w-[200px] flex-shrink-0">
                <Link href={getMediaLink(movie)}>
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="movie-poster rounded-xl lg:w-[200px] md:w-[150px] w-[120px]  object-cover drop-shadow-lg transition-transform transform  hover:drop-shadow-2xl hover:opacity-90"
                  />
                </Link>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">No movies available to display.</p>
      )}
    </div>

  );
}
