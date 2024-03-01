import { Outlet, useLocation } from "react-router-dom";
import { Dashboard_SidebarOwner } from "../pages/Dashboard/SideBars/DashboardSidbarOwner";
import { Dashboard_SidebarEmployee } from "../pages/Dashboard/SideBars/DashboardSidbarEmployee";
import { Dashboard_SidebarCoach } from "../pages/Dashboard/SideBars/DashboardSidbarCoach";
import { useEffect } from "react";
import { SectionProvider } from "../../Providers/SectionContext";
import { EmployeeProvider } from "../../Providers/EmployeeContext";
import AuthService from "../../services/authService";
import { ToastProvider } from "react-toast-notifications";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}



export function DashboardLayout() {
const role = AuthService.getRole();
useEffect(() => {
  AuthService.tokenTimestampCheck();

  const intervalId = setInterval(() => {
    AuthService.tokenTimestampCheck();
  }, 9000000);

  return () => clearInterval(intervalId);
}, []);
//  ADD USE EFFECT FOR TOKENS !!


//  this value will be used later  after checking the rule of the Actor
  return (
    ScrollToTop(),
  <div className='flex items-start'>
  <ToastProvider>
  <SectionProvider>
  <EmployeeProvider>

   {role && (role==='owner' ? <Dashboard_SidebarOwner/> : role==='reception' ? <Dashboard_SidebarEmployee/> : role==='coach'?<Dashboard_SidebarCoach/>:"")}
   {role && <div className='flex-grow justify-center'>
        <Outlet/>
    </div>}
    </EmployeeProvider>
    </SectionProvider>
  </ToastProvider>

</div>
  );
}
