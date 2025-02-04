import React from "react";

const OverviewTv = ({ data }) => {
  if (!data) {
    return null; // Handle cases where the data is not yet available
  }

  return (
    <div className="flex flex-col lg:flex-row  text-blue-gray-900 dark:text-gray-200 lg:mx-20 px-6 lg:p-10 gap-8 lg:gap-12 pb-10">
      {/* Image Section */}
      <div className="">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} // Replace with your image path
          alt="Back in Action Poster"
          className="w-[280px] h-auto hidden lg:block rounded-lg"
          loading="lazy" 
        />
      </div>

      {/* Text Section */}
      <div className="lg:flex-1">
        <h2 className="text-2xl font-bold mb-4">Storyline</h2>
        <p className="mb-6">
          {data.overview
            ? data.overview
            : "No overview available for this TV show."}
        </p>
        <ul className="space-y-2">
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">First Aired</span>
            <span className="flex-1">{data.first_air_date}</span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Last Aired</span>
            <span className="flex-1">{data.last_air_date}</span>
          </li>
          {data.created_by && data.created_by.length > 0 && (
            <li className="flex">
              <span className="mr-4 font-semibold w-32 flex-shrink-0">Creator</span>
              <a href="#" className="text-blue-600 underline flex-1">
                {data.created_by.map((creator) => creator.name).join(", ")}
              </a>
            </li>
          )}
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Genre</span>
            <a href="#" className="text-blue-600 underline flex-1">
              {data.genres
                ?.map((genre) => genre.name)
                .slice(0, 3)
                .join(", ") || "Unknown"}
            </a>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Seasons</span>
            <span className="flex-1">{data.number_of_seasons || "Unknown"}</span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Episodes</span>
            <span className="flex-1">{data.number_of_episodes || "Unknown"}</span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Status</span>
            <span className="flex-1">{data.status || "Unknown"}</span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Language</span>
            <span className="flex-1">{data.spoken_languages.map((lang) => lang.english_name).join(", ")}</span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Network</span>
            <span className="flex-1">{data.networks?.map((network) => network.name).join(", ") || "Unknown"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewTv;
