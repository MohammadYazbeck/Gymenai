import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterContext } from "../../../../Providers/RegisterContext";
import apiService from "../../../../services/apiService";
import Information from "../../../../services/informationService";
import AuthService from "../../../../services/authService";
import Loader from "../../Loader";

interface PersonalInfoState {
  firstName: string;
  lastName: string;
  fatherName: string;
  phoneNumber: string;
  nationalID: string;
}

export default function EditPersonalInfo() {
  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);
  const [success,setSuccess] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('00963'); // Default country code
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fillFiledsError, setFillFiledsError] = useState(false);

  const storedData = Information.getPersonalInformation();
  const decodedData=atob(storedData!);
  const personalInformation = JSON.parse(decodedData);
  console.log(personalInformation)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoState>({
    firstName: personalInformation.first_name,
    lastName: personalInformation.last_name,
    fatherName: personalInformation.father_name,
    phoneNumber: personalInformation.phone_number,
    nationalID: personalInformation.national_id,
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
      setLoader(true);
      try{
        console.log('UPDATING...')
        const response = await apiService.put(`editinfo/${personalInformation.id}/`,{
          "first_name":personalInfo.firstName,
          "last_name": personalInfo.lastName,
          "father_name": personalInfo.fatherName,
          "phone_number": personalInfo.phoneNumber,
          "national_id": personalInfo.nationalID
        }, {
          headers: {
            Authorization: `Bearer ${AuthService.getAccessToken()}`
          }
        });
        console.log('UPDATING. DONE.')

        if (response.status === 200 || response.status === 201) {
            
          console.log(response.data)
          if (response.data){
            const updatedinfo = response.data;
            const newPersnonalInformation = {
              "id":personalInformation.id,
              "first_name": response.data.first_name,
              "last_name": response.data.last_name,
              "username": personalInformation.username,
              "father_name": response.data.father_name,
              "phone_number": response.data.phone_number,
              "national_id": response.data.national_id,
              "otp": personalInformation.otp

            }
            const jsonString = JSON.stringify(newPersnonalInformation)
            const encodedData = btoa(jsonString);
            Information.setPersonalInformation(encodedData)
            }
          setLoader(false);
          setSuccess(true);
        }

      } catch (error){
        console.log('ERROR',error)
      }
    } else {
      // Display a general error message or handle errors as needed
      console.error('Form submission failed. Please check the form for errors.');
    }
  };

    return (
      <>
      {loader ?<Loader/>:""}
      <form className="min-h-screen ml-60">
        <div className="space-y-12 px-20 mt-14 lg:px-60">
          <div className="border-b border-gray-400/10 ">
            <h2 className="font-semibold leading-7 text-red-600 text-2xl mt-[7rem] mb-[10rem]">Edit Personal Information</h2>
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
                <label htmlFor="firstName" className="block text-md font-medium leading-6 text-gray-400">
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
                <label htmlFor="lastName" className="block text-md font-medium leading-6 text-gray-400">
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
                <label htmlFor="fatherName" className="block text-md font-medium leading-6 text-gray-400">
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
                <label htmlFor="phoneNumber" className="block text-md font-medium leading-6 text-gray-400">
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
  
                    {/* Add more country codes as needed */}
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
  
              <div className="sm:col-span-3 mb-10">
                <label htmlFor="nationalID" className="block text-md font-medium leading-6 text-gray-400">
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
      {success && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Success</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Personal Information Updated</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setSuccess(false)
                      navigate('/dashboard/gym-sections');
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
      {/* To be Removed Later  */}
  
      </>
    );
  }
  