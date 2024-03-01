import React, { ChangeEvent, FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../../../../Providers/EmployeeContext';
import AuthService from '../../../../services/authService';
import apiService from '../../../../services/apiService';
import Loader from '../../Loader';

const EditRoleEmployee: React.FC = () => {
  const { state, dispatch } = useEmployeeContext();
  const [loader,setLoader] = useState(false);
  const [success,setSuccess] = useState(false);
  const [showError,setShowError] = useState(false);
  const [errorDetails,setErrorDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    firstName: state?.first_name || '',
    lastName: state?.last_name || '',
    photo: state?.photo || null,
    fatherName: state?.father_name ||'',
    location: state?.location || '',
    nationalId: state?.national_id || '',
    position: state?.position || '',
    phoneNumber: state?.phone_number || '',
    reception: state?.reception || false,
    coach: state?.coach || false,
    email: state?.coach === true ? state.coach_data?.email! || '' : state?.reception_data?.email! || '',
    password: state?.coach === true ? state.coach_data?.password! || '' : state?.reception_data?.password! || '',
    salary: state?.salary || 0,
    shift: state?.shift || '',
    
  });

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  validateField(name, value);
};


  const validateField = (name: string, value: string | File | File[] ) => {
    // Perform validation for the specific field
    let errorMessage = '';

    if (typeof value === 'string') {
      if (name === 'firstName' && (!value.trim() || value.length < 3)) {
        errorMessage = 'First Name must not be empty or less than 3 letters';
      }

      if (name === 'lastName' && (!value.trim() || value.length < 3)) {
        errorMessage = 'Last Name must not be empty or less than 3 letters';
      }

      if (name === 'fatherName' && (!value.trim() || value.length < 3)) {
        errorMessage = 'Last Name must not be empty or less than 3 letters';
      }

      if (name === 'position' && (!value.trim() || value.length < 3)) {
        errorMessage = 'Position must not be empty or less than 3 letters';
      }

      if (name === 'location' && (!value.trim() || value.length < 5)) {
        errorMessage = 'Location must not be empty or less than 5 letters';
      }

      if (name === 'shift' && (!value.trim() || value.length < 5)) {
        errorMessage = 'Shift must not be empty or less than 5 letters';
      }
    
      if (name === 'nationalID') {
        const isNumeric = !isNaN(Number(value));
        const hasMinimumLength = value.length >= 6;

        if (!isNumeric || !hasMinimumLength) {
          errorMessage = 'National ID must be numeric and have a minimum length of 6';
        }
      }

      if (name === 'phoneNumber') {
        const isNumeric = !isNaN(Number(value));
        const hasMinimumLength = value.length >= 9;

        if (!isNumeric || !hasMinimumLength) {
          errorMessage = 'Phone Number must be numeric and have a minimum length of 9';
        }
      }

      if (name === 'salary') {
        const isNumeric = !isNaN(Number(value));
        const hasMinimumLength = value.length >= 4;

        if (!isNumeric || !hasMinimumLength) {
          errorMessage = 'Salary must be numeric and have a minimum length of 4';
        }
      }
   
    }
    // Add more validation for other fields as needed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const hasNullEmptyValues = Object.entries(employeeData).some(
      ([ value]) =>
        (value === null || (typeof value === 'string' && !value.trim()))
    );
  
    // Check if there are any errors before submitting
    if (hasNullEmptyValues) {
      console.log('FORM ERROR ', 'FILL ALL THE FIELDS !!');
      return; // Stop further processing if there are errors
    }
  
    try {
      setLoader(true);
 
      const response = await apiService.put(`roleemp/${state?.id}/`,{
        "first_name":employeeData.firstName,
        "last_name":employeeData.lastName,
        "father_name":employeeData.fatherName,
        "phone_number":employeeData.phoneNumber,
        "national_id":employeeData.nationalId,
        "position":employeeData.position,
        "shift":employeeData.shift,
        "salary":employeeData.salary,
        "location":employeeData.location,

      }, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        setLoader(false);
        setSuccess(true);
      }
    } catch (error) {
      setLoader(false);
      setShowError(true);
      setErrorDetails('Connection Failed');
      console.log('ERROR', error);
    }
  };
  
  return (
    <>
      {loader ? <Loader/> : ""}
      <form className="lg:w-full">
        <div className="ml-60 space-y-12 px-20 mt-28 lg:pl-60">
          <div className="pb-12">
            <h2 className="font-semibold leading-7 text-red-600 text-2xl">Edit Employee Info</h2>
            <p className="mt-1 text-mm leading-6 text-gray-600">
              Please provide new information about the employee
            </p>
            {Object.values(errors).every((error) => !error) ? (
                  ""
                ) : (
                  <div>
                    {Object.values(errors).map((error, index) => (
                      <p key={index} className="mt-1 text-mm text-red-600 ">
                        {error}
                      </p>
                    ))}
                  </div>
                )}

            <div className="mt-20 pb-14 border-b border-gray-400/10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <p className="text-lg leading-6 text-gray-400 pb-8 font-bold">Employee Information</p>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-md font-medium leading-6 text-gray-400">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={employeeData.firstName}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-md font-medium leading-6 text-gray-400">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={employeeData.lastName}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              
              <div className="sm:col-span-3">
                <label htmlFor="fatherName" className="block text-md font-medium leading-6 text-gray-400">
                  Father Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={employeeData.fatherName}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-md font-medium leading-6 text-gray-400">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={employeeData.location}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}

                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="nationalId" className="block text-md font-medium leading-6 text-gray-400">
                  National ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="nationalId"
                    name='nationalId'
                    value={employeeData.nationalId}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}

                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="position" className="block text-md font-medium leading-6 text-gray-400">
                  Position
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={employeeData.position}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}

                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phoneNumber" className="block text-md font-medium leading-6 text-gray-400">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={employeeData.phoneNumber}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}

                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="shift" className="block text-md font-medium leading-6 text-gray-400">
                  Shift
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="shift"
                    name="shift"
                    value={employeeData.shift}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}

                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="salary" className="block text-md font-medium leading-6 text-gray-400">
                  Salary
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={employeeData.salary}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                    onChange={handleInputChange}

                  />
                </div>
              </div>
              </div>
            </div>
          </div>

        <div className="px-20 lg:px-60 mb-14 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handelSubmit}
          >
            Save
          </button>
        </div>
      </form>
      {showError && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Error!</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">{errorDetails}</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setShowError(false)
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

{success && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Success</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Employee Updated</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setSuccess(false)
                      setEmployeeData({
                        firstName: '',
                        lastName:'',
                        fatherName:'',
                        photo: null,
                        location: '',
                        nationalId: '',
                        position: '',
                        phoneNumber: '',
                        reception: false,
                        coach: false,
                        email: '',
                        password:'',
                        salary: -1,
                        shift:'',
                      });
                      navigate('/dashboard/role-employees');
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
};

export default EditRoleEmployee;
