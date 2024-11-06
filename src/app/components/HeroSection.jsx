// import React from 'react';
// import { Play, Plus, Info } from 'lucide-react';

// const HeroSection = ({ movie }) => {
//     // If no movie is passed, return null or a loading state
//     if (!movie) return null;

//     return (
//         <div className="relative h-[600px] bg-gray-700 rounded-xl m-5 mt-10 lg:mx-8 px-4 overflow-hidden">
//             {/* Background gradient overlay */}
//             <div 
//                 className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-transparent to-red-900/90 z-10 rounded-xl"
//             />
            
//             {/* Background image */}
//             <div 
//                 className="absolute inset-0 bg-cover bg-center rounded-xl"
//                 style={{
//                     backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
//                 }}
//             />

//             {/* Content */}
//             <div className="relative z-20 h-full flex flex-col justify-end pb-16 px-8 max-w-7xl mx-auto">
//                 {/* Movie title */}
//                 <h1 className="text-6xl font-bold text-white mb-2 tracking-wide">
//                     {movie.title}
//                 </h1>

//                 {/* Movie metadata */}
//                 <div className="flex items-center gap-4 mb-4">
//                     <span className="px-2 py-1 bg-gray-100/20 text-white text-sm rounded">
//                         {movie.adult ? 'Adult' : 'PG'}
//                     </span>
//                     <span className="text-white">4K</span>
//                     <span className="text-white">HDR</span>
//                     <span className="text-white">
//                         {movie.vote_average.toFixed(1)} ⭐
//                     </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-200 max-w-xl mb-6">
//                     {movie.overview}
//                 </p>

//                 {/* Release date */}
//                 <div className="text-gray-300 mb-8">
//                     Release Date: {new Date(movie.release_date).toLocaleDateString()}
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-4">
//                     <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
//                         <Play size={20} />
//                         Play
//                     </button>
//                     <button className="flex items-center gap-2 px-4 py-3 bg-gray-600/50 text-white rounded-full hover:bg-gray-600/70 transition">
//                         <Plus size={20} />
//                         Add to List
//                     </button>
//                     <button className="flex items-center gap-2 px-4 py-3 bg-gray-600/50 text-white rounded-full hover:bg-gray-600/70 transition">
//                         <Info size={20} />
//                         More Info
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeroSection;