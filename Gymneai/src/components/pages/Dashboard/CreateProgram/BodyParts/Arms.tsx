import { NavLink,} from "react-router-dom";
import Exercise from "../Exercise";
import exercises from '../../../../../assets/data/exercises.json'

export default function Arms() {
  const armExercises = exercises.exercises.filter(exercise => exercise.main_bodypart === 'arms');
  return (
    <>
    <div className="flex items-center ml-[30rem] mt-24 fixed" >
     <div>
     <h1 className="text-4xl text-red-600 font-bold mb-3"> Arms  Exercises </h1>
     <h2 className="text-lg text-gray-500 font-bold"> Please Select 3 Arms  Exercises </h2>
     </div>  
    </div>
    <div className="w-full flex flex-row text-left ml-[30rem] mt-28">
    {armExercises.map((exercise, index) =>(
      <Exercise 
       id={exercise.id}
       key={index}
       name={exercise.name}
       image={exercise.image} 
       description={exercise.description} 
       ai={exercise.ai_supported}
       />
    ))
    }    
    </div>

    <div className="fixed left-[120rem] top-[64rem]">
            <NavLink to="../chest">
                <button
                type="submit"
                className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Next
                </button>
           </NavLink>
     </div> 
    </>
  );
  }
