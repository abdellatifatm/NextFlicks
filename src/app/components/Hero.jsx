import React from 'react';
import { Play, Info } from 'lucide-react';
import {
  Button,
} from "@material-tailwind/react";

const Hero = ({ movie }) => {
  
  return (
    <div className="relative h-[600px] bg-gray-700 rounded-xl m-5 mt-10 lg:mx-8 px-4 overflow-hidden">
      <div 
        className="absolute inset-0  bg-cover bg-center rounded-xl"
      >
        <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} 
              className="card-img-top pt-3 pb-0 px-3"
            />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 px-8 max-w-7xl mx-auto">
        {/* Movie title */}
        <h1 className="text-6xl font-bold text-white mb-2 tracking-wide">
          Night Raiders
        </h1>

        {/* Movie metadata */}
        <div className="flex items-center gap-4 mb-4">
          <span className="px-2 py-1 bg-gray-100/20 text-white text-sm rounded">
            PG-15
          </span>
          <span className="text-white">4K</span>
          <span className="text-white">HDR</span>
          <span className="text-white">Dolby Atmos</span>
        </div>

        {/* Description */}
        <p className="text-gray-200 max-w-xl mb-6">
          A team of unlikely heroes must work together to complete an impossible mission that could change their destinies forever.
        </p>

        {/* Genre tags */}
        <div className="text-gray-300 mb-8">
          Action • Adventure • Sci-fi
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"> */}
          <Button
            variant="gradient"
            size="sm"
            className="flex items-center gap-2 px-8 py-3"
          >
            <Play size={20} />
            <span>Play</span>
          </Button>
            
          <Button
          variant='text'
            size="sm"
            className="flex items-center gap-2 px-8 py-3 bg-gray-600/50 text-white "
          >
            <Info size={20} />
            <span>Info</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;