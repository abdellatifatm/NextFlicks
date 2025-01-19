import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Cast({ cast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  // Limit to first 50 cast members
  const displayedCast = cast?.slice(0, 50) || [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) setSlidesPerView(8);
      else if (window.innerWidth >= 1280) setSlidesPerView(7);
      else if (window.innerWidth >= 1024) setSlidesPerView(6);
      else if (window.innerWidth >= 768) setSlidesPerView(4);
      else setSlidesPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(displayedCast.length / slidesPerView);

  const nextSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto my-8">
      <h1 className="text-2xl font-semibold md:text-3xl text-blue-gray-900 dark:text-gray-200 mb-6 px-4">Cast</h1>
      {/* <div className="text-2xl font-semibold md:text-3xl text-blue-gray-900 dark:text-gray-200 px-4  mb-6 flex items-center">
        <h1>Cast</h1>
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
      </div>         */}
      <div className="relative group">
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          <div className="inline-flex gap-4 pl-4 pr-4 md:gap-6">
            {displayedCast.map((actor, index) => (
              <div 
                key={actor.id} 
                className={`flex-none w-[110px] sm:w-[160px] md:w-[180px] lg:w-[200px]`}
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
              >
                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : "/avatar.png"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-gray-800 dark:text-gray-200 text-sm font-bold truncate">
                    {actor.name}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 text-sm truncate">
                    {actor.roles && actor.roles.length > 0
                      ? actor.roles[0].character
                      : actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Hidden on Mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous slide"
        >
          <div className="bg-black/50 hover:bg-black/75 rounded-lg p-2">
            <ChevronLeft className="w-6 h-6 text-white" />
          </div>
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next slide"
        >
          <div className="bg-black/50 hover:bg-black/75 rounded-lg p-2">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}