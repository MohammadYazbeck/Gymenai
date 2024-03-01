import React, { useState, useEffect } from 'react';
import { useExerciseContext } from '../../../../Providers/ExerciseContext';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

interface ExerciseProps {
  id: number;
  name: string;
  image: string;
  description: string;
  ai: boolean;
}

const Exercise: React.FC<ExerciseProps> = ({ id, name, image, description, ai }) => {
  const { state, dispatch } = useExerciseContext();

// Get previous sets and reps 
 
  let oldReps=0;
  let oldSets=0;

  state.selectedExercises.forEach(exercise => {
    if(exercise.id===id){
      oldReps=exercise.reps;
      oldSets=exercise.sets;
    }
  });
 
  const [reps, setReps] = useState(oldReps);
  const [sets, setSets] = useState(oldSets);


  const [showDetails, setShowDetails] = useState(false);

  // Get Previuos Selected 
  const isSelectedBefore = state.selectedExercises.some(exercise => exercise.id === id ? true : false )
  const [selected, setSelected] = useState(isSelectedBefore);

  
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSelected = () => {
    setSelected(prevSelected => !prevSelected);

    // Notify context about the selection
    if (!selected) {
      dispatch({ type: 'ADD_EXERCISE', payload: { id, name, reps, sets } });
    } else {
      dispatch({ type: 'REMOVE_EXERCISE', payload: id });
    }
    console.log(state.selectedExercises)
  };

  return (
    <div className="w-[43rem] px-20 lg:pl-20 space-y-12 mt-28 relative">
      <div className="pb-12">
          <div className={selected ? "mt-10 border-2 rounded-2xl border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-2 focus:ring-inset focus:ring-red-600 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6 bg-gray-900" : "mt-10 border border-gray-800 rounded-2xl hover:border-red-600 focus:border-red-600 focus:ring-2 focus:ring-inset focus:ring-red-600 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6 bg-gray-900"}>

            <div className="sm:col-span-6">
              {/* Display the image at the top */}
              <img src={image} alt={name} className="w-full h-100 object-cover rounded-t-2xl" />
            </div>

            <div className="sm:col-span-5 ml-5">
              {/* Display the name and description at the bottom */}
              <div className="text-left ml-1 text-xl text-red-600 font-bold mb-4">{name} {ai === true ? <strong className="text-center ml-3 border-2 border-gray-600 rounded-xl w-5 px-2  text-sm text-gray-500 font-bold mb-4">AI Supported</strong> : ""}

              </div>
            </div>

            <div className="sm:col-span-3 ml-5">
              {/* Fields for handling numbers (reps and sets) */}
              <label htmlFor="exercise-sets" className="block text-md font-medium leading-6 text-gray-400">
                Sets
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="exercise-sets"
                  id="exercise-sets"
                  value={sets}
                  onChange={(e) => { setSets(parseInt(e.target.value,10)); setSelected(false)}}
                  placeholder="Sets"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold" />
              </div>
            </div>

            <div className="sm:col-span-3 mr-5">
              <label htmlFor="exercise-reps" className="block text-md font-medium leading-6 text-gray-400">
                Reps
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="exercise-reps"
                  id="exercise-reps"
                  value={reps}
                  onChange={(e) => {setReps(parseInt(e.target.value,10)); setSelected(false)}}
                  placeholder="Reps"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold" />
              </div>
            </div>

            <div className="sm:col-span-3 mb-4">
              <button
                type="button"
                onClick={handleToggleDetails}
                className={!showDetails ? "text-md font-semibold leading-6 text-white hover:text-red-600 ml-3 mt-2 " : "text-md font-semibold leading-6 text-red-600 ml-3 mt-2"}
              >
                {showDetails ? '-' : '+'} Description
              </button>
            </div>
            
            <div className="sm:col-span-3 mb-4 py-2 ml-[12rem]">
            <input
             className='form-checkbox h-5 w-5 text-red-600 focus:ring focus:ring-gray-900 rounded'
              type="checkbox"
              checked={selected}
              onChange={()=>handleSelected()}
            />

            </div>

            {showDetails && (
            <div className="sm:col-span-6 mb-4 ">
                <p className="text-lg px-5 text-left text-gray-400 mb-4">{description}</p>
                </div>
            )}


          </div>
      </div>
    </div>
  );
}

export default Exercise;
