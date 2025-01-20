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
          <li>
            <span className="mr-12 font-semibold">First Aired</span>{" "}
            {data.first_air_date}
          </li>
          <li>
            <span className="mr-12 font-semibold">Last Aired</span>{" "}
            {data.last_air_date}
          </li>

          <li>
            <span className="mr-12 font-semibold ">Creator</span>{" "}
            <a href="#" className="text-blue-600 underline">
              {data.created_by && data.created_by.length > 0
                ? data.created_by.map((creator) => creator.name).join(", ")
                : "Unknown"}
            </a>
          </li>
          <li>
            <span className="mr-12 font-semibold ">Genre</span>{" "}
            <a href="#" className="text-blue-600 underline">
              {data.genres
                ?.map((genre) => genre.name)
                .slice(0, 3)
                .join(", ") || "Unknown"}
            </a>
          </li>
          <li>
            <span className="mr-12 font-semibold ">Seasons</span>{" "}
            {data.number_of_seasons || "Unknown"}
          </li>
          <li>
            <span className="mr-12 font-semibold ">Episodes</span>{" "}
            {data.number_of_episodes || "Unknown"}
          </li>
          <li>
            <span className="mr-12 font-semibold ">Status</span>{" "}
            {data.status || "Unknown"}
          </li>
          <li>
            <span className="mr-12 font-semibold ">Language</span>{" "}
            {data.spoken_languages.map((lang) => lang.english_name).join(", ")}
          </li>
          <li>
            <span className="mr-12 font-semibold ">Network</span>{" "}
            {data.networks?.map((network) => network.name).join(", ") ||
              "Unknown"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewTv;
