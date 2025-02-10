import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport = {
  themeColor: "#000000",
};

export const metadata = {
  manifest: "/manifest.json",
  title: "NextFlicks",
  description: "Discover your next favorite movie or show on NextFlicks. Explore top-rated series, new releases, and personalized recommendations all in one place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white  dark:bg-[#171717] transition-colors duration-300`}
      >

        <div className="pt-4 px-4 sticky top-4 z-50">
          <Header />
        </div>
        {children}
 
      </body>
      
    </html>
  );
}
