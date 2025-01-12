import React from 'react';
import Link from 'next/link';

export default function Networks() {
    const networks = [
      {
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        bgColor: "bg-black",
        bgShadow: "shadow-lg shadow-black/50 ",
        // darkBgShadow: " dark:shadow-[#D91921]/70 ",
        id: 8,
      },
      {
        name: "Apple-TV+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Apple_TV%2B_logo.png",
        bgColor: "bg-gray-300",
        bgShadow: "shadow-lg shadow-gray-700/50",
        // darkBgShadow: " dark:shadow-gray-500/50 ",
        id: 350,
      },
      {
        name: "Disney+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Disney_Plus_logo.svg/589px-Disney_Plus_logo.svg.png?20230514170101",
        bgColor: "bg-[#020E41]",
        bgShadow: "shadow-lg shadow-[#020E41]/50",
        // darkBgShadow: " dark:shadow-[#01FFFF]/50 ",
        id: 337,
      },
      {
        name: "Max",
        logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5fbef0ad-821e-42ff-bd50-c54a0742abc7/dfudrq1-f161a753-d067-4c18-84f6-ca87785a41fe.png/v1/fill/w_1280,h_352/max__streaming_service__white_variant_logo_by_ajkelley_dfudrq1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzUyIiwicGF0aCI6IlwvZlwvNWZiZWYwYWQtODIxZS00MmZmLWJkNTAtYzU0YTA3NDJhYmM3XC9kZnVkcnExLWYxNjFhNzUzLWQwNjctNGMxOC04NGY2LWNhODc3ODVhNDFmZS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Mc1BkNcNJ9OvDQjnGigLX854nATwixmC37lMVLRJcEk",
        bgColor: "bg-[#002DE5]",
        bgShadow: "shadow-lg shadow-[#002DE5]/50",
        id: 1899,
      },
      {
        name: "Prime-Video",
        logo: "https://logodownload.org/wp-content/uploads/2018/07/prime-video-3.png",
        bgColor: "bg-[#24303F]",
        bgShadow: "shadow-lg shadow-[#24303F]/50",
        // darkBgShadow: " dark:shadow-[#00AAE1]/50 ",
        id: 9,
      },
      {
        name: "Hulu",
        // logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hulu_2019.svg/1200px-Hulu_2019.svg.png",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Hulu_logo_%282018%29.svg/640px-Hulu_logo_%282018%29.svg.png",
        bgColor: "bg-[#171E27]",
        bgShadow: "shadow-lg shadow-[#171E27]/50",
        // darkBgShadow: " dark:shadow-[#15E884]/50 ",
        id: 15,
      },
      {
        name: "Paramount+",
        logo: "https://thevaultnyc.com/wp-content/uploads/2022/10/Paramount_Logo_White.png",
        bgColor: "bg-[#0074FF]",
        bgShadow: "shadow-lg shadow-[#0074FF]/50",
        id: 531,
      },
      {
        name: "Crunchyroll",
        logo: "https://cdn2.steamgriddb.com/logo_thumb/af572c17ae795b42bc23a1654b12e0d2.png",
        bgColor: "bg-[#FF5E00]",
        bgShadow: "shadow-lg shadow-[#FF5E00]/50",
        id: 283,
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
            <Link href={`/network/${network.id}`}>
              <span
                className={`
                  w-full lg:max-w-72 lg:h-44 md:max-w-60 md:h-36 max-w-48 h-28 rounded-xl 
                  ${network.bgColor} 
                  backdrop-blur-2xl 
                   ${network.bgShadow}
                   ${network.darkBgShadow}
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
                  className="p-12 lg:p-16 max-w-full object-contain" 
                  alt={network.name} 
                />
              </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
