// @ts-nocheck
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,

} from "@material-tailwind/react";
import {BsPower} from "react-icons/bs";
import { NavLink ,useNavigate} from "react-router-dom";
import { useState } from "react";
import ActiveMembers from "../ActiveMembers";
import AuthService from "../../../../services/authService";
export function Dashboard_SidebarCoach() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const gymMembersProgramPaths = [
    '/dashboard/gym-members-programs',
    '/dashboard/gym-members-programs/create-program',
    '/dashboard/gym-members-programs/create-program/arms',
    '/dashboard/gym-members-programs/create-program/chest',
    '/dashboard/gym-members-programs/create-program/shoulders',
    '/dashboard/gym-members-programs/create-program/back',
    '/dashboard/gym-members-programs/create-program/submit-program',
    '/dashboard/gym-members-programs/create-program/legs',
    '/dashboard/gym-members-programs/edit-program',
    '/dashboard/gym-members-programs/edit-program/arms',
    '/dashboard/gym-members-programs/edit-program/chest',
    '/dashboard/gym-members-programs/edit-program/shoulders',
    '/dashboard/gym-members-programs/edit-program/back',
    '/dashboard/gym-members-programs/create-program/submit-program',
    '/dashboard/gym-members-programs/edit-program/legs',
  ];

  const isActivePath = gymMembersProgramPaths.some(path => location.pathname.includes(path));
  const listItemClassName = isActivePath
  ? "text-white bg-red-600 font-bold text-base hover:bg-red-600 hover:text-white  focus:bg-red-600 focus:text-white"
  : "text-gray-400 font-bold text-base hover:bg-red-600 hover:text-white  focus:bg-red-600 focus:text-white";

  const handelLogoutClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };


  const handleLogout = () => {
    setShowModal(false);
    AuthService.clearTokens();
    navigate('/home')
 
  };

  return (
    <>
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4  bg-[#222222] fixed z-30 flex flex-col justify-between pb-[4rem]">
      <div>
      <div className="mb-4 p-4 flex items-center">
      <NavLink to="/home">
        <div className='flex center'>
      {/* <img className="w-[3rem] h-[3rem]"src="/src/assets/images/logo.png" alt="" /> */}
      <Typography variant="h5" className="cursor-pointer text-red-600 ml-2 mt-1 px-1 font-bold text-2xl">
        GymneAi
      </Typography>
      </div>
      </NavLink>
      <p className="cursor-pointer  text-gray-500 font-bold text-sm">Coach</p>
    </div>

      <List >        
            <List className="p-0">
              <NavLink to="gym-members-programs">
              <ListItem  className={listItemClassName}>
                <ListItemPrefix>
                </ListItemPrefix>
                Gym Memebrs Program
              </ListItem>
              </NavLink>
            </List>
        
        

        <hr className="my-4 mx-4 border-a border-gray-800" />
      
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