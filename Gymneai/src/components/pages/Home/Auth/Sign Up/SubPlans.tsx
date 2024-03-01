// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// export default function SubPlans() {

//   const [selectedPlan, setSelectedPlan] = useState(-1);
//   const handleSelectPlan = (planId: React.SetStateAction<number>) =>{
//     setSelectedPlan(planId);
//   };

//   return (
//     <div className="mb-[13rem] mt-32 text-gray-500 font-bold px-44 lg:px-80 text-center">
//       <h1 className="mb-10">Subscription Plans</h1>

//       <div className="flex space-x-5 mt-5">
//         {/* Plan 1: $18/month */}
//         <div
//           className={`mt-4 flex-1 border-t border-l  border-gray-800 p-8 rounded-md text-white hover:border-red-600 lg:h-[30rem] ${
//             selectedPlan === 1 ? "border-red-600" : ""
//           }`}
//           onClick={() => handleSelectPlan(1)}
//         >
//           <h2 className="text-3xl text-red-600 font-semibold mb-4">Basic Plan</h2>
//           <p className="text-xl text-gray-400 mb-4">$18/month</p>
//           <p className="text-lg">Access to basic features</p>
//           <div className="text-gray-500 text-left text-lg py-10 ml-14">
//           <p>- Members Management</p>
//           <p>- Employees Management</p>
//           <p>- Gym Managementt</p>
//           <p>- Keep track on Employees log</p>
//           <p>- 8 Gym Sections </p>
//           <p>- 1 Reception Employees </p>
//           <p>- 3 Coach Employees </p>
//           </div>


//         </div>

//         {/* Plan 2: $79/6-months (Highlighted) */}
//         <div
//           className={`flex-1 bg-red-600 border-x border-t border-gray-600 p-8 rounded-md text-white shadow-lg  hover:border-white lg:h-[35rem] ${
//             selectedPlan === 2 ? "border-white" : ""
//           }`}
//           onClick={() => handleSelectPlan(2)}
//         >
//           <h2 className="text-4xl text-white font-semibold mb-4">Premium Plan</h2>
//           <p className="text-xl mb-4 text-gray-300">$79/6 months</p>
//           <p className="text-lg text-gray-400">Unlock advanced features</p>
//           <div className="text-black text-left text-lg py-10 ml-14">
//           <p>- Members Management</p>
//           <p>- Employees Management</p>
//           <p>- Gym Managementt</p>
//           <p>- Keep track on Employees log</p>
//           <p>- 12 Gym Sections </p>
//           <p>- 2 Reception Employees </p>
//           <p>- 5 Coach Employees </p>
//           </div>
//         </div>

//         {/* Plan 3: $145/year */}
//         <div
//           className={`mt-4 flex-1  border-t border-r border-gray-800 p-8 rounded-md text-white hover:border-red-600 lg:h-[30rem] ${
//             selectedPlan === 3 ? "border-red-600" : ""
//           }`}
//           onClick={() => handleSelectPlan(3)}
//         >
//           <h2 className="text-3xl text-red-600 font-semibold mb-4">Ultimate Plan</h2>
//           <p className="text-xl text-gray-400 mb-4">$145/year</p>
//           <p className="text-lg">Access to all features</p>
//           <div className="text-gray-500 text-left text-lg py-10 ml-14">
//           <p>- Members Management</p>
//           <p>- Employees Management</p>
//           <p>- Gym Managementt</p>
//           <p>- Keep track on Employees log</p>
//           <p>- 16 Gym Sections </p>
//           <p>- 4 Reception Employees </p>
//           <p>- 10 Coach Employees </p>
//           </div>



//         </div>
//       </div>

//       <div className="flex justify-end mt-32">

//         {/* Skip Button */}
//         <NavLink to="/home/sign-up/gym-info">
//           <button className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring focus:border-blue-300">
//             Next
//           </button>
//         </NavLink>
//       </div>
//     </div>
//   );
// }
