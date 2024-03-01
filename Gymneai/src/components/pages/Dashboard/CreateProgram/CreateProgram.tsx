import { NavLink } from "react-router-dom";
import { useExerciseContext } from '../../../../Providers/ExerciseContext';


export default function CreateProgram() {
  const { state, dispatch } = useExerciseContext();
  console.log(state)
  return (
    <div className="mt-60 ml-60 flex flex-col items-center">
      <h1 className="mb-12 text-4xl text-red-600 font-bold">
        {location.pathname === "/dashboard/gym-members-programs/create-program" ?"Creating": location.pathname==="/dashboard/gym-members-programs/edit-program"? "Updating" :""} a Program For  
        
        
        <strong className="font-bold text-gray-500">  {state.memberInfo.memberFirstName}  {state.memberInfo.memberLastName}</strong></h1>
      <ul className="">
        <li className="list-disc text-xl text-gray-200 font-bold mb-4">Select exercises for the Trainee</li>
        <li className="list-disc text-xl text-gray-200 font-bold mb-4">Save the information</li>
        {location.pathname === "/dashboard/gym-members-programs/create-program" ? <li className="list-disc text-xl text-gray-400 font-bold mb-4">Or  <NavLink to="/dashboard/gym-members-programs/written-programs"> <strong className="text-gray-500 font-bold hover:text-red-600 text-lg">  Choose Written Program</strong></NavLink> </li>
        :""}
         
      </ul>
      <NavLink to="arms">
        <button
            type="submit"
            className=" mt-24 ml-[32rem] w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Start
          </button>
          </NavLink>
    </div>
  );
}
