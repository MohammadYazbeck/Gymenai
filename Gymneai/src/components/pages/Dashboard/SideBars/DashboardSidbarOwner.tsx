// @ts-nocheck
import  {useState} from 'react';
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import { BsBell, BsEnvelopeExclamation, BsPower, BsQrCode } from "react-icons/bs";
import AuthService from "../../../../services/authService";
import ActiveMembers from '../ActiveMembers';
 
export function Dashboard_SidebarOwner() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(
    location.pathname === "/dashboard/gym-sections" || location.pathname === "/dashboard/add-section" ? 1 :
    (location.pathname === "/dashboard/gym-employees" || location.pathname === "/dashboard/employees-log" || location.pathname === "/dashboard/add-employee") ? 2 :
    (location.pathname === "/dashboard/gym-members" || location.pathname === "/dashboard/add-member" || location.pathname === "/dashboard/membership-requests" || location.pathname === "/dashboard/sub-history" || location.pathname === "/dashboard/ended-subs") ? 3 :
    (location.pathname === "/dashboard/edit-personal-info" || location.pathname === "/dashboard/edit-gym-info") ? 4 : 0

  );
  
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    
 
  };
  const handelLogoutClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };


  const handleLogout = () => {
    setShowModal(false);
    AuthService.clearTokens()
    navigate('/home')
 
  };
 
  return (
    <>
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 fixed bg-[#222222] z-30 flex flex-col justify-between pb-[4rem]">
    <div>
     <div className="mb-4 p-4 flex items-center">
      <NavLink to="/home">
        <div className='flex center'>
      {/* <img className="w-[3rem] h-[3rem]"src="src/assets/images/logo.png" alt="" /> */}
      <Typography variant="h5" className="cursor-pointer text-red-600 ml-2 mt-1 px-1 font-bold text-2xl">
        GymneAi
      </Typography>
      </div>
      </NavLink>
      <p className="cursor-pointer  text-gray-500 font-bold text-sm">OWNER</p>
    </div>


      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform text-gray-300 ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className= {open===1 ? "p-0 bg-red-700 hover:bg-transpert" : "p-0 hover:bg-gray-800 "} selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
              </ListItemPrefix>
              <Typography  className="mr-auto text-white font-bold">
                Sections
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">

            <NavLink to="/dashboard/gym-sections">
              <ListItem className={ (location.pathname === "/dashboard/gym-sections" || location.pathname==="/dashboard/gym-sections/edit-section") ?" text-red-600 font-bold text-sm hover:bg-transpert focus:bg-transpert focus:text-red-600 hover:text-red-600" :"text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Gym Sections
              </ListItem>
              </NavLink>

              <NavLink to="/dashboard/add-section">
              <ListItem className={location.pathname === "/dashboard/add-section" ?" text-red-600 font-bold text-sm  hover:text-red-600 hover:bg-transpert focus:bg-transpert focus:text-red-600" : "text-gray-400  font-bold text-sm hover:bg-transpert hover:text-red-600 focus:bg-transpert focus:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add a Section
              </ListItem>
              </NavLink>

            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform text-gray-300 ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className= {open===2 ? "p-0 bg-red-700 hover:bg-transpert" : "p-0 hover:bg-gray-800"} selected={open === 2}>
          
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
              </ListItemPrefix>
              <Typography  className="text-white mr-auto font-bold">
                Employees
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <NavLink to="/dashboard/gym-employees">
            <ListItem className={location.pathname==="/dashboard/gym-employees"|| location.pathname==="/dashboard/role-employees"|| location.pathname==="/dashboard/gym-employees/edit-employee-info" ? "text-red-600 font-bold text-sm hover:bg-transpert hover:text-red-600  focus:bg-transpert focus:text-red-600":"text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600  focus:bg-transpert focus:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Gym Employees
              </ListItem>
              </NavLink>
              {/* <ListItem className="text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600 focus:bg-transpert focus:text-red-600">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Employees Log
              </ListItem> */}
              <NavLink to="/dashboard/add-employee">
              <ListItem className={ location.pathname === "/dashboard/add-employee" ?"text-red-600 font-bold text-sm hover:bg-transpert  hover:text-red-600 focus:bg-transpert focus:text-red-600" :"text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add an Employee
              </ListItem></NavLink>

            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform text-gray-300 ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className= {open===3 ? "p-0 bg-red-700 hover:bg-transpert" : "p-0 hover:bg-gray-800"} selected={open === 3}>
          
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
              </ListItemPrefix>
              <Typography  className="text-white mr-auto font-bold">
                Members
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">

            <List className="p-0">

          <NavLink to="/dashboard/gym-members">
            <ListItem className={location.pathname === "/dashboard/gym-members" || location.pathname==="/dashboard/gym-members/blacklisted-members" ?"text-red-600 font-bold text-sm hover:bg-transpert  hover:text-red-600 focus:bg-transpert focus:text-red-600" :"text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Gym Members
              </ListItem>
              </NavLink>

          <NavLink to="/dashboard/membership-requests">
            <ListItem className={location.pathname === "/dashboard/membership-requests" ?"text-red-600 font-bold text-sm hover:bg-transpert  hover:text-red-600 focus:bg-transpert focus:text-red-600" :"text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Membership Requests
              </ListItem>
              </NavLink>
             
             <NavLink to="/dashboard/nearly-ended-subs">
            <ListItem className={location.pathname === "/dashboard/nearly-ended-subs"?"text-red-600 font-bold text-sm hover:bg-transpert  hover:text-red-600 focus:bg-transpert focus:text-red-600" :"text-gray-400 font-bold text-sm hover:bg-transpert hover:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Nearly Ended Subscription
              </ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform text-gray-300 ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className= {open===4 ? "p-0 bg-red-700 hover:bg-transpert" : "p-0 hover:bg-gray-800"} selected={open === 4}>
          
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
              </ListItemPrefix>
              <Typography  className="text-white mr-auto font-bold">
                Edit Information
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">

            <NavLink to="/dashboard/edit-personal-info">
            <ListItem className={location.pathname === "/dashboard/edit=personal-info" ?" text-red-600 font-bold text-sm  hover:text-red-600 hover:bg-transpert focus:bg-transpert focus:text-red-600" : "text-gray-400  font-bold text-sm hover:bg-transpert hover:text-red-600 focus:bg-transpert focus:text-red-600"}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Personal Information
              </ListItem>
              </NavLink>

              <NavLink to="/dashboard/edit-gym-info">
              <ListItem className={location.pathname === "/dashboard/edit-gym-info" ?" text-red-600 font-bold text-sm  hover:text-red-600 hover:bg-transpert focus:bg-transpert focus:text-red-600" : "text-gray-400  font-bold text-sm hover:bg-transpert hover:text-red-600 focus:bg-transpert focus:text-red-600"}>    
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Gym Information
              </ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>

        <hr className="my-4 mx-4 border-a border-gray-800" />

        <NavLink to="/dashboard/qr-code">
        <ListItem className="text-gray-300 font-bold hover:bg-transpert hover:text-red-600 focus:bg-transparent focus:text-red-600">
          <ListItemPrefix>
            <BsQrCode/>
          </ListItemPrefix>
          Gym QR Code
        </ListItem>
        </NavLink>

          <NavLink to="/dashboard/support">
        <ListItem className={location.pathname=== "/dashboard/support" ? "text-red-600 font-bold hover:bg-transparent hover:text-red-600  focus:bg-trasnpert focus:text-red-600 ":"text-gray-300 font-bold hover:bg-transpert hover:text-red-600 focus:bg-transparent focus:text-red-600"}>
          <ListItemPrefix>
            <BsEnvelopeExclamation/>
          </ListItemPrefix>
          Support
        </ListItem>
        </NavLink>
        
        <ListItem className="text-gray-300 font-bold hover:bg-transpert hover:text-red-600 focus:bg-red-600 focus:text-white"
        onClick={handelLogoutClick}>
          <ListItemPrefix>
          <BsPower/>
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      </div>
      <div>
      <ActiveMembers/>
      </div>
    </Card>
    {showModal && (
        <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg  py-6 px-10">
            <p className="text-2xl text-red-600 font-semibold mb-3">Logout</p>
            <p className="text-lg text-gray-600 font-semibold mb-3">Are you sure you want to logout?</p>

            <div className="flex justify-end">
              <button
                className="mr-4 px-4 py-2 text-gray-500 hover:text-red-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}