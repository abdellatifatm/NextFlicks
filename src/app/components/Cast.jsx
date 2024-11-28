export default function Cast({ cast }) {
  return (
    <>
      <div className="font-[sans-serif] my-10">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-5 text-center max-w-7xl max-lg:max-w-3xl max-md:max-w-xl mx-auto">
          {cast.slice(0, 12).map((actor) => (
            <div key={actor.id}>
              <img
                loading="lazy"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "/avatar.png"
                }
                className="w-32 h-32 rounded-xl inline-block object-cover shadow-xl"
              />

              <div className="py-4">
                <h4 className="text-gray-800 dark:text-gray-200  text-base font-bold">
                  {actor.name}
                </h4>
                {actor.roles && actor.roles.length > 0 ? (
                  <p className="text-gray-800  dark:text-gray-200 text-sm mt-1">
                    {actor.roles[0].character}
                  </p>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200  text-sm mt-1">
                    {actor.character}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
