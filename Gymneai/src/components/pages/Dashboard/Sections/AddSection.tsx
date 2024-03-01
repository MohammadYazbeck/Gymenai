import React, { ChangeEvent, FormEvent, useState } from 'react';
import AuthService from '../../../../services/authService';
import apiService from '../../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';

interface SubscriptionPlan {
  name: string;
  price: string;
  days: number
}
interface GymSectionData {
  name: string;
  time: string;
  coach_name: string;
  photo: File | null;
  sessions: number;
  subscriptionPlans: SubscriptionPlan[];
}

const AddSection: React.FC = () => {
  
  const [loader,setLoader] = useState(false);
  const [showError,setShowError] = useState(false);
  const [errorDetails,setErrorDetails] = useState('');
  const [success,setSuccess] = useState(false);
  
    const navigate = useNavigate();
    const [fillFiledsError, setFillFiledsError] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sectionData, setSectionData] = useState<GymSectionData>({
      name: '',
      time: '',
      coach_name: '',
      photo: null,
      sessions: 1,
      subscriptionPlans: [],
    });
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
  
      if (type === 'file') {
        const fileInput = e.target as HTMLInputElement;
        const files = fileInput.files;
  
        if (name === 'photo') {
          const selectedphoto = files && files.length > 0 ? files[0] as File : null;
          setSectionData((prevSectionInfo) => ({
            ...prevSectionInfo,
            [name]: selectedphoto,
          }));
        }
      } else {
        setSectionData((prevSectionInfo) => ({
          ...prevSectionInfo,
          [name]: value,
        }));
      }
      validateField(name, value);
    };
  
    const validateField = (name: string, value: string | File | File[] | SubscriptionPlan[]) => {
      let errorMessage = '';
  
      if (typeof value === 'string') {
        if (name === 'name' && (!value.trim() || value.length < 3)) {
          errorMessage = 'Gym Name must not be empty or less than 3 letters';
        }
  
        if (name === 'time' && (!value.trim() || value.length < 4)) {
          errorMessage = 'Time must not be empty or less than 4 letters';
        }
  
  
        if (name === 'coach_name' && (!value.trim() || value.length < 3)) {
          errorMessage = 'Coach Name must not be empty or less than 3 letters';
        }
  
        if (name === 'sessions') {
          const isNumeric = !isNaN(Number(value));
          const hasMinimumLength = value.length >= 1;
  
          if (!isNumeric || !hasMinimumLength) {
            errorMessage = 'Number of Sessuons must be numeric and have a minimum length of 1';
          }
        }
  
        if (name === 'subscriptionPlans') {
          const updatedPlans = value as unknown as SubscriptionPlan[];
          updatedPlans.forEach((plan, index) => {
            if (!plan.name.trim() || plan.name.length < 3) {
              errorMessage = `Subscription Plan ${index + 1}: Name must not be empty or less than 3 letters`;
            }
  
            const priceNumeric = !isNaN(Number(plan.price));
            const priceLength = plan.price.length >= 2;
  
            if (!priceNumeric || !priceLength) {
              errorMessage = `Subscription Plan ${index + 1}: Price must be numeric and have a minimum length of 2`;
            }
          });
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
  
    const handleSubscriptionChange = (index: number, field: keyof SubscriptionPlan, value: string) => {
      setSectionData((prevData) => {
        const updatedPlans = [...prevData.subscriptionPlans];
        updatedPlans[index] = {
          ...updatedPlans[index],
          [field]: value,
        };
        validateField('subscriptionPlans', updatedPlans);
        return {
          ...prevData,
          subscriptionPlans: updatedPlans,
        };
      });
    };
  
    const handleAddSubscriptionPlan = () => {
      setSectionData((prevData) => ({
        ...prevData,
        subscriptionPlans: [...prevData.subscriptionPlans, { name: '', price: '', days:0}],
      }));
    };
  
    const handleRemoveSubscriptionPlan = (index: number) => {
      setSectionData((prevData) => {
        const updatedPlans = [...prevData.subscriptionPlans];
        updatedPlans.splice(index, 1);
  
        return {
          ...prevData,
          subscriptionPlans: updatedPlans,
        };
      });
    };
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoader(true);
    
      const hasNullEmptyValues = Object.values(sectionData).some(
        (value) => value === null || (typeof value === 'string' && !value.trim())
      );
    
      if (hasNullEmptyValues) {
        setFillFiledsError(true);
      } else {
        setFillFiledsError(false);
      }
    
      const photoError = sectionData.photo ? null : 'Please upload a logo.';
      setErrors({
        ...errors,
        photo: photoError || "",
      });
    
      if (Object.values(errors).every((error) => !error) &&
        !hasNullEmptyValues) {
          const sectionFormData = new FormData();
          const gymid= (AuthService.getgymid());
              if(gymid){
              sectionFormData.append('gym',gymid);
              }
              sectionFormData.append('section_name',sectionData.name);
              sectionFormData.append('coach_name',sectionData.coach_name);
              sectionFormData.append('time',sectionData.time);
              if (sectionData.photo){
              sectionFormData.append('image',sectionData.photo);
              }
              sectionFormData.append('number_of_session',String(sectionData.sessions));

              console.log(AuthService.getAccessToken())
  
        try {
              const response = await apiService.post(
                'sections/',
               sectionFormData,
                {
                  headers: {
                    Authorization: `Bearer ${AuthService.getAccessToken()}`
                  }
                }
              );
  
              console.log(response.data)
    
              if (response.status === 200 || response.status === 201) {
                 console.log(String(response.data.id));
                 console.log(sectionData.subscriptionPlans);
  
                for (let i = 0; i < sectionData.subscriptionPlans.length; i++) {
                  // SUBSCRIPTIONS
                  const responseSubscription = await apiService.post('subscription/', {
                    "section": String(response.data.id),
                    "name": sectionData.subscriptionPlans[i].name,
                    "price": Number(sectionData.subscriptionPlans[i].price),
                    "days": Number(sectionData.subscriptionPlans[i].days)
                  });
    
                  if (responseSubscription.status !== 200 && responseSubscription.status !== 201) {
                    console.error('Subscription API call failed.', responseSubscription);
                    setLoader(false);
                    setShowError(true);
                    setErrorDetails(responseSubscription.data.error)
  
                    return;
                  }
                }
                setLoader(false);
                setSuccess(true);
              }
            }
          catch (error) {
          console.error('Form submission failed. Please check the form for errors.', error);
          setLoader(false);
          setShowError(true);
          setErrorDetails('Form Errors')
  
        }
      }
    
    };
  return (
    <>
      {loader ? <Loader/> : ""}
      <form className=" lg:w-full">
        <div className="ml-60 pl-60 space-y-12 px-20 mt-28 ">
          <div className="pb-12">
            <h2 className="font-semibold leading-7 text-red-600 text-2xl ">Add a Section</h2>
            <p className="mt-1 text-mm leading-6 text-gray-600">
              Please provide information about the gym section
            </p>
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
                <div className="mt-2 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
                  {/* You may add specific inputs for the new section if needed */}
                </div>
            

            <div className="mt-20 pb-28 border-b border-gray-400/10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <p className="text-lg leading-6 text-gray-400 pb-8 font-bold">Section  Informations</p>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-400">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    name='name'
                    value={sectionData.name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6  font-bold bg-transparent"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="time" className="block text-md font-medium leading-6 text-gray-400">
                  Time
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="time"
                    name='time'
                    value={sectionData.time}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6  font-bold bg-transparent"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="coach_name" className="block text-md font-medium leading-6 text-gray-400">
                  Coach Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="coach_name"
                    name='coach_name'
                    value={sectionData.coach_name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block relative text-md font-medium leading-6 text-gray-300">
                  Photo
                </label>
                <label htmlFor="photo" className="block relative text-gray-800 bg-gray-300 flex items-center justify-center w-50 h-9 top-2 border rounded-lg border-gray-700 cursor-pointer text-md font-bold leading-6 hover:bg-red-600 hover:text-white ">
                 <p>Upload Photo</p>
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="photo"
                    name='photo'
                    // value={sectionData.photo === "" ? "" : sectionData.photo}
                    className="block opacity-0 w-[0.1px] h-[0.1px] absolute rounded-md border-0 py-[0.15rem]  text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="sessions" className="block text-md font-medium leading-6 text-gray-400">
                  Number of Sessions
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="sessions"
                    name='sessions'
                    max="30"
                    min="1"
                    value={sectionData.sessions}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

       
              <div className="sm:col-span-4">
            <label htmlFor="section-subscription" className="block text-md font-medium leading-6 text-gray-400 mb-6">
              Subscription Plans
            </label>
            <div className="mt-2 flex flex-col space-y-4">
              {sectionData.subscriptionPlans.map((plan, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div>
                    <label htmlFor={`subscription-name-${index}`} className="block text-md font-medium leading-6 text-gray-400">
                      Name
                    </label>
                    <input
                      type="text"
                      id={`subscription-name-${index}`}
                      value={plan.name}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                      onChange={(e) => handleSubscriptionChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`subscription-price-${index}`} className="block text-md font-medium leading-6 text-gray-400">
                      Price
                    </label>
                    <input
                      type="text"
                      id={`subscription-price-${index}`}
                      value={plan.price}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent"
                      onChange={(e) => handleSubscriptionChange(index, 'price', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`subscription-days-${index}`} className="block text-md font-medium leading-6 text-gray-400">
                      Days
                    </label>
                    <input
                      type="number"
                      id={`subscription-days-${index}`}
                      value={plan.days}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent"
                      onChange={(e) => handleSubscriptionChange(index, 'days', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubscriptionPlan(index)}
                    className="h-9 inline-flex font-bold items-center mt-6 px-2 py-1.5 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSubscriptionPlan}
                className="w-48 text-center font-bold px-2 py-1.5 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white focus:outline-none"
              >
                Add Subscription Plan
              </button>
            </div>
          </div>
        </div>
            </div>
          </div>
        <div className="px-20 lg:px-60 mb-14 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleSubmit}
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
              <p className="text-lg text-gray-600 font-semibold mb-3">Section Added</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setSuccess(false)
                      setSectionData({
                        name: '',
                        time: '',
                        coach_name: '',
                        photo: null,
                        sessions: 1,
                        subscriptionPlans: [],
                      });
                      navigate('/dashboard/add-section');
                      

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

export default AddSection;
