import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/authService";
import apiService from "../../../../services/apiService";
import Loader from "../../Loader";

export default function VerificationCode() {
  const [loader,setLoader] = useState(false);
  const navigate= useNavigate();
  const [vCode,setVCode] = useState('')
  const [error,setError] = useState('')



  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'verificationcode') {
      setVCode(value);
    }
    validateField(name, value);
  };


  const validateField = (name: string, value: string) => {
      if (name === 'verificationcode' && (!value.trim() || value.length < 6)) {
        console.log('Verification Code must not be empty or less than 6 digits');
        setError('Verification Code must not be empty or less than 6 digits');
      }
      else{
        setError('')
      }

  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    const hasNullEmptyValues = Object.values(vCode).some(
      (value) => value === null || (typeof value === 'string' && !value.trim())
    );
    if (!hasNullEmptyValues){

      if(location.pathname === "/home/sign-in/forget-password/verification-code"){
        setLoader(true);
        const email = AuthService.getemail();
        try {
          const response = await apiService.post('resetcheckotp/', {
            "email":email,
            "otp": vCode
          });
          console.log(response);
  
          if (response.status === 200 || response.status === 201){
            setLoader(false);
            navigate('/home/sign-in/forget-password/reset-password')}
            else { setError('Invalid Code')}
      
        }catch (error){
        setLoader(false);
        console.log("API ERROR",error)
        setError('CONNECTION ERROR')
  
        }
  
      } else if(location.pathname === "/home/forget-password/verification-code"){
        setLoader(true);
        const email = AuthService.getemail();
        try {
          const response = await apiService.post('resetcheckotp/', {
            "email":email,
            "otp": vCode
          });
          console.log(response);
  
          if (response.status === 200 || response.status === 201){
            setLoader(false);
            navigate('/home/forget-password/reset-password')}
            else { setError('Invalid Code')}
      
        }catch (error){
        setLoader(false);
        console.log("API ERROR",error)
        setError('CONNECTION ERROR')
  
        }

    }else {
      const accesstoken = AuthService.getAccessToken();
      setLoader(true);
      try {
        const response = await apiService.post('checkotp/', {
          "otp": vCode
        },{
          headers:{
            Authorization: `Bearer ${accesstoken}`
          }

        });
        console.log(response);

        if (response.status === 200 || response.status === 201){
          setLoader(false);
          navigate('/home/sign-up/gym-info')}
          else { setError('Invalid Code')}
    
      }catch (error){
      setLoader(false);
      console.log("API ERROR",error)
      setError('CONNECTION ERROR')

      }
    }}
      }
    return (
      <>
       {loader ? <Loader/> : ""}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-28 mb-[20.3rem]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Verification Code
            </h2>
            <p className="mt-4 text-center leading-6 text-gray-600 mb-1">
              Please enter the verification code that we have sent your email
            </p>
            <p className="mt-2 text-center leading-6 text-red-600 mb-5">
              {error}
            </p>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <div className="mt-5">
                  <input
                    id="verificationcode"
                    name="verificationcode"
                    type="text"
                    value={vCode}
                    pattern="\d{4}"
                    inputMode="numeric"
                    required
                    className="bg-transparent block w-full rounded-md border-0 py-1.5 text-center text-gray-400 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-bold focus:ring-red-600 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  />
                </div>
              <div>
                <button
                  type="submit"
                  className=" mt-8 flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </form>
  
          </div>
        </div>

      </>
    )
  }
  