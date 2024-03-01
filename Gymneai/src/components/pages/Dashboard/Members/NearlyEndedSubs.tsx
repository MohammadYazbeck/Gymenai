import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import apiService from '../../../../services/apiService';
import AuthService from '../../../../services/authService';
import Loader from '../../Loader';

interface Section {
  id: number;
  section_name: string;
  coach_name: string;
  time: string;
  image: string;
  number_of_session: number,
  gym: number;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  section: number;
}


interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string; // aka Email
  father_name: string;
  phone_number: string;
  national_id: string;
  otp: string
  isblacklisted: string,
}

interface Usergym {
user: User;
section: Section[];
plan: Plan[];
subscribevalid: string;
}




const NearlyEndedSubs: React.FC = () => {
  const [display, setDisplay] = useState(false);
  const [data , setData] = useState<Usergym[] | null >([]); 
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();


    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
  
        // Make API call to fetch gym sections data with headers
        const response = await apiService.get(`usergym/${AuthService.getgymid()}`);
  
        if (response.status === 201 || response.status === 200) {
          // Check if the response is an array, if not, wrap it in an array
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          console.log('RESPONSE',response.data)
          console.log('Response Data:', responseData);
          setData(responseData);
          setDisplay(true);

        }
      } catch (error) {
        console.error('Error fetching gym sections:', error.response.data);
      } finally {
        setLoader(false); // Set loader to false regardless of success or error
      }
    };
  
    fetchData();
  }, []);

  const currentDate = new Date();
  console.log(currentDate);
  
  const filteredMembers = data?.filter((usergym) => {
    const subscribeValidDate = new Date(usergym.subscribevalid);
    const differenceInMilliseconds = subscribeValidDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays <= 7;
  });

  return (
    <>
       {loader ? <Loader/> :""}  
      <div className=" flex items-center justify-between w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem]">
        <div>
        <h2 className="text-2xl font-semibold text-red-600">Nearly Ended Subscriptoon</h2>
        <p className="text-gray-600 mt-2">Member who has a subscription that will end in 5 or less days</p>
        </div>
      </div>

      <div className="container mx-auto mt-[13rem] px-4 ml-[34rem]">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {display && filteredMembers &&Array.isArray(filteredMembers) && filteredMembers.map((member) => 
          (
            ((member.user.isblacklisted === "False" || member.user.isblacklisted === null ) ? <div key={member.user.id} className="bg-transpert rounded-md overflow-hidden shadow-md border-red-900 mb-8">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  {member.user.first_name} {member.user.last_name}
                </h3>
                <p className="font-semibold text-gray-500 mb-2">{member.user.username}</p>
              </div>

              <div className="border-t border-gray-800 p-9">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-bold">Father's Name:</p>
                    <p className="text-gray-600">{member.user.father_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">National ID:</p>
                    <p className="text-gray-600">{member.user.national_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Phone Number:</p>
                    <p className="text-gray-600">{member.user.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Sub Expiration Date:</p>
                    <p className="text-gray-600">{member.subscribevalid}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Blacklisted:</p>
                    <p className="font-bold text-green-600" >No</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 p-6">
                <div className="grid grid-cols-2 gap-4">
                <div>
  {member.section && Array.isArray(member.section) &&
    member.section.map((section) => {
      console.log('Section Name:', section.section_name);
      console.log('Subscription Plans:', member.plan); // Check subscription plan data

      return (
        <div key={section.id} className="text-gray-600">
          <p>
            <strong>Section Name:</strong> {section.section_name}
          </p>
          {/* ... other details */}
          {member.plan && Array.isArray(member.plan) &&
            member.plan
              .filter((plan) => plan.section === section.id)
              .map((filteredPlan) => {
                console.log('Filtered Plan:', filteredPlan); // Check filtered plans
                return (
                  <p key={filteredPlan.id} className="text-gray-600">
                    <strong>Subscription Plan:</strong> {`${filteredPlan.name} - ${filteredPlan.price}`}
                          </p>
                        );
                      })}
                </div>
              );
            })}
        </div>
                </div>
              </div>
            </div>:"")
          ))}
        </div>
      </div>
   
    </>
  );
};

export default NearlyEndedSubs;
