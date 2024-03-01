import React, { FormEvent, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import apiService from '../../../../../services/apiService';
import AuthService from '../../../../../services/authService';
import Loader from '../../../Loader';

const SetNewPassword: React.FC = () => {

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [success,setSuccess]= useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();


  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    if(name === 'password'){
      setPassword(value);
    }

    if(name ==="confirmPassword"){
      setCPassword(value)
    }
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = '';
  
    if (name === 'password') {
      const hasMinimumLength = value.length >= 5;

      if (!hasMinimumLength) {
        errorMessage = 'Password must have a minimum length of 5';
      }
    }

    if (name === 'confirmPassword') {
      const hasMinimumLength = value.length >= 5;
    
      console.log('Password',password);
      console.log('CPassword',value);

      if (!hasMinimumLength || !(password === value)) {
        errorMessage = 'Confirm Password must have a minimum length of 5 and should match password';
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
    const cPasswordHasNullEmptyValues = Object.values(cpassword).some((value) => !value || !value.trim());
    const passwordHasNullEmptyValues = Object.values(password).some((value) => !value || !value.trim());
  

      setLoader(true);
      if((password===cpassword) && !cPasswordHasNullEmptyValues && !passwordHasNullEmptyValues){
      const email= AuthService.getemail();
      try {
        const response = await apiService.post('confirmresetpassword/', {
          "email": email,
          "password":password,
          "confirmpassword":cpassword
        });
        console.log(response);
  
        if (response.status === 200) {
        setLoader(false);
         setSuccess(true);
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
  
       
      }
    }
  };

  return (
    <>
     {loader ? <Loader/> :""}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-28 mb-[29.8rem]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Enter your new password
          </h2>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  required
                  onChange={handleChange}
                  className="bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-bold focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-200">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={cpassword}
                  type="password"
                  required
                  onChange={handleChange}
                  className="bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-bold focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
      {success && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Success</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Password changed</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setSuccess(false)
                      if (location.pathname === "/home/sign-in/forget-password/reset-password"){
                        AuthService.clearTokens();
                        navigate('/home/sign-in');   
                      }
                      if(location.pathname === "/home/forget-password/reset-password"){
                        AuthService.removeemail();
                        navigate('/dashboard/gym-employees')
                      }
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default SetNewPassword;
