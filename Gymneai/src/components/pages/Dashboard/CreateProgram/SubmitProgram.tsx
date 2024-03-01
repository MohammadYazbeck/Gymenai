import React, { FormEvent, useState } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { useExerciseContext } from '../../../../Providers/ExerciseContext'; // Update the path accordingly
import AuthService from "../../../../services/authService";
import apiService from "../../../../services/apiService";
import Information from "../../../../services/informationService";
import Loader from "../../Loader";

interface Exercise{
  excercise_id: number,
  sets: number,
  reps: number
}

export default function SubmitProgram() {
  const { state , dispatch } = useExerciseContext(); // Access selected exercises from the context
  const [programName,setProgramName] = useState(state.programName || "");
  const [loader,setLoader] = useState(false);
  const [success,setSuccess] = useState(false);
  const navigate = useNavigate();
  // console.log(state.selectedExercises);
  let exerceises :Exercise[]= []; 

console.log(state.programName);
  const handleInputChange = (program_name: React.SetStateAction<string>) => {
    setProgramName(program_name);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('aaa',state.memberInfo);
    setLoader(true);
  
   
    // GYM ID 
        const gymid= (AuthService.getgymid());
         console.log('gymid',gymid);

    // COACH ID
        const storedUserData = Information.getPersonalInformation();
        const decodedData=atob(storedUserData!);
        const personalformation = JSON.parse(decodedData);
        const coachid= personalformation?.id || -1 ;

    console.log('coach id ',coachid);
        
    // Exercise list

    const newExercises = state.selectedExercises.map(exercise => ({
      excercise_id: exercise.id,
      sets: exercise.sets,
      reps: exercise.reps
    }));

    exerceises = newExercises;
    console.log('Adding PROGRAM NAME INFO ..');
    console.log('name',programName);
    console.log('gymid',gymid);
    console.log('coach',coachid);
    console.log('EXERCIES',newExercises);

    


    if (location.pathname === "/dashboard/gym-members-programs/create-program/submit-program" || location.pathname === "/dashboard/gym-members-programs/written-programs/submit-program"){
    if (exerceises){
      try {
            const response = await apiService.post(
              'programs/add/',
             {
              "name": programName,
              "gym": gymid,
              "coach": coachid,
              "excer_list": exerceises
             },
              {
                headers: {
                  Authorization: `Bearer ${AuthService.getAccessToken()}`
                }
              }
            );

            console.log(response.data)
  
            // Check the response status of the third API call
            if (response.status === 200 || response.status === 201) {
               console.log(response.data);
               console.log(response.data.id);
               const memberid= state.memberInfo.memberId; 
               const programid= response.data.id;


               console.log('PROGRAM TO MEBER REQUEST INFO ..');
               console.log('Member id',memberid);
               console.log('program id',programid);
               console.log('gym id',gymid);

               const response2 = await apiService.post(
                'memeber-progs/add/',
               {
                "memeber":memberid,
                "program":programid,
                "gym":gymid
               },
                {
                  headers: {
                    Authorization: `Bearer ${AuthService.getAccessToken()}`
                  }
                }
              );

              if (response2.status === 200 || response2.status === 201) {
                console.log(response2.data);
                console.log(response2.data.id);

              setLoader(false);
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
              setSuccess(true);

            }
          }}
        catch (error) {
        // Display a general error message or handle errors as needed
        console.error('Form submission failed. Please check the form for errors.', error);
        setLoader(false);

      }
  }} else if (location.pathname === "/dashboard/gym-members-programs/edit-program/submit-program"){
  try {
    const programID = state.programID;
    const response = await apiService.put(
      `programs/update/${programID}`,
     {
      "name": programName,
      "gym": gymid,
      "coach": coachid,
      "excer_list": exerceises
     },
      {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`
        }
      }
    );

    console.log(response.data)

    // Check the response status of the third API call
    if (response.status === 200 || response.status === 201) {
       console.log(response.data);
       console.log(response.data.id);
       console.log('Program Edited ');

      setLoader(false);
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
      setSuccess(true);

  }}
catch (error) {
// Display a general error message or handle errors as needed
console.error('Form submission failed. Please check the form for errors.', error);
setLoader(false);

}}
};

  return (
    <>
    {loader ? <Loader/> : ""}
    <div className="mt-40 ml-60 flex flex-col items-center text-center">
      <h1 className="mb-2 text-3xl text-gray-300 font-bold">Program Created!</h1>
      <h1 className="mb-10 text-lg text-gray-600 font-bold">Make Sure You have selected all the wanted exerceises</h1>
      
      {/* Output The SELECTED exercises here */}
      <div className="mb-16">
        {state.selectedExercises.length === 0 ? (
          <p className="text-gray-500">No exercises selected yet.</p>
        ) : (
          <ul className="list-disc text-left text-gray-500">
            {state.selectedExercises.map((exercise, index) => (
              <li key={index}>{exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}</li>
            ))}
          </ul>
        )}
      </div>
      <Form>
      <div className="sm:col-span-3 mb-5 mt-5">
                <label htmlFor="program_name" className="block text-md font-medium leading-6 text-gray-400">
                  Program Name 
                </label>
                <div className="mt-4">
                  <input
                    type="text"
                    id="program_name"
                    value={programName}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                </div>
              </div>
     
      <NavLink to="">
        <button
          type="submit"
          className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring focus:border-red-600"
          onClick={handleSubmit}
        
        >
          Save
        </button>
      </NavLink>
      </Form>
    </div>
    {success && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Success</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Program Added</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setSuccess(false)
                      navigate('/dashboard/gym-members-programs');
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  );
}
