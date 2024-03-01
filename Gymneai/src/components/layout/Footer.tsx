import { Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();

  return (
    <div className="w-full myfooter-bg">
      <footer
        className={
          location.pathname === "/home" ||
          location.pathname === "/home/app" ||
          location.pathname === "/home/sign-in" ||
          location.pathname === "/home/about-us"
            ?
             "w-full bg-black opacity-[70%] p-20 myfooter"
            :
             "w-full bg-white opacity-[80%] p-20 myfooter"
        }
      >
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between lg:px-40">
        <img  className="h-[3rem] w-[3.5rem]"src="src\assets\images\logo.png" alt="logo" />

          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Typography
                as="a"
                href="#"
                className={   location.pathname === "/home" ||
          location.pathname === "/home/app" ||
          location.pathname === "/home/sign-in" ||
          location.pathname === "/home/about-us"
            ?"text-white font-bold  transition-colors hover:text-red-600 focus:text-red-600 text-md":"text-md text-black font-bold hover:text-red-600 focus:text-red-600"}
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                className={   location.pathname === "/home" ||
          location.pathname === "/home/app" ||
          location.pathname === "/home/sign-in" ||
          location.pathname === "/home/about-us"
            ?"text-white font-bold  transition-colors hover:text-red-600 focus:text-red-600 text-md":"text-md text-black font-bold hover:text-red-600 focus:text-red-600"}
              >
                Contact Us
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-8 30" />
        <Typography className="text-center text-white font-bold">
          &copy; 2023 GymneAI
        </Typography>
      </footer>
    </div>
  );
}
