import { FormEvent, SetStateAction, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useRegisterContext } from "../../../../../Providers/RegisterContext";
import apiService from "../../../../../services/apiService";
import AuthService from "../../../../../services/authService";
import Information from "../../../../../services/informationService";
import Loader from "../../../Loader";

interface PersonalInfoState {
  firstName: string;
  lastName: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  nationalID: string;
  password: string;
}

export default function PersonalInfo() {
  const navigate = useNavigate();
  const [loader,setLoader]= useState(false);
  const {personalInformation, dispatch}= useRegisterContext();
  const [selectedCountryCode, setSelectedCountryCode] = useState('00963'); // Default country code
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fillFiledsError, setFillFiledsError] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoState>({
    firstName: personalInformation.firstName || '',
    lastName:  personalInformation.lastName || '',
    fatherName: personalInformation.fatherName ||'',
    phoneNumber: personalInformation.phoneNumber ||'',
    email: personalInformation.email ||'',
    nationalID: personalInformation.nationalID ||'',
    password: personalInformation.password ||'',
  });

  const handleCountryCodeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedCountryCode(e.target.value);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPersonalInfo((prevPersonalInfo) => ({
      ...prevPersonalInfo,
      [name]: value,
    }));
    validateField(name,value);
  };

  const validateField = (name: string, value: string) => {
    // Perform validation for the specific field
    let errorMessage = '';

    
   
    if (name === 'firstName' && (!value.trim() || value.length < 3)) {
      errorMessage = 'First Name must not be empty or less than 3 letters';
    }

    if (name === 'lastName' && (!value.trim() || value.length < 3)) {
      errorMessage = 'Last Name must not be empty or less than 3 letters';
    }

    if (name === 'fatherName' && (!value.trim() || value.length < 3)) {
      errorMessage = 'Father Name must not be empty or less than 3 letters';
    }

    if (name === 'phoneNumber') {
      const isNumeric = !isNaN(Number(value));
      const hasMinimumLength = value.length >= 9;
  
      if (!isNumeric || !hasMinimumLength) {
        errorMessage = 'Phone Number must be numeric and have a minimum length of 9';
      }
    }

    if (name === 'nationalID') {
      const isNumeric = !isNaN(Number(value));
      const hasMinimumLength = value.length >= 5;
  
      if (!isNumeric || !hasMinimumLength) {
        errorMessage = 'National ID must be numeric and have a minimum length of 5';
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

    // Add more validation for other fields as needed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit =  async (e: FormEvent) => {
    e.preventDefault();
    const hasNullEmptyValues = Object.values(personalInfo).some((value) => !value || !value.trim());
    // Check if there are any errors before submitting
    if(hasNullEmptyValues){
    setFillFiledsError(true)
    
  }else {

    setFillFiledsError(false)
  }
    if (Object.values(errors).every((error) => !error) && !hasNullEmptyValues) {
      dispatch({
        type: 'SET_PERSONAL_INFO',
        payload: {
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          fatherName: personalInfo.fatherName,
          phoneNumber: personalInfo.phoneNumber,
          email: personalInfo.email,
          nationalID: personalInfo.nationalID,
          password: personalInfo.password,
        },
      });

      try {
        setLoader(true);
        // PERSONAL INFORMATION
        const response1 = await apiService.post('register/', {
          "first_name": personalInfo.firstName,
          "last_name": personalInfo.lastName,
          "father_name": personalInfo.fatherName,
          "phone_number": personalInfo.phoneNumber,
          "national_id": personalInfo.nationalID,
          "username": personalInfo.email,
          "password": personalInfo.password,
          "role": 0
        });

        console.log("RESPONSE 1",response1.data)
        console.log("RESPONSE 1 ACCESS TOKEN",response1.data.token.access)
        console.log("RESPONSE 1 Headers",response1.headers)

  
        if (response1.status === 200 || response1.status === 201 && response1.data.token.access) {
          AuthService.setRole('owner');
          AuthService.setAccessToken(response1.data.token.access);
          AuthService.setRefreshToken(response1.data.token.refresh);
          setLoader(false);
          navigate('/home/sign-up/verification-code');

          if (response1.data.userData){
            const personalInfo = response1.data.userData;
            const jsonString = JSON.stringify(personalInfo)
            const encodedData = btoa(jsonString);
            Information.setPersonalInformation(encodedData)
            }
        }
      } catch (error) {
        console.error('Form submission failed. Please check the form for errors.', error);
        setLoader(false);

      }

  
    } else {
      console.error('Form submission failed. Please check the form for errors.');
    }
  };

    return (
      <>
      {loader ? <Loader/> : ""}
      <form className="min-h-screen">
        <div className="space-y-12 px-20 mt-14 lg:px-60">
          <div className="border-b border-gray-400/10 pb-10">
            <h2 className="font-semibold leading-7 text-white text-2xl">Personal Information</h2>
            {fillFiledsError ? <p className="mt-1 text-mm text-red-600"> Please fill all The fileds </p> : ""}
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
            <div className="mt-16 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-md font-medium leading-6 text-gray-200">
                  First name
                </label>
                <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                value={personalInfo.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
              />
            </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-md font-medium leading-6 text-gray-200">
                  Last name
                </label>
                <div className="mt-2">
              <input
          
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                value={personalInfo.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
              />
            </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="fatherName" className="block text-md font-medium leading-6 text-gray-200">
                  Father name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fatherName"
                    id="fatherName"
                    autoComplete="family-name"
                    value={personalInfo.fatherName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="phoneNumber" className="block text-md font-medium leading-6 text-gray-200">
                  Phone Number
                </label>
                <div className="mt-2 flex items-center">
                  {/* Add a country selector here */}
                  <select
                    id="country-code"
                    name="country-code"
                    value={selectedCountryCode}
                    onChange={handleCountryCodeChange}
                    className="w-24 bg-red-600 rounded-l-md border-0 py-1.5 text-white font-bold shadow-sm  ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6"
                  >
                    <option className="font-bold" value="00963">+963 (SY)</option>
                    <option className="font-bold" value="00961">+961 (LEB)</option>
                    <option className="font-bold" value="00971">+971 (UAE)</option>
  
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="tel"
                    value={personalInfo.phoneNumber}
                    onChange={handleChange}
                    className="block w-full rounded-r-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-200">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="nationalID" className="block text-md font-medium leading-6 text-gray-200">
                  National ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nationalID"
                    id="nationalID"
                    autoComplete="nationalID"
                    value={personalInfo.nationalID}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>

              
              <div className="sm:col-span-3">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-200">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={personalInfo.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="px-20 lg:px-60 mt-16 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </form>
      </>
    );
  }
  