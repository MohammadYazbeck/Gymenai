import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterContext } from '../../../../Providers/RegisterContext';
import Information from '../../../../services/informationService';
import apiService from '../../../../services/apiService';
import AuthService from '../../../../services/authService';
import Loader from '../../Loader';

interface GymInfo {
  name: string;
  location: string;
  capacity: string;
  workingHours: string;
  commercialRegisterNumber: string;
  licenseNumber: string;
  about: string;
  logo: File | null;
  photos: File[];
}

export default function EditGymInfo()  {
  const navigate = useNavigate();
  const [fillFiledsError, setFillFiledsError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loader,setLoader] = useState(false);
  const [success,setSuccess] = useState(false);
  const [showPhotoFields, setShowPhotoFields] = useState(false);


  const storedData = Information.getGymInformation();
  const decodedData=atob(storedData!);
  const gymInformation = JSON.parse(decodedData);
  let logo:File;

  const [gymInfo, setGymInfo] = useState<GymInfo>({
    name: gymInformation.name ||'',
    location: gymInformation.location || '',
    capacity: gymInformation.capacity || '',
    workingHours:gymInformation.working_hours ||'',
    commercialRegisterNumber: gymInformation.commercial_register_number || '',
    licenseNumber: gymInformation.license_number || '',
    about: gymInformation.description || '',
    logo: null,
    photos:  [],
  });


  useEffect(() => {
    const downloadLogoAndSave = async () => {
      try {
        // Check if gymInformation.logo is defined before attempting to fetch
        if (gymInformation.logo) {
          const response = await fetch(gymInformation.logo);
          const blob = await response.blob();
          const file = new File([blob], 'downloaded_image.jpg', { type: blob.type });
          if (response.status === 200){
          console.log(response)
          setGymInfo((prevGymInfo) => ({
            ...prevGymInfo,
            logo: file,
          }));
        } else if(response.status === 404){

          setGymInfo((prevGymInfo) => ({
            ...prevGymInfo,
            logo: null,
          }));

        }
        }
      } catch (error) {
        console.error('Error downloading logo:', error);
        // Handle error by setting logo to null
        setGymInfo((prevGymInfo) => ({
          ...prevGymInfo,
          logo: null,
        }));
      }
    };
  
    downloadLogoAndSave();
  }, []); // Run the effect only once, similar to componentDidMount
  
  useEffect(() => {
    const downloadImagesAndSave = async () => {
      try {
        // Check if gymInformation.photos is defined before attempting to map over it
        if (gymInformation.image && Array.isArray(gymInformation.image)) {
          const downloadedImages = await Promise.all(
            gymInformation.image.map(async (image: { url: string | URL | Request; key: any; }) => {
              const response = await fetch(image.url);
              const blob = await response.blob();
              const file = new File([blob], `${image.key}.jpg`, { type: blob.type });
              return file;
            })
          );
          
          setGymInfo((prevGymInfo) => ({
            ...prevGymInfo,
            photos: downloadedImages,
          }));
        } else {
          // Handle case where gymInformation.photos is not an array
          console.error('Invalid gymInformation.photos:', gymInformation.image);
          setGymInfo((prevGymInfo) => ({
            ...prevGymInfo,
            photos: [],
          }));
        }
      } catch (error) {
        console.error('Error downloading images:', error);
        // Handle error by setting photos to an empty array
        setGymInfo((prevGymInfo) => ({
          ...prevGymInfo,
          photos: [],
        }));
      }
    };
  
    downloadImagesAndSave();
  }, []); // Run the effect only once, similar to componentDidMount
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;
  
      if (name === 'logo') {
        const selectedLogo = files && files.length > 0 ? files[0] as File : null;
        setGymInfo((prevGymInfo) => ({
          ...prevGymInfo,
          [name]: selectedLogo,
        }));
      } else if (name === 'photos') {
        const selectedPhotos = files && files.length > 0 ? Array.from(files) as File[] : [];
        setGymInfo((prevGymInfo) => ({
          ...prevGymInfo,
          [name]: selectedPhotos,
        }));
      }
    } else {
      setGymInfo((prevGymInfo) => ({
        ...prevGymInfo,
        [name]: value,
      }));
    }
    validateField(name,value);
  };
    
  
  const validateField = (name: string, value: string | File | File[]) => {
    // Perform validation for the specific field
    let errorMessage = '';
  
    if (typeof value === 'string') {
      if (name === 'name' && (!value.trim() || value.length < 3)) {
        errorMessage = 'Gym Name must not be empty or less than 3 letters';
      }
  
      if (name === 'location' && (!value.trim() || value.length < 5)) {
        errorMessage = 'Location must not be empty or less than 5 letters';
      }
  
      if (name === 'capacity') {
        const isNumeric = !isNaN(Number(value));
        const hasMinimumLength = value.length >= 2;
  
        if (!isNumeric || !hasMinimumLength) {
          errorMessage = 'Gym Capacity must be numeric and have a minimum length of 2';
        }
      }
  
      if (name === 'workingHours' && (!value.trim() || value.length < 5)) {
        errorMessage = 'Working Hours must not be empty or less than 5 letters';
      }
  
      if (name === 'commercialRegisterNumber') {
        const isNumeric = !isNaN(Number(value));
        const hasMinimumLength = value.length >= 5;
  
        if (!isNumeric || !hasMinimumLength) {
          errorMessage = 'Commercial Register Number must be numeric and have a minimum length of 5';
        }
      }
  
      if (name === 'licenseNumber') {
        const isNumeric = !isNaN(Number(value));
        const hasMinimumLength = value.length >= 5;
  
        if (!isNumeric || !hasMinimumLength) {
          errorMessage = 'License Number must be numeric and have a minimum length of 5';
        }
      }
  
      if (name === 'about' && (!value.trim() || value.length < 10)) {
        errorMessage = 'About Section must not be empty or less than 10 letters';
      }
    }
  
    if (name === 'logo' && (!value || (value instanceof File && !value.name))) {
      errorMessage = 'Logo must not be empty';
    }
  
    if (name === 'photos' && (!value || (value instanceof Array && value.length === 0))) {
      errorMessage = 'Photos must not be empty';
    }
  
    // Add more validation for other fields as needed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleShowPhotos = () => {
    setShowPhotoFields(!showPhotoFields);
  };

  const handleSubmit =  async (e: FormEvent) => {
    e.preventDefault();
  
    const hasNullEmptyValues = Object.values(gymInfo).some(
      (value) => value === null || (typeof value === 'string' && !value.trim())
    );
  
    // Check if there are any errors before submitting
    if (hasNullEmptyValues) {
      setFillFiledsError(true);
    } else {
      setFillFiledsError(false);
    }
  
    // Validate logo and photos
    const logoError = gymInfo.logo ? null : 'Please upload a logo.';
    const photosError =
      gymInfo.photos && gymInfo.photos.length > 0
        ? null
        : 'Please upload at least one photo.';
  
    setErrors({
      ...errors,
      logo: logoError || "",
      photos: photosError || "",
    });
  
    if (
      Object.values(errors).every((error) => !error) &&
      !hasNullEmptyValues
    ) {
      setLoader(true);
      try{
        const gymFormData = new FormData();
        gymFormData.append('name',gymInfo.name);
        if (gymInfo.logo){
        gymFormData.append('logo',gymInfo.logo);
        }
        gymInfo.photos.forEach((file: Blob) => {
          gymFormData.append(`uploaded_images`, file);
        });
        gymFormData.append('location',gymInfo.location);
        gymFormData.append('owner',gymInformation.owner);
        gymFormData.append('capacity',gymInfo.capacity);
        gymFormData.append('working_hours',gymInfo.workingHours);
        gymFormData.append('commercial_register_number',gymInfo.commercialRegisterNumber);
        gymFormData.append('license_number',gymInfo.licenseNumber);
        gymFormData.append('description',gymInfo.about);

//  CHANGE PK TO AUTHSERVICES.GETGYM ID
        console.log('UPDATING...')
        const response = await apiService.put(`gyms/${AuthService.getgymid()}/`, gymFormData, {
          headers: {
            Authorization: `Bearer ${AuthService.getAccessToken()}`
          }
        });
        console.log('UPDATING. DONE.')

        if (response.status === 200 || response.status === 201) {
            
          console.log(response.data)
          if (response.data){
            const gymInfo = response.data;
            const jsonString = JSON.stringify(gymInfo)
            const encodedData = btoa(jsonString);
            Information.setGymInformation(encodedData)
            }
          setLoader(false);
          setSuccess(true);
        }

      } catch (error){
        console.log('ERROR',error)
      }
    } else {
      // Display a general error message or handle errors as needed
      console.error(
        'Form submission failed. Please check the form for errors.'
      );
    }
  };

  return (
    <>
      {loader ?<Loader/>:""}
      <form className='w-full'>
        <div className="space-y-12 px-20 lg:px-60 ml-60 space-y-12 px-20 mt-28 ">
          <div className="border-b border-gray-400/10 pb-12">
          <h2 className="font-semibold leading-7 text-red-600 text-2xl">Edit Gym Information</h2>
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
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6 mt-40">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-400">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={gymInfo.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
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
                    name="location"
                    id="location"
                    value={gymInfo.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>

         

              <div className="sm:col-span-3">
                <label htmlFor="capacity" className="block text-md font-medium leading-6 text-gray-400">
                  Capacity
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="capacity"
                    id="capacity"
                    value={gymInfo.capacity}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="workingHours" className="block text-md font-medium leading-6 text-gray-400">
                  Working Hours
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="workingHours"
                    id="workingHours"
                    value={gymInfo.workingHours}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="commercialRegisterNumber" className="block text-md font-medium leading-6 text-gray-400">
                  Commercial Register Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="commercialRegisterNumber"
                    id="commercialRegisterNumber"
                    value={gymInfo.commercialRegisterNumber}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="licenseNumber" className="block text-md font-medium leading-6 text-gray-400">
                  License Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="licenseNumber"
                    id="licenseNumber"
                    value={gymInfo.licenseNumber}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block relative text-md font-medium leading-6 text-gray-300">
                  Logo
                </label>
                <label htmlFor="logo" className="block relative text-gray-800 bg-gray-300 flex items-center justify-center w-50 h-9 top-2 border rounded-lg border-gray-700 cursor-pointer text-md font-bold leading-6 hover:bg-red-600 hover:text-white ">
                 <p>Upload PNG</p>
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    // value={sectionData.photo === "" ? "" : sectionData.photo}
                    className="block opacity-0 w-[0.1px] h-[0.1px] absolute rounded-md border-0 py-[0.15rem]  text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                    onChange={handleInputChange}

                  />
                </div>
              </div>

              
             
              <div className="sm:col-span-3">
                <label htmlFor="about" className="block text-md font-medium leading-6 text-gray-400">
                  About us
                </label>
                <div className="mt-2">
                  <input
                    name="about"
                    id="about"
                    value={gymInfo.about}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-transparent font-bold"
                  ></input>
                </div>
              </div>
               <div className="sm:col-span-4 flex items-center">
              <ChevronDownIcon 
                    strokeWidth={2.5}
                    className={`mt-2 h-4 w-4 transition-transform text-gray-300  ${showPhotoFields === true ? "rotate-180 text-red-600" : ""}`}/>
                <button
                  type="button"
                  onClick={handleShowPhotos}
                  className={ !showPhotoFields ? "text-md font-semibold leading-6 text-white hover:text-red-600 ml-3 mt-2 ": "text-md font-semibold leading-6 text-red-600 ml-3 mt-2" }
                >
                   New Gym Photos ?
                </button>
              </div>

              {showPhotoFields && (
                  <div className="sm:col-span-3">
                  <label className="block relative text-md font-medium leading-6 text-gray-300">
                    Photos ( 1 - 4 )
                  </label>
                  <label htmlFor="photos" className="block relative text-gray-800 bg-gray-300 flex items-center justify-center w-50 h-9 top-2 border rounded-lg border-gray-700 cursor-pointer text-md font-bold leading-6 hover:bg-red-600 hover:text-white ">
                   <p>Upload Photos</p>
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      multiple
                      // value={sectionData.photo === "" ? "" : sectionData.photo}
                      className="block opacity-0 w-[0.1px] h-[0.1px] absolute rounded-md border-0 py-[0.15rem]  text-gray-400 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 font-bold bg-transparent"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="px-20 lg:px-60 mt-14 flex items-center justify-end gap-x-6">
          <NavLink to='/home/sign-up/personal-info'>
            <button type="button" className="text-md font-semibold leading-6 text-white hover:text-red-600">
              Back
            </button>
          </NavLink>
          <button
            type="submit"
            className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleSubmit}
          >
            Next
          </button>
           {/* To be Removed Later */}

        </div>
      </form>
      {success && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Success</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Gym Information Updated</p>
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
  
    </>
  );
}
