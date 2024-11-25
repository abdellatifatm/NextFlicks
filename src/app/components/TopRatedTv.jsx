import { useState, useEffect,useRef  } from "react";
import axios from "axios";
import Link from "next/link";


export default function TopRatedTv() {
    const API_KEY = "84ef9a6a385dcf0d998c9d83dd821e47";
    const [topTvShows, setTopTvShows] = useState([])
    const containerRef = useRef(null);


    useEffect(() => {
   
            const fetchTvDetails = async () => {
                try {
                    // Fetch main TV show details
                    const detailsResponse = await axios.get(
                        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
                    );

                    setTopTvShows(detailsResponse.data.results);
                }
                catch (error) {
                    console.error("Error fetching TV details:", error);
                }
            };
            fetchTvDetails();
        
    }, []);

    return (

        <>
<div className="rounded-xl mx-4 px-3 py-5 text-blue-gray-900" id="top-rated-TV-Shows">
      <div className="text-2xl font-semibold md:text-3xl ml-2 mb-6 text-left flex items-center">
        <h1 className="mr-1">Top Rated TV Shows</h1>
        {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star md:w-[28px] md:h-[28px] w-6 h-6"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg> */}
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right md:w-[28px] md:h-[28px] w-6 h-6"><path d="m9 18 6-6-6-6" /></svg>

      </div>

      {topTvShows && topTvShows.length > 0 ? (
        <div className="relative"  >
          <div
            className="movie-slider-container flex gap-4 h-[350px] overflow-x-auto scrollbar-hide"
            ref={containerRef}
          >
            {topTvShows.map((show) => (
              <div
                key={show.id}
                className="movie-item md:p-1 max-w-[200px] flex-shrink-0"
                id="top-rated-TV-Shows"
              >
                <Link href={`/tv/${show.id}`}>
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                    alt={show.name}
                    className="movie-poster rounded-xl lg:w-[200px] md:w-[150px] w-[120px] object-cover drop-shadow-lg transition-transform transform hover:scale-105 hover:drop-shadow-2xl hover:opacity-90"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">
          No TV shows available to display.
        </p>
      )}
    </div>

        </>
    )
};
