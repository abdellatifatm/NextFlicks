import React from 'react';

export default function Networks() {
    const networks = [
      {
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        bgColor: "bg-black",
      },
      {
        name: "Apple TV+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Apple_TV%2B_logo.png",
        bgColor: "bg-gray-300",
      },
      {
        name: "Disney+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Disney_Plus_logo.svg/589px-Disney_Plus_logo.svg.png?20230514170101",
        bgColor: "bg-[#020E41]",
      },
      {
        name: "Max",
        logo: "https://shorturl.at/QWKdG",
        bgColor: "bg-[#002DE5]",
      },
      {
        name: "Prime Video",
        logo: "https://logodownload.org/wp-content/uploads/2018/07/prime-video-3.png",
        bgColor: "bg-[#24303F]",
      },
      {
        name: "Hulu",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hulu_2019.svg/1200px-Hulu_2019.svg.png",
        bgColor: "bg-[#171E27]",
      },
      {
        name: "Paramount+",
        logo: "https://thevaultnyc.com/wp-content/uploads/2022/10/Paramount_Logo_White.png",
        bgColor: "bg-[#0074FF]",
      },
      {
        name: "Peacock",
        logo: "https://images.squarespace-cdn.com/content/v1/6393a5233055ce7910f069d3/804abca1-b0fd-46ab-8db1-c443cff4d0ba/Peacock_Vector_Logo_011222.png",
        bgColor: "bg-black",
      },
    ];
  
    return (
      <div className="font-[sans-serif] my-10 w-full px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {networks.map((network, index) => (
            <div 
              key={index} 
              className="flex justify-center"
            >
              <span
                className={`
                  w-full lg:max-w-72 lg:h-44 md:max-w-60 md:h-36 max-w-48 h-28 rounded-xl 
                  ${network.bgColor} 
                  backdrop-blur-2xl 
                  shadow-xl 
                  flex 
                  items-center 
                  justify-center 
                  cursor-pointer
                  transition-transform 
                  hover:scale-105
                `}
              >
                <img 
                  src={network.logo} 
                  loading="lazy" 
                  className="p-6 lg:p-14 max-w-full object-contain" 
                  alt={network.name} 
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }