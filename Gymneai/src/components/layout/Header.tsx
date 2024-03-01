import React from "react";
import { NavLink, useLocation } from 'react-router-dom'
import { } from '../../assets/images/logo.png'

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import AnimatedLogo from "./AnimatedLogo";


export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-7">
      <Typography
        as="li"
        variant="small"
        color={location.pathname === '/home' ? 'red' : 'white'}
        className="p-1 text-base font-bold transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-red-600 "
      >
        <NavLink to="/home" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color={location.pathname === '/home/app' ? 'red' : 'white'}
        className="p-1 text-base font-bold transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-red-600 "
      >
         <NavLink to="app" className="flex items-center">
          App
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color={location.pathname === '/home/about-us' ? 'red' : 'white'}
        className="p-1 text-base font-bold transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-red-600 "
      >
         <NavLink to="about-us" className="flex items-center">
          About us
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <>
    <div 
      className=
      {
        location.pathname === "/home" || location.pathname=== "/home/app" || location.pathname==="/home/about-us" || location.pathname==="/home/sign-in"?
       "overflow-x-hidden w-full rounded-none py-11 md:px-20 lg:px-40 lg:py-14 text-white border-0 fixed opacity-[5%] bg-black z-[20]"
       :
       "overflow-x-hidden w-full rounded-none py-11 md:px-20 lg:px-40 lg:py-11  text-white border-0 fixed opacity-[100%] bg-[#222222] z-[20]"
      }
    
    ></div>
    <header>
    <div className="overflow-x-hidden ">
      {/* @ts-ignore */}
      <Navbar 
      className="max-w-full rounded-none  py-2 md:px-[3rem] lg:px-[10rem] xl:px-[12rem] lg:py-5 text-white border-0 fixed z-[25]"
      color="transparent"
      >
        
        <div className="flex items-center justify-between">
          <NavLink to="/home">
          <div className="flex items-start"> 
          <AnimatedLogo/>
          <Typography
            as="a"
            className="ml-3 cursor-pointer py-5 font-bold text-2xl transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-red-600 "
          >
            GymneAi
          </Typography>
          </div>
          </NavLink>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <NavLink to="/home/sign-in">
              {/* @ts-ignore */}
              <Button
                color={location.pathname === '/home/sign-in' ? 'red' : location.pathname === '/home/sign-in/forget-password' ? 'red' : location.pathname === '/home/sign-in/forget-password/verification-code' ? 'red': location.pathname === '/home/sign-in/forget-password/verification-code/reset-password' ? 'red' :'white'}
                variant="text"
                size="md"
                className="mr-2 hidden lg:inline-block border border-gray-800 hover:text-red-600 hover:border  hover:bg-transparent rounded-2xl"
              >
                <span>Login</span>
              </Button>
              </NavLink>

              <NavLink to="/home/sign-up/personal-info">
              {/* @ts-ignore */}
              <Button
                color={location.pathname === '/home/sign-up/personal-info' ? 'red' : location.pathname ==='/home/sign-up/sub-plans' ? 'red' : location.pathname === '/home/sign-up/gym-info' ? 'red' : location.pathname === '/home/sign-up/gym-sections-plans' ? 'red' : location.pathname === '/home/sign-up/verification-code' ? 'red' :"white"}
                variant="gradient"
                size="md"
                className="hidden lg:inline-block hover:bg-red-600 hover:text-white rounded-2xl bg-gray-300"
              >
                <span>Sign up</span>
              </Button>
              </NavLink>

            </div>
            {/* @ts-ignore */}
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
        </div>
        <MobileNav className={location.pathname === "/home" || location.pathname=== "/home/app" || location.pathname==="/home/about-us"?"border-x border-b border-gray-800 px-5 pt-4 rounded-b-xl ":"bg-gray-900 border-x border-b border-gray-800 px-5 pt-4 rounded-b-xl"} open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1 py-6">
          <NavLink to="/home/sign-in">
            {/* @ts-ignore */}
            <Button fullWidth variant="text" size="sm" className="w-[35vw] text-white hover:text-red-600 border border-gray-700 mr-5 rounded-xl hover:bg-transparent hover:border-red-600" color="white" onClick={() => setOpenNav(!openNav)}>
              <span>Log In</span>
            </Button>
            </NavLink>
          <NavLink to="/home/sign-up/personal-info">
            {/* @ts-ignore */}
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              color="white"
              className="w-[35vw] hover:bg-red-600 hover:text-white"
              onClick={() => setOpenNav(!openNav)}
            >
              <span>Sign in</span>
            </Button>
            </NavLink>

          </div>
        </MobileNav>
      </Navbar>
    </div>
    </header>
    </>
  );
}
