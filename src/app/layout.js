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

export const metadata = {
  title: "NextFlicks",
  description: "Discover your next favorite movie or show on NextFlicks. Explore top-rated series, new releases, and personalized recommendations all in one place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >

        <div className="pt-4 px-4 sticky top-4 z-50">
          <Header />
        </div>
        {children}
 
      </body>
      
    </html>
  );
}
