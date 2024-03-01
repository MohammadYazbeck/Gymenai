import { FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import apiService from '../../../../../services/apiService';
import AuthService from '../../../../../services/authService';
import Loader from '../../../Loader';
import Information from '../../../../../services/informationService';

interface SignIn {
  username: string;
  password: string;
}

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState<SignIn>({ username: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fillFieldsError, setFillFieldsError] = useState(false);
  const navigate = useNavigate();


    useEffect(() => {
        if (AuthService.getRole()=== "owner" && AuthService.getAccessToken() && Information.getGymInformation() && Information.getGymInformation()){
          setShowModal(true);
        }else if ((AuthService.getRole()=== "reception" || AuthService.getRole()==="coach") && AuthService.getAccessToken()){
          setShowModal(true);
        }
    }, [])

    const handelLogout = () =>{
      AuthService.clearTokens();
      window.location.reload();

  }

  const handelGoDashboard = () =>{
    navigate('/dashboard')
}

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
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

    if (name === 'password') {
      const hasMinimumLength = value.length >= 5;

      if (!hasMinimumLength) {
        errorMessage = 'Password must have a minimum length of 5';
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
    const hasNullEmptyValues = Object.values(loginInfo).some((value) => !value || !value.trim());

    if (hasNullEmptyValues) {
      setFillFieldsError(true);
    } else {
      setFillFieldsError(false);
    }

    if (!hasNullEmptyValues) {
      setLoader(true);
      try {
        const response = await apiService.post('login/', {
          "username": loginInfo.username,
          "password": loginInfo.password,
        });

        console.log(response);

        if (response.status === 200 || response.status === 201) {
          AuthService.setAccessToken(response.data.token.access)
          AuthService.setRefreshToken(response.data.token.refresh)
          AuthService.setRole(response.data.role === 'GymOwner' ? 'owner' : response.data.role === 'Reception' ? 'reception' : response.data.role === 'Coach' ? 'coach' : "");
       

          if(AuthService.getRole()){
          if(AuthService.getRole()==='owner'){
            if (response.data.user){
              const personalInfo = response.data.user;
              const jsonString = JSON.stringify(personalInfo)
              const encodedData = btoa(jsonString);
              Information.setPersonalInformation(encodedData)
              }
    
              if (response.data.gym){
                const gymInfo = response.data.gym;
                const jsonString = JSON.stringify(gymInfo)
                const encodedData = btoa(jsonString);
                Information.setGymInformation(encodedData)
                }
          AuthService.setgymid(response.data.gym.pk)
          setLoader(false);
          navigate('/dashboard/gym-sections');
          }else if(AuthService.getRole()==='coach'){
            if (response.data.user){
              const personalInfo = response.data.user;
              const jsonString = JSON.stringify(personalInfo)
              const encodedData = btoa(jsonString);
              Information.setPersonalInformation(encodedData)
              }
          AuthService.setgymid(response.data.user.gym)
          setLoader(false);
          navigate('/dashboard/gym-members-programs');
          }else {
            if (response.data.user){
              const personalInfo = response.data.user;
              const jsonString = JSON.stringify(personalInfo)
              const encodedData = btoa(jsonString);
              Information.setPersonalInformation(encodedData)
              }
          AuthService.setgymid(response.data.user.gym)
          setLoader(false);
          navigate('/dashboard/search-member')
          }
          }
        };


       
      
      } catch (error) {
        setLoader(false);
        if(error.response.status === 404){
          setErrors((prevErrors) => ({
            ...prevErrors,
            ['Not Found']: 'Invalid Email',
          }));
        }else if(error.response.status === 400){
          setErrors((prevErrors) => ({
            ...prevErrors,
            ['Invalid Password']: 'Invalid Password',
          }));

        } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['ConnectionEr']: 'Connection Error',
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
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-[18rem] lg:px-8 main-section-container-image">
        <div className='border-x border-gray-800 rounded-3xl w-[40rem] h-[40rem] hover:border-red-600 shadow-md opacity-80'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
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

          <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-10" action="#" method="POST">
              <div>
                <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-200">
                  Username
                </label>
                <div className="mt-4">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    onChange={handleChange}
                    className="text-base bg-transparent block w-full rounded-md border-0 py-2.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-bold focus:ring-red-600 sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-200">
                    Password
                  </label>
                  <div className="text-sm">
                    <NavLink to="/home/sign-in/forget-password" className="font-semibold text-white hover:text-red-600">
                      Forgot password?
                    </NavLink>
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    className="text-base bg-transparent block w-full rounded-md border-0 py-2.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-bold focus:ring-red-600  sm:leading-6" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-red-600 px-3 py-2.5 text-lg font-semibold leading-6 text-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-110  hover:bg-red-800 hover:text-white duration-300 "
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-12 text-center text-sm text-gray-400">
              Not a member?{' '}
              <NavLink to="/home/sign-up/personal-info" className="font-semibold leading-6 text-white hover:text-red-500">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      {showModal && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-14">You already logged in</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick={handelLogout}
                  >
                    Logout
                  </button>
                  <button
                    className="ml-6 px-4 py-2 text-gray-500 hover:text-red-600"

                    onClick={handelGoDashboard}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
    
  );
};

export default SignIn;
