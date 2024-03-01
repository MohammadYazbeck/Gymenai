import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useEffect } from "react";
import AuthService from "../../services/authService";


function ScrollToTop() {
  const { pathname } = useLocation();

//  ADD USE EFFECT FOR TOKENS !!

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}



export function HomeLayout() {
  useEffect(() => {
    AuthService.tokenTimestampCheck();
  
    const intervalId = setInterval(() => {
      AuthService.tokenTimestampCheck();
    }, 9000000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    ScrollToTop(),
<>
<Header/>
<Outlet/>
<Footer/>
</>
  );
}
