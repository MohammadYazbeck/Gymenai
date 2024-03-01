import React, { ChangeEvent, FormEvent, useState } from 'react';
import Loader from '../../Loader';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../../services/apiService';
import AuthService from '../../../../services/authService';

interface EmployeeData {
  firstName: string;
  lastName: string;
  fatherName:string;
  photo: File | null;
  location: string;
  nationalId: string;
  position: string;
  phoneNumber: string;
  reception: boolean;
  coach: boolean;
  normalemp: boolean
  email: string;
  password: string;
  salary: string;
  shift: string;
}

const AddEmployee: React.FC = () => {
  const [loader,setLoader] = useState(false);
  const [success,setSuccess] = useState(false);
  const [showError,setShowError] = useState(false);
  const [errorDetails,setErrorDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    fatherName:'',
    photo: null,
    location: '',
    nationalId: '',
    position: '',
    phoneNumber: '',
    reception: false,
    coach: false,
    normalemp:true,
    email: '',
    password: '',
    salary: '',
    shift: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;

      if (name === 'photo') {
        const selectedphoto = files && files.length > 0 ? files[0] as File : null;
        setEmployeeData((prevEmployeeData) => ({
          ...prevEmployeeData,
          [name]: selectedphoto,
        }));
      }
    } else {
      setEmployeeData((prevEmployeeData) => ({
        ...prevEmployeeData,
        [name]: value,
      }));
    }
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

      if (name === 'FatherName' && (!value.trim() || value.length < 3)) {
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

      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(value)) {
          errorMessage = 'Invalid email address';
        }
      }
  
      if (name === 'password') {
        const hasMinimumLength = value.length >= 5;
  
        if (!hasMinimumLength) {
          errorMessage = 'Password must have a minimum length of 5';
        }
      }
    }

    if (name === 'photo' && (!value || (value instanceof File && !value.name))) {
      errorMessage = 'Photo must not be empty';
    }
    
    // Add more validation for other fields as needed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleCheckboxChangeReception = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      reception: true,
      coach: false,
      normalemp:false,
      email: '', // Reset email when reception checkbox changes
      password: '', // Reset password when reception checkbox changes
    }));
  };

  const handleCheckboxChangeNormalEmp = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      normalemp: true,
      coach: false,
      reception:false,
      email: '', // Reset email when reception checkbox changes
      password: '', // Reset password when reception checkbox changes
    }));
  };

  const handleCheckboxChangeCoach = () => {
    setEmployeeData((prevData) => ({
      ...prevData,
      coach: true,
      reception: false,
      normalemp:false,
      email: '', // Reset email when coach checkbox changes
      password: '', // Reset password when coach checkbox changes
    }));
  };

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const hasNullEmptyValues = Object.entries(employeeData).some(
      ([key, value]) => {
        if (key === 'photo' && (employeeData.coach || employeeData.reception)) {
          // Allow null for photo if coach or reception is true
          return false;
        }
    
        if (key === 'fatherName' && !employeeData.coach && !employeeData.reception) {
          // Allow empty fatherName only if normal employee
          return false;
        }
    
        if ((key === 'email' || key === 'password') && !employeeData.coach && !employeeData.reception) {
          // Allow empty email and password only if normal employee
          return false;
        }
    
        return (key !== 'email' && key !== 'password' && key !== 'fatherName') &&
          (value === null || (typeof value === 'string' && !value.trim()));
      }
    );
  
    // Check if there are any errors before submitting
    if (hasNullEmptyValues) {
      console.log('FORM ERROR ', 'FILL ALL THE FIELDS !!');
      return; // Stop further processing if there are errors
    }
  
    const photoError = 
      (employeeData.coach || employeeData.reception) ? null : 
      (employeeData.photo ? null : 'Please upload a photo.');

    setErrors({
      ...errors,
      photo: photoError || '',
    });
  
    if (employeeData.reception === false && employeeData.coach == false){
  
    try {
      setLoader(true);
      const employeeFormData = new FormData();
  

      // Add other fields
      employeeFormData.append('first_name', employeeData.firstName);
      employeeFormData.append('last_name', employeeData.lastName);
      employeeFormData.append('location', employeeData.location);
      employeeFormData.append('national_id', employeeData.nationalId);
      employeeFormData.append('position', employeeData.position);
      employeeFormData.append('phone', employeeData.phoneNumber);
      employeeFormData.append('shift', employeeData.shift);
      employeeFormData.append('salary', employeeData.salary);
  
      if (employeeData.photo) {
        employeeFormData.append('image', employeeData.photo);
      }
      const gymId = AuthService.getgymid();
      if (gymId) {
        employeeFormData.append('gym', gymId);
      }
  
      // Check if it's a receptionist or a coach
      // if (employeeData.reception || employeeData.coach) {
      //   // Add email and password fields if reception or coach
      //   employeeFormData.append('email', employeeData.email);
      //   employeeFormData.append('password', employeeData.password);
      // }
  
      const response = await apiService.post('emps/', employeeFormData, {
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
  } else if (employeeData.reception ===true){
    setLoader(true);
    try {
      const response = await apiService.post('register/', {
        "first_name": employeeData.firstName,
        "last_name": employeeData.lastName,
        "father_name": employeeData.fatherName,
        "phone_number": employeeData.phoneNumber,
        "username": employeeData.email,
        "password": employeeData.password,
        "national_id": employeeData.nationalId,
        "location": employeeData.location,
        "position": employeeData.position,
        "shift": employeeData.salary,
        "salary": employeeData.salary,
        "gym": Number(AuthService.getgymid()),
        "role" : 1
      });
      if (response.status === 200){
        setLoader(false);
        setSuccess(true);
      }
    } catch (error) {
      setLoader(false);
      setShowError(true);
      setErrorDetails('Connection Failed');
      console.log('ERROR', error);
    }

  } else if (employeeData.coach ===true){
    setLoader(true);
    try {
      const response = await apiService.post('register/', {
        "first_name": employeeData.firstName,
        "last_name": employeeData.lastName,
        "father_name": employeeData.fatherName,
        "phone_number": employeeData.phoneNumber,
        "username": employeeData.email,
        "password": employeeData.password,
        "national_id": employeeData.nationalId,
        "location": employeeData.location,
        "position": employeeData.position,
        "shift": employeeData.salary,
        "salary": employeeData.salary,
        "gym": Number(AuthService.getgymid()),
        "role" : 2
      });

      if (response.status === 200){
        setLoader(false);
        setSuccess(true);
      }

    } catch (error) {
      setLoader(false);
      setShowError(true);
      setErrorDetails('Connection Failed');
      console.log('ERROR', error);
    }
  }
  };

  return (
    <>
      {loader ? <Loader/> : ""}
      <form className="lg:w-full">
        <div className="ml-60 space-y-12 px-20 mt-28 pl-60">
          <div className="pb-12">
            <h2 className="font-semibold leading-7 text-red-600 text-2xl">Add an Employee</h2>
            <p className="mt-3 text-mm leading-6 text-gray-600">
              Please provide information about the new employee
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
              <div className="sm:col-span-6">
                <p className="text-lg leading-6 text-gray-400 pb-8 font-bold">Employee Information</p>
              </div>


              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="employee-reception"
                      checked={employeeData.reception}
                      onChange={handleCheckboxChangeReception}
                      className="form-checkbox h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 font-bold text-gray-400">Reception</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
              <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="employee-coach"
                      checked={employeeData.coach}
                      onChange={handleCheckboxChangeCoach}
                      className="form-checkbox h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 font-bold text-gray-400">Coach</span>
                  </label>
                </div>
              </div>


              <div className="sm:col-span-5">
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="employee-normal"
                      checked={employeeData.normalemp}
                      onChange={handleCheckboxChangeNormalEmp}
                      className="form-checkbox h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 font-bold text-gray-400">Normal Employee</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="first_name" className="block text-md font-medium leading-6 text-gray-400">
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

             {(employeeData.reception || employeeData.coach ) && <div className="sm:col-span-3">
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
              </div>}

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
            {employeeData.normalemp &&
              <div className="sm:col-span-3">
                <label className="block relative text-md font-medium leading-6 text-gray-400">
                  Photo
                </label>
                <label htmlFor="photo" className="block relative text-gray-800 bg-gray-300 flex items-center justify-center w-50 h-9 top-2 border rounded-lg border-gray-700 cursor-pointer text-md font-bold leading-6 hover:bg-red-600 hover:text-white ">
                 <p>Upload Photo</p>
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    // value={sectionData.photo === "" ? "" : sectionData.photo}
                    className="block opacity-0 w-[0.1px] h-[0.1px] absolute rounded-md border-0 py-[0.15rem]  text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                    onChange={handleInputChange}

                  />
                </div>
              </div>
            }

              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-md font-medium leading-6 text-gray-400">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="location"
                    value={employeeData.location}
                    name="location"
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


              {employeeData.reception && (
                <>
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-md mt-6 font-medium leading-6 text-gray-400">
                      Reception Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={employeeData.email}
                        className="block w-full rounded-md border-0 mb-4 mt-2 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-400">
                      Reception Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={employeeData.password}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>
                </>
              )}

                {employeeData.coach && (
                <>
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-md mt-6 font-medium leading-6 text-gray-400">
                      Coach Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={employeeData.email}
                        className="block w-full rounded-md border-0 mb-4 mt-2 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-400">
                      Coach Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={employeeData.password}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>
                </>
              )}
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
              <p className="text-lg text-gray-600 font-semibold mb-3">Employee Added</p>
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
                        normalemp:false,
                        email: '',
                        password:'',
                        salary: '',
                        shift:'',
                      });
                      if(employeeData.reception === true || employeeData.coach === true){
                        navigate('/dashboard/role-employees');
                      }else {
                        navigate('/dashboard/gym-employees');
                      }
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

export default AddEmployee;
