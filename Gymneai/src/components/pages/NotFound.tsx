import { NavLink } from 'react-router-dom';
import '../../assets/style.css';
import { Typography } from '@material-tailwind/react';

function NotFound() {
  return (
    <div className='flex flex-col items-center mt-[20vh]'>
            <NavLink to="/home">
          <Typography
            className="text-gray-600 py-16 px-20 font-bold text-3xl  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white"
          >
            GymenAi
          </Typography>
          </NavLink>
      <h1 className="text-red-600 text-6xl mb-10">
        404 Page Not Found :(
      </h1>
      <h3 className='text-gray-300 text-xl'>
        Return to   <NavLink to="/home"><strong className='hover:text-red-600'> Home Page </strong></NavLink> 
      </h3>


    </div>
  );
}

export default NotFound;
