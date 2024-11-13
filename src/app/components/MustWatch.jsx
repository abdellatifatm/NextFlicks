import React, { useRef, useEffect, useState } from 'react';

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

  return (
    <div className="must-watch-container rounded-xl mx-4 px-3 py-10 text-blue-gray-900 relative">
    <div className="text-2xl font-semibold md:text-3xl ml-2 mb-6 text-left flex items-center ">
  <h1>Must Watch</h1>
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
</div>

      {movies && movies.length > 0 ? (
        <div className="relative" id='mustwatch'>

          <div
            className="movie-slider-container flex gap-4 h-[350px] overflow-x-auto scrollbar-hide"
            ref={containerRef}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item md:p-1 max-w-[200px] flex-shrink-0">
                <a href="#">
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="movie-poster rounded-xl lg:w-[200px] md:w-[150px] w-[120px]  object-cover drop-shadow-lg transition-transform transform  hover:drop-shadow-2xl hover:opacity-90"
                  />
                </a>
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
