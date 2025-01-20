export default function OverviewMovie({ data }) {
  if (!data) {
    return null; // Handle cases where the data is not yet available
  }

  return (
    <div className="flex flex-col lg:flex-row text-blue-gray-900 dark:text-gray-200 lg:mx-20 px-6 lg:p-10 gap-8 lg:gap-12 pb-10">
      {/* Image Section */}
      <div className="">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} // Replace with your image path
          alt={data.original_title || "Movie Poster"}
          className="w-[280px] h-auto hidden lg:block rounded-lg"
        />
      </div>

      {/* Text Section */}
      <div className="lg:flex-1">
        <h2 className="text-2xl font-bold mb-4">Storyline</h2>
        <p className="mb-6">
          {data.overview
            ? data.overview
            : "No overview available for this movie."}
        </p>
        <ul className="space-y-2">
          <li>
            <span className="mr-12 font-semibold">Release Date</span>{" "}
            {data.release_date}
          </li>
          <li>
            <span className="mr-12 font-semibold">Runtime</span>{" "}
            {data.runtime
              ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`
              : "N/A"}
          </li>
          <li>
            <span className="mr-12 font-semibold">Director</span>{" "}
            <a href="#" className="text-blue-600 underline">
              {/* {data} */}
            </a>
          </li>
          <li>
            <span className="mr-12 font-semibold">Genre</span>{" "}
            <a href="#" className="text-blue-600 underline">
              {data.genres
                ?.map((genre) => genre.name)
                .slice(0, 3)
                .join(", ") || "Unknown"}
            </a>
          </li>
          <li>
            <span className="mr-12 font-semibold">Status</span> {data.status}
          </li>
          <li>
            <span className="mr-12 font-semibold">Language</span>{" "}
            {data.spoken_languages
              ? `${data.spoken_languages.map((lang) => lang.name).join(", ")}`
              : "N/A"}
          </li>
          <li>
            <span className="mr-12 font-semibold">Production</span>{" "}
            {data.production_companies
              ? `${data.production_companies
                  .map((prod) => prod.name)
                  .join(", ")}`
              : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
}
