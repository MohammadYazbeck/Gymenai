import React, { useEffect, useState } from 'react';
import { exercises } from '../../../../assets/data/exercises.json';
import { NavLink } from 'react-router-dom';
import { useExerciseContext } from '../../../../Providers/ExerciseContext';
import apiService from '../../../../services/apiService';
import AuthService from '../../../../services/authService';
import Loader from '../../Loader';


interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string; // aka Email
  father_name: string;
  phone_number: string;
  national_id: string;
  otp: string
  isblacklisted: number | null;
}

interface Exercise{
id:number,
excercise_id:number,
sets:number,
reps:number,

}

interface Program{
  id:number,
  name:string,
  gym:number,
  coach: number,
  exercises: Exercise[],
  
}

interface Data{
user: User,
programs: Program[],
}



const GymMembersPrograms = () => {
  const { state, dispatch } = useExerciseContext();
  const [loader, setLoader] = useState(false);
  const [data , setData] = useState<Data[] | null >([]); 
  const [display, setDisplay] = useState(false);
  const [selectedProgramID,setSelectedProgramId]= useState(-1);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    state.selectedExercises.forEach(exerceise => {
                   dispatch({ type: 'REMOVE_EXERCISE', payload: exerceise.id });
                   
                 });
                 dispatch({
                   type: 'SET_MEMBER_INFO',
                   payload: {
                     memberId: -1,
                     memberFirstName: '',
                     memberLastName: '',
                   },
                 });
                 dispatch({
                   type: 'SET_PROGRAM_INFO',
                   payload: {
                     programName:  "",
                     programID:  -1,
                 }});
   }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
  
        // Make API call to fetch gym sections data with headers
        const response = await apiService.get(`memeber-progs?gym=${AuthService.getgymid()}`);
  
        if (response.status === 201 || response.status === 200) {
          // Check if the response is an array, if not, wrap it in an array
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          console.log('RESPONSE',response.data)
          console.log('Response Data:', responseData);
          setData(responseData);
          setDisplay(true);

        }
      } catch (error) {
        console.error('Error fetching gym sections:', error.response.data);
      } finally {
        setLoader(false); // Set loader to false regardless of success or error
      }
    };
  
    fetchData();
  }, []);
  // Helper function to group exercises by body part
  const groupExercisesByBodyPart = (programExercises: { id: number, excercise_id: number, sets: number,reps:number }[]) => {
    const groupedExercises = {};
    programExercises.forEach((programExercise: { id: number,excercise_id: number,sets: number,reps:number}) => {
      const exercise = exercises.find((e) => e.id === programExercise.excercise_id);
      if (exercise) {
        if (!groupedExercises[exercise.main_bodypart]) {
          groupedExercises[exercise.main_bodypart] = [];
        }
        groupedExercises[exercise.main_bodypart].push(programExercise);
      }
    });
  
    return Object.keys(groupedExercises).map((bodypart) => ({
      bodypart,
      exercises: groupedExercises[bodypart],
    }));
  };

  const handleRemoveClick = (programid :number) => {
    setSelectedProgramId(programid);
    setShowModal(true);
  };

  const handleCancel = () => {
    setSelectedProgramId(-1);
    setShowModal(false);
  };

  const handleRemove = async () => {
    setShowModal(false);
    setLoader(true);
    console.log(`Removing program with id ${selectedProgramID!}`);
    const deletedProgramId= selectedProgramID;
    try{
     const deleteResponse = await apiService.delete(`programs/${deletedProgramId}`);
     console.log(deleteResponse)
     if (deleteResponse.status === 204 || deleteResponse.status === 200){
      window.location.reload();
      setLoader(false);

     }

     if (deleteResponse.status !== 204 && deleteResponse.status !== 200){
      setLoader(false);
      console.log('Respnse ERror')
     }


    } catch (error){
      console.log('Error',error);
      setLoader(false);
    }
    setSelectedProgramId(-1);
  };
  

  return (
    <>
       {loader ? <Loader/> :""}  
      <div className="w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem] top-0">
        <h2 className="text-2xl font-semibold text-red-600">Gym Members Programs</h2>
        <p className="text-gray-600 mt-2">List of all gym members and their programs</p>
      </div>


      <div className="container mx-auto px-4 ml-[34rem] mt-[14rem]">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {display && data && Array.isArray(data) && data.map((member) => (
            <div key={member.user.id} className="bg-transpert rounded-md overflow-hidden shadow-md border-red-900 mb-8">
              <div className=" p-6 bg-gray-300 flex flex-col">
                <h3 className=" text-3xl font-bold text-red-600 mb-4">
                  {member.user.first_name} {member.user.last_name}
                </h3>
                <div>
                <p className='font-bold text-lg'><strong className='font-semibold text-gray-700 text-lg'>Email: </strong>{member.user.username}</p>
                <p className='font-bold text-lg'><strong className='font-semibold text-gray-700 text-lg'>Phone Number: </strong>{member.user.phone_number}</p>
                </div>
              </div>

              <div className="border-t border-gray-800 p-9">
                {member.programs && Array.isArray(member.programs) && member.programs.length > 0 && member.programs.map((memberprogram) => {
                  // const program = programs.find((p) => p.program_id === programID);
                  return (
                    <div key={memberprogram.id} className="text-gray-600 mt-4">
                      <p className='mb-4 text-lg'>
                        Program:
                        <strong className='text-xl text-red-600'> {memberprogram.name}</strong>
                      </p>
                      {groupExercisesByBodyPart(memberprogram.exercises).map((group) => (
                        <div key={group.bodypart}>
                          <p>
                            <strong className='text-lg text-gray-500'>
                              {group.bodypart === "arms" ? "Arms" :
                              group.bodypart === "legs" ? "Legs" :
                              group.bodypart === "chest" ? "Chest" :
                              group.bodypart === "shoulders" ? "Shoulders" :
                              group.bodypart === "back" ? "Back" : ""
                              }
                              :
                            </strong>
                          </p>
                          <ul>
                            {group.exercises.map((programExercise: { id: number,excercise_id: number,sets: number,reps:number}) => {
                              const exercise = exercises.find((e) => e.id === programExercise.excercise_id);
                              return (
                                <li key={exercise?.id} className='mb-1'>
                                  <strong>{exercise?.name} (Sets: {programExercise.sets} Reps: {programExercise.reps}) </strong>- {exercise?.description}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}


                      <div className="flex mt-6 mb-14">
                        <NavLink to="/dashboard/gym-members-programs/edit-program">
                        <button className="text-gray-400 font-bold border border-gray-700 px-4 py-2 mr-2 rounded-md hover:border-red-900 hover:text-red-600 transition duration-300"
                          onClick={() => {
                            dispatch({
                              type: 'SET_MEMBER_INFO',
                              payload: {
                                memberId: member.user.id,
                                memberFirstName: member.user.first_name,
                                memberLastName: member.user.last_name,
                              },
                            });
                            dispatch({
                              type: 'SET_PROGRAM_INFO',
                              payload: {
                                programName: memberprogram?.name || "",
                                programID: memberprogram?.id || 0,
                            }});
                            memberprogram?.exercises.forEach((programExercise) => {
                              const exercise = exercises.find((e) => e.id === programExercise.excercise_id);
                              dispatch({
                                type: 'ADD_EXERCISE',
                                payload: {
                                  id: exercise?.id || 0,
                                  name: exercise?.name || "",
                                  reps: programExercise.reps,
                                  sets: programExercise.sets,
                                },
                              });
                            });
                          }}>
                          Edit Program
                        </button>
                        </NavLink>
                        
                        <button className="ml-4 font-bold bg-red-600 text-white border border-gray-700 px-4 py-1 mr-2 rounded-md hover:text-red-600 hover:bg-gray-200 hover:border-gray-200 transition duration-300"
                          onClick={()=>{handleRemoveClick(memberprogram.id)}}>
                          Remove Program
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex mt-2 mb-8 justify-end mr-10">
              <NavLink to="/dashboard/gym-members-programs/create-program">
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'SET_MEMBER_INFO',
                        payload: {
                          memberId: member.user.id,
                          memberFirstName: member.user.first_name,
                          memberLastName: member.user.last_name,
                        },
                      });
                    }}
                    className="bg-green-500 font-bold text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Create New Program
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Remove Program</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Are you sure you want to remove this program ?</p>
                <div className="flex justify-end">
                  <button
                    className="mr-4 px-4 py-2 text-gray-500 hover:text-red-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  );
};



export default GymMembersPrograms;
