"use client";

import React from "react";
import Link from "next/link";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Menu>
        <MenuHandler>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium cursor-pointer dark:text-gray-200 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-film"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 3v18" />
              <path d="M3 7.5h4" />
              <path d="M3 12h18" />
              <path d="M3 16.5h4" />
              <path d="M17 3v18" />
              <path d="M17 7.5h4" />
              <path d="M17 16.5h4" />
            </svg>
            <a className="flex items-center">Movies</a>
          </Typography>
        </MenuHandler>
        <MenuList className="p-2 text-blue-gray-900 dark:text-gray-200  bg-white/30 backdrop-blur-xl border-none rounded-lg shadow-lg">
          <MenuItem>Popular</MenuItem>
          <MenuItem>
            <a href="#">Now Playing</a>
          </MenuItem>
          <MenuItem>
            <a href="#">Upcoming</a>
          </MenuItem>{" "}
          <MenuItem>
            <Link href="#top-rated-Movies">Top Rated</Link>
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuHandler>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium cursor-pointer dark:text-gray-200 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-tv"
            >
              <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
            <a className="flex items-center">Tv Shows</a>
          </Typography>
        </MenuHandler>
        <MenuList className="p-2 text-blue-gray-900 dark:text-gray-200  bg-white/30 backdrop-blur-xl border-none rounded-lg shadow-lg">
          <MenuItem>Popular</MenuItem>
          <MenuItem>
            <a href="#">Airing Today</a>
          </MenuItem>
          {/* <Link href="/#mustwatch"> */}
          <MenuItem>On Tv</MenuItem>
          {/* </Link> */}
          <MenuItem>
            <Link href="#top-rated-TV-Shows">Top Rated</Link>
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Additional nav items */}

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium dark:text-gray-200 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trending-up"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
        <Link href="/#trending" className="flex items-center">
          Trending
        </Link>
      </Typography>

      <Menu>
        <MenuHandler>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium cursor-pointer dark:text-gray-200 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
            <a className="flex items-center"> Top Rated</a>
          </Typography>
        </MenuHandler>
        <MenuList className="p-2 text-blue-gray-900 dark:text-gray-200  bg-white/30 backdrop-blur-xl border-none rounded-lg shadow-lg">
          <MenuItem>
            <Link href="#top-rated-Movies">Movies</Link>
          </MenuItem>

          <MenuItem>
            <Link href="#top-rated-TV-Shows">Tv Shows</Link>
          </MenuItem>
        </MenuList>
      </Menu>


    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-opacity-55 border-none dark:bg-gray-900/30 ">
      <div className="container mx-auto flex items-center justify-between dark:text-gray-200  text-blue-gray-900">
        <Link href="/">
          <Typography className="mr-4 cursor-pointer py-1.5 font-bold">
            NextFlicks
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Link href="/sign-in">
            <Button variant="text" size="sm" className="hidden lg:inline-block dark:text-gray-200 ">
              <span>Sign In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign up</span>
            </Button>
          </Link>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="dark:text-gray-200">
              <Link href="/sign-in">
                <span>Sign In</span>
              </Link>
            </Button>
            {/* className="px-[30px] py-[9px]" */}
            <Button fullWidth variant="gradient" size="sm" className="">
              <Link href="/sign-up">
                <span>Sign up</span>
              </Link>
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
