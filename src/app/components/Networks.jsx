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
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5fbef0ad-821e-42ff-bd50-c54a0742abc7/dfudrq1-f161a753-d067-4c18-84f6-ca87785a41fe.png/v1/fill/w_1280,h_352/max__streaming_service__white_variant_logo_by_ajkelley_dfudrq1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzUyIiwicGF0aCI6IlwvZlwvNWZiZWYwYWQtODIxZS00MmZmLWJkNTAtYzU0YTA3NDJhYmM3XC9kZnVkcnExLWYxNjFhNzUzLWQwNjctNGMxOC04NGY2LWNhODc3ODVhNDFmZS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Mc1BkNcNJ9OvDQjnGigLX854nATwixmC37lMVLRJcEk",
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
