import React, { FormEvent, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import apiService from '../../../../../services/apiService';
import Loader from '../../../Loader';
import AuthService from '../../../../../services/authService';


const ForgetPassword: React.FC = () => {

console.log(location.pathname );
console.log(AuthService.getemail());

const [email, setEmail] = useState(location.pathname === "/home/forget-password"? AuthService.getemail() : "");
const [loader, setLoader] = useState(false);
const [errors, setErrors] = useState<Record<string, string>>({});
const [fillFieldsError, setFillFieldsError] = useState(false);
const navigate = useNavigate();


const handleChange = (e: { target: { name: string; value: string; }; }) => {
  const { name, value } = e.target;
  setEmail(value);
  validateField(name, value);
};

const validateField = (name: string, value: string) => {
  let errorMessage = '';

  if (name === 'username') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      errorMessage = 'Invalid email address';
    }
  }
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage,
  }));
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setErrors({['']:''});
  const hasNullEmptyValues = Object.values(email!).some((value) => !value || !value.trim());

  if (hasNullEmptyValues) {
    setFillFieldsError(true);
  } else {
    setFillFieldsError(false);
  }

  if (!hasNullEmptyValues) {
    setLoader(true);
    try {
      const response = await apiService.post('resetpassword/', {
        "email": email,
      });
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        if(location.pathname === "/home/sign-in/forget-password"){
          AuthService.setemail(email!);
          navigate('/home/sign-in/forget-password/verification-code');          
         }

         if(location.pathname === "/home/forget-password"){
          AuthService.setemail(email!);
          navigate('/home/forget-password/verification-code');          
         }


    };
    } catch (error) {
      setLoader(false);
      if(error.response.status === 404){
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['Not Found']: 'Invalid Email',
        }));
      }
      console.log("API ERROR", error);

     
    } finally {
      console.error('Form submission failed. Please check the form for errors.');
    }
  }
};

  return (
    <>
      {loader ? <Loader /> : ""}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-28  mb-[29.8rem]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
              className="mx-auto h-10 w-auto"
              src=""i
              alt="Your Company"S
            /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Enter your email
          </h2>
          {fillFieldsError ? <p className="mt-10 font-bold text-center text-mm text-red-600"> Please fill all The fields </p> : ""}
            {Object.values(errors).every((error) => !error) ? (
              ""
            ) : (
              <div>
                {Object.values(errors).map((error, index) => (
                  <p key={index} className="mt-1 font-bold text-center text-mm text-red-600 ">
                    {error}
                  </p>
                ))}
              </div>
            )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-200">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-bold focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
