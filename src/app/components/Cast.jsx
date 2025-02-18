import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Cast({ cast }) {
  const [slidesPerView, setSlidesPerView] = useState(8);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showArrows, setShowArrows] = useState({ left: false, right: true });

  // Limit to first 50 cast members
  const displayedCast = cast?.slice(0, 50) || [];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 1536) setSlidesPerView(8);
      else if (width >= 1280) setSlidesPerView(7);
      else if (width >= 1024) setSlidesPerView(6);
      else if (width >= 768) setSlidesPerView(4);
      else setSlidesPerView(3);
    };

    handleResize();
    const throttledResize = () => requestAnimationFrame(handleResize);
    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, []);

  // Handle scroll position for arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowArrows({
          left: scrollLeft > 0,
          right: scrollLeft < scrollWidth - clientWidth - 10
        });
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => element?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollByOffset = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Desktop drag handlers
  const handleDragStart = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.pageX || e.touches?.[0]?.pageX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current || isMobile) return;
    const x = e.pageX || e.touches?.[0]?.pageX;
    const distance = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - distance;
  };

  const handleDragEnd = () => {
    if (!isMobile) {
      isDragging.current = false;
    }
  };

  // Mobile-specific touch handlers
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    startX.current = e.touches[0].pageX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    const x = e.touches[0].pageX;
    const walk = (startX.current - x) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current + walk;
  };

  return (
    cast?.length > 0 && (
      <div className="w-full max-w-[100%] mx-auto my-2 pb-10">
        <h1 className="text-2xl font-semibold md:text-3xl text-blue-gray-900 dark:text-gray-200 mb-6 lg:px-14 pl-4">
          Cast
        </h1>
        <div className="relative group">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth cursor-grab md:cursor-grab"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            style={{
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none'
            }}
          >
            <div className="inline-flex gap-4 lg:px-14 pl-4 pr-4">
              {displayedCast.map((actor) => (
                <div
                  key={actor.id}
                  className="flex-none w-[110px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                          : '/avatar.png'
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 cursor-pointer"
                      loading="lazy"
                      draggable="false"
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

          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={() => scrollByOffset(-scrollRef.current.offsetWidth)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pl-2"
            aria-label="Previous slide"
          >
            <div className="bg-black/50 hover:bg-black/75 rounded-lg p-2">
              <ChevronLeft className="w-6 h-6 text-white" />
            </div>
          </button>
          <button
            onClick={() => scrollByOffset(scrollRef.current.offsetWidth)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pr-2"
            aria-label="Next slide"
          >
            <div className="bg-black/50 hover:bg-black/75 rounded-lg p-2">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>
      </div>
    )
  );
}