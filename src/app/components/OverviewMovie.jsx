import languageMap from "../data/languages.json";

export default function OverviewMovie({ data, directorName }) {
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
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Released</span>
            <span className="flex-1">
              {data.release_date
                ? new Date(data.release_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Runtime</span>
            <span className="flex-1">
              {data.runtime
                ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`
                : "N/A"}
            </span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Director</span>
            <a href="#" className="text-blue-600 underline flex-1">
              {directorName || "Unknown"}
            </a>
          </li>
          {data.budget != null && (
            <li className="flex">
              <span className="mr-4 font-semibold w-32 flex-shrink-0">Budget</span>
              <span className="flex-1">{`

{new Intl.NumberFormat().format(data.budget)}`}</span>
            </li>
          )}
          {data.revenue != null && (
            <li className="flex">
              <span className="mr-4 font-semibold w-32 flex-shrink-0">Revenue</span>
              <span className="flex-1">{`

{new Intl.NumberFormat().format(data.revenue)}`}</span>
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
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Status</span>
            <span className="flex-1">{data.status}</span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Language</span>
            <span className="flex-1">
              {data.spoken_languages && data.spoken_languages.length > 0
                ? data.spoken_languages
                    .map((lang) =>
                      lang.english_name === "No Language"
                        ? languageMap[data.original_language] ||
                          data.original_language
                        : lang.english_name
                    )
                    .join(", ")
                : languageMap[data.original_language] ||
                  data.original_language ||
                  "N/A"}
            </span>
          </li>
          <li className="flex">
            <span className="mr-4 font-semibold w-32 flex-shrink-0">Production</span>
            <span className="flex-1">
              {data.production_companies
                ? `${data.production_companies.map((prod) => prod.name).join(", ")}`
                : "N/A"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}