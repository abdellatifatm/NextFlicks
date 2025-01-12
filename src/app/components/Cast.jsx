import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Cast({ cast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(6);

  // Limit to first 30 cast members
  const displayedCast = cast.slice(0, 50);

  // Update slides per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(6);
      else if (window.innerWidth >= 768) setSlidesPerView(4);
      else setSlidesPerView(3);
    };

    // Set initial slides
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(displayedCast.length / slidesPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % totalPages
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + totalPages) % totalPages
    );
  };

  return (
    <div className="font-[sans-serif] my-10 relative max-w-7xl mx-auto">
      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute left-0 lg:ml-[-36px]  top-[4.5rem]  z-10 transform -translate-y-1/2 dark:bg-gray-500 bg-gray-900 dark:hover:bg-white/75 hover:bg-black/75  rounded-md p-1"
          >
            <ChevronLeft className="w-6 h-6 dark:text-blue-gray-900 text-gray-200" />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-0 top-[4.5rem] lg:mr-[-36px] z-10 transform -translate-y-1/2 dark:bg-gray-500 bg-gray-900 dark:hover:bg-white/75 hover:bg-black/75 rounded-md p-1"
          >
            <ChevronRight className="w-6 h-6 dark:text-blue-gray-900 text-gray-200"  />
          </button>
        </>
      )}

      {/* Cast Grid */}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-3 gap-0 lg:gap-5 md:gap-1 text-center">
        {displayedCast
          .slice(
            currentIndex * slidesPerView, 
            (currentIndex * slidesPerView) + slidesPerView
          )
          .map((actor) => (
            <div key={actor.id} className="flex flex-col items-center">
              <img
                loading="lazy"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "/avatar.png"
                }
                alt={actor.name}
                className="lg:w-32 lg:h-32 md:w-32 md:h-32 w-14 h-14 rounded-xl inline-block object-cover shadow-xl"
              />
              <div className="py-4">
                <h4 className="text-gray-800 dark:text-gray-200 text-xs lg:text-base  font-bold">
                  {actor.name}
                </h4>
                <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base  mt-1">
                  {actor.roles && actor.roles.length > 0 
                    ? actor.roles[0].character 
                    : actor.character}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-2 rounded-full ${
                currentIndex === index 
                  ? 'bg-gray-900 dark:bg-gray-200' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
