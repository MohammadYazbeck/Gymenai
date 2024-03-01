import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSectionContext } from '../../../../Providers/SectionContext'
import { BsPencil } from 'react-icons/bs';
import AuthService from '../../../../services/authService';
import apiService from '../../../../services/apiService';
import Loader from '../../Loader';

interface GymSection {
  id: number;
  section_name: string;
  time: string;
  coach_name: string;
  image: string;
  number_of_session: number;
  plans: {
    id: number;
    name: string;
    price: number;
    section: number;
    days: number
  }[];
}

export function ViewGymSections() {
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState<GymSection[] | null>(null);
  const { state, dispatch } = useSectionContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<GymSection | null>(null);
  const navigate = useNavigate();


  const handleRemoveClick = (section: GymSection) => {
    setSelectedSection(section);
    setShowModal(true);
  };

  const handleCancel = () => {
    setSelectedSection(null);
    setShowModal(false);
  };


  const handleRemove = async () => {
    setShowModal(false);
    setLoader(true);
    console.log(`Removing section with id ${selectedSection?.id}`);
    const deletedSectionId= selectedSection?.id;
    try{
     const deleteResponse = await apiService.delete(`sections/${deletedSectionId}/`);
     console.log(deleteResponse)
     if (deleteResponse.status === 204 || deleteResponse.status === 200){
      window.location.reload();
      setLoader(false);

     }

     if (deleteResponse.status !== 204 && deleteResponse.status !== 200){
      setLoader(false);
      console.log('Respnse ERror')
     }


    } catch (error){
      console.log('Error',error);
      setLoader(false);
    }
    setSelectedSection(null);
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
  
        const response = await apiService.get(`sections?gym=${AuthService.getgymid()}`);
  
        if (response.status === 201 || response.status === 200) {
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
  
          console.log('Response Data:', responseData);
  
          // Fetch subscription plans for each section
          const plansPromises = responseData.map(async (section) => {
            const plansResponse = await apiService.get(`subscription?section=${section.id}`);
            return {
              sectionId: section.id,
              plans: plansResponse.data,
            };
          });
  
          // Wait for all plans to be fetched
          const plansResults = await Promise.all(plansPromises);
  
          const updatedData = responseData.map((section) => {
            const matchingPlansResult = plansResults.find((result) => result.sectionId === section.id);
            return {
              ...section,
              plans: matchingPlansResult ? matchingPlansResult.plans : [],
            };
          });
  
          setData(updatedData);
          setDisplay(true);
  
          // Now you have the plans for each section included in the state
          console.log('Updated Data with Subscription Plans:', updatedData);
        }
      } catch (error) {
        console.error('Error fetching gym sections:', error);
      } finally {
        setLoader(false); // Set loader to false regardless of success or error
      }
    };
  
    fetchData();
  }, []);
   

  

  async function downloadAndSaveImage(url: string, fileName: string): Promise<File | null> {
    try {
      if (!url) {
        console.error('Image URL is undefined or null');
        return null;
      }
  
      // Fetch the image as a blob
      const response = await fetch(url);
  
      if (!response.ok) {
        console.error(`Failed to fetch image. Status: ${response.status}`);
        return null;
      }
  
      const blob = await response.blob();
  
      // Create a File from the blob
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  }
  

  return (
    <>
      <div className='ml-[19rem] px-20 pt-14 lg:pl-60 fixed w-full bg-[#222222] z-[10]'>
        <h2 className="font-semibold leading-7 text-red-600 text-2xl">Gym Sections</h2>
        <p className="mt-2 mb3-16 text-mm leading-6 text-gray-600">Explore the available gym sections</p>
      </div>

      <div className="ml-[19rem] space-y-12 px-20 mt-48 lg:pl-60">
        <div className="pb-12">
          {display && Array.isArray(data) && data.length > 0 ? (
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
              {data.map((section) => (
                <div key={section?.id} className="bg-transpert overflow-hidden shadow border-y border-gray-800 rounded-lg pb-3 hover:border-red-600 relative h-[39rem]">
                  {section && (
                    <>
                      <img className="w-full h-48 object-cover mb-4" src={section.image} alt={section.section_name} />
                      <div className="px-4 py-2 h-[20rem]">
                        <div className='flex items-center'> 
                          <h3 className="text-xl font-semibold text-gray-300">{section.section_name}</h3>
                            <button
                              className="ml-2 px-3  flex items-center gap-x-2 py-1 font-bold bg-transpert text-gray-500 hover:text-red-700 "
                              onClick={async () => {
                                setLoader(true);
                                const downloadedFile = await downloadAndSaveImage(section.image, 'downloaded_image.jpg');
                                if (downloadedFile) {
                                     dispatch({
                                    type: 'SET_SECTION_INFO',
                                    payload: {
                                      id: section.id,
                                      name: section.section_name,
                                      time: section.time,
                                      coach_name: section.coach_name,
                                      photo: downloadedFile,
                                      number_of_sessions: section.number_of_session,
                                      plans: section.plans.map(plan => ({
                                        name: plan.name,
                                        id: plan.id,
                                        section: plan.section,
                                        days: plan.days,
                                        price: plan.price.toString(),
                                      }))
                                    },
                                  });
                                  console.log('PLANS',section.plans)
                                  setLoader(false);
                                  navigate('/dashboard/gym-sections/edit-section')
                                
                                }
                              }}
                            >
                              <BsPencil /> Edit Informaton
                            </button>
                        </div>

                        <p className="text-red-600 font-bold mb-3 mt-5 text-base"> By Coach {section.coach_name}</p>
                        <p className="text-gray-500">Time: {section.time}</p>
                        <p className="text-gray-500">Sessions: {section.number_of_session} sessions per month</p>

                        <div className="mt-4">
                          <p className="text-md font-medium leading-6 text-red-600">Subscription Plans</p>
                          <ul className="mt-2">
                            {section.plans && section.plans.length> 0 && section.plans.map((plan) => (
                              <li key={plan.name} className="flex items-center text-gray-600">
                                <span className="mr-1.5">{plan.name}:</span>
                                <span className="font-bold">${plan.price.toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className='flex justify-end'>
                        <button
                          className="px-3 py-1 font-bold mt-4 mb-2 mr-10 bg-red-600 rounded-lg p-2 border border-gray-700 text-gray-300 hover:bg-gray-200 hover:text-red-600"
                          onClick={() => handleRemoveClick(section)}
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No gym sections available</p>
          )}
        </div>
      </div>

      {loader ? <Loader /> : ""}

      {showModal && (
        <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg  py-6 px-10">
            <p className="text-2xl text-red-600 font-semibold mb-3">Remove Section</p>
            <p className="text-lg text-gray-600 font-semibold mb-3">Are you sure you want to remove <strong className='font-bold text-red-600'>{selectedSection?.section_name}</strong> section</p>

            <div className="flex justify-end">
              <button
                className="mr-4 px-4 py-2 text-gray-500 hover:text-red-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewGymSections;
