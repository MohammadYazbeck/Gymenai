import React, { useEffect, useState } from 'react';
import { writtenPrograms } from '../../../../assets/data/writtenPrograms.json';
import { exercises } from '../../../../assets/data/exercises.json';
import { useExerciseContext } from '../../../../Providers/ExerciseContext';
import Exercise from './Exercise';
import { useNavigate } from 'react-router-dom';

interface Exercise {
  id: number;
  name: string;
  main_bodypart: string;
  sets: number;
  reps: number;
}

interface WrittenProgram {
  id: number;
  name: string;
  exercises: Exercise[];
}

const WrittenPrograms = () => {
  const { state, dispatch } = useExerciseContext();
  const navigate = useNavigate();
  const [finalWrittenPrograms, setFinalWrittenPrograms] = useState<WrittenProgram[]>([]);
  const selectedExercises= state.selectedExercises;    

  useEffect(() => {

  selectedExercises.forEach(exercise => {
    dispatch({
      type: 'REMOVE_EXERCISE',
      payload: exercise.id
    });
  });


  dispatch({
    type: 'SET_PROGRAM_INFO',
    payload:{
      programName: '',
      programID:-1,
    }
  });

    const updatedPrograms = writtenPrograms.map((program) => {
      let programExercises: Exercise[] = [];
  
      program.exercises.forEach((exercise) => {
        exercises.forEach((dataExercise) => {
          if (exercise.exerciseId === dataExercise.id) {
            programExercises.push({
              id: dataExercise.id,
              name: dataExercise.name,
              main_bodypart: dataExercise.main_bodypart,
              reps: exercise.reps,
              sets: exercise.sets,
            });
          }
        });
      });
  
      return {
        id: program.id,
        name: program.name,
        exercises: programExercises,
      };
    });
  
    setFinalWrittenPrograms(updatedPrograms);
  }, []);
  
 

  console.log(finalWrittenPrograms);
  return (
    <> 
    <div className="w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem] top-0">
    <h2 className="text-2xl font-semibold text-red-600">Gym Members Programs</h2>
    <p className="text-gray-600 mt-2">List of all gym members and their programs</p>
   </div>
    <div className="mt-60 ml-[30rem] mr-[10rem]">
      {finalWrittenPrograms.map(program => (
        <div key={program.id} className="bg-transparent rounded-md overflow-hidden shadow-md border-red-900 mb-20">
          <div className="p-6 w-full h-[10rem] flex items-center bg-[url('assets/images/5555.jpg')]">
            <h3 className="text-4xl font-bold text-red-600 mb-2">{program.name}</h3>
          </div>
          <div className="border-t border-gray-800 p-9">
           <strong className='font-bold text-gray-600 text-lg'> Exercises</strong>
            {program.exercises.map((exercise, index) => (
              
              <div key={index} className="text-gray-600 mt-4">
                <ul>
                  <li className='mb-[1.4rem]'>
                    <p className='font-bold text-gray-400 text-xl flex'>{exercise.name} <p className='ml-2 text-gray-600'> - {exercise.main_bodypart}</p></p><p className='text-red-400 font-bold text-xl'>Sets: {exercise.sets} Reps: {exercise.reps} </p> 
                  </li>
                </ul>
              </div>
            ))}
            <div className="flex justify-end mt-16 mb-10">
              <button
                className="bg-red-600 text-white px-4 py-2 mr-2 rounded-md hover:bg-red-900 transition duration-300"
                onClick={() => {
                  dispatch({
                    type: 'SET_PROGRAM_INFO',
                    payload: {
                      programName: program.name,
                      programID: -1
                    },
                  });
                  program.exercises.forEach(exercise => {
                    dispatch({
                      type: 'ADD_EXERCISE',
                      payload: {
                        name: exercise.name,
                        id: exercise.id,
                        reps: exercise.reps,
                        sets: exercise.sets,
                      },
                    });
                  });
                  navigate('/dashboard/gym-members-programs/written-programs/submit-program')
                }}
              >
                Select Program
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default WrittenPrograms;
