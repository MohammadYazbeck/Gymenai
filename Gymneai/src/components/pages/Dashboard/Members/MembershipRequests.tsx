import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import apiService from '../../../../services/apiService';
import AuthService from '../../../../services/authService';
import Loader from '../../Loader';
import { request } from 'express';

interface Section {
  id: number;
  section_name: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
}


interface Member {
  id: number;
  first_name: string;
  last_name: string;
  username: string; // aka Email
  father_name: string;
  phone_number: string;
  national_id: string;
  // banned: boolean;
}

interface Request {
id: number;
user: Member;
section: Section;
subscriptionplan: Plan;
requestdate: string;
status:number;
status_date:string;
gym: number;
}




const MembershipRequests: React.FC = () => {
  const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false);

  const [display, setDisplay] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [data , setData] = useState<Request[] | null >([]); 
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();


    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
  
        // Make API call to fetch gym sections data with headers
        const response = await apiService.get(`requests?gym=${AuthService.getgymid()}`);
  
        if (response.status === 201 || response.status === 200) {
          // Check if the response is an array, if not, wrap it in an array
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
          console.log('Response Data:', responseData);
          setData(responseData?.reverse());
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

  const handleAcceptClick = (request: Request) => {
    setSelectedRequest(request);
    setShowAcceptModal(true);

  };

  const handleDeclineClick = (request: Request) => {
    setSelectedRequest(request);
    setShowDeclineModal(true);

  };

  const handleCancel = () => {
    setSelectedRequest(null);
    setShowAcceptModal(false);
    setShowDeclineModal(false);

  };

  const handelAccept = async() => {
    // Perform the actual removal logic here (e.g., API call, state update, etc.)
    console.log(`Accepting Request with id ${selectedRequest?.id}`);

    try {
      setLoader(true);

      // Make API call to fetch gym sections data with headers
      const response = await apiService.put(`requests/status/${selectedRequest?.id}/`,
      {
        "status":1,
        "user":selectedRequest?.user.id,
        "section": selectedRequest?.section.id,
        "subscriptionplan": selectedRequest?.subscriptionplan.id,
        "gym": selectedRequest?.gym
      },
      {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`
        }
      }
      );

      if (response.status === 201 || response.status === 200) {
        // Check if the response is an array, if not, wrap it in an array
        const responseData = Array.isArray(response.data) ? response.data : [response.data];
        console.log(responseData);
        setLoader(false);
        window.location.reload();


      }
    } catch (error) {
      console.error('Error updating request status:', error.response.data);
    } finally {
      setLoader(false); // Set loader to false regardless of success or error
    }
    // Reset state
    setSelectedRequest(null);
    setShowAcceptModal(false);
  };

  const handelDecline = async() => {
    // Perform the actual removal logic here (e.g., API call, state update, etc.)
    console.log(`Removing Request with id ${selectedRequest?.id}`);
    try {
      setLoader(true);

      // Make API call to fetch gym sections data with headers
      const response = await apiService.put(`requests/status/${selectedRequest?.id}/`,
      {
        "status":2,
        "user":selectedRequest?.user.id,
        "section": selectedRequest?.section.id,
        "subscriptionplan": selectedRequest?.subscriptionplan.id,
        "gym": selectedRequest?.gym
      },
      {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`
        }
      }
      );

      if (response.status === 201 || response.status === 200) {
        // Check if the response is an array, if not, wrap it in an array
        const responseData = Array.isArray(response.data) ? response.data : [response.data];
        console.log(responseData);
        setLoader(false);
        window.location.reload();


      }
    } catch (error) {
      console.error('Error updating request status:', error.response.data);
    } finally {
      setLoader(false); // Set loader to false regardless of success or error
    }

    // Reset state
    setSelectedRequest(null);
    setShowDeclineModal(false);
  };

  return (
    <>
       {loader ? <Loader/> :""}  
      <div className=" flex items-center justify-between w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem]">
        <div>
        <h2 className="text-2xl font-semibold text-red-600">Membership Requests</h2>
        </div>
      </div>

      <div className="container mx-auto mt-[20rem] px-4 ml-[34rem]">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {display && Array.isArray(data) && data.map((request) => 
          (
            //  member.banned === false ?
            (<div key={request.id} className="bg-transpert rounded-md overflow-hidden shadow-md border-red-900 mb-8">
              <div className="p-6 ">
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  {request.user.first_name} {request.user.last_name}
                </h3>
                <p className="text-gray-500 font-semibold mb-2">{request.user.username}</p>
                <div className="flex items-center justify-end">
                  {/* <div className={`w-6 h-6 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div> */}
                  {/* <p className="text-gray-500 px-5">{member.status==='active' ? "Active" : "Inactive"}</p> */}

                </div>
              </div>

              <div className="border-t border-gray-800 p-9">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-bold">Father's Name:</p>
                    <p className="text-gray-600">{request.user.father_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">National ID:</p>
                    <p className="text-gray-600">{request.user.national_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Phone Number:</p>
                    <p className="text-gray-600">{request.user.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Request Date:</p>
                    <p className="text-gray-600">{request.requestdate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Status Date:</p>
                    <p className="text-gray-600">{request.status_date}</p>
                  </div>
                  <div>
                    {/* <p className="text-gray-500 font-bold">Gender:</p> */}
                    {/* <p className="text-gray-600">{member.gender}</p> */}
                  </div>
                  <div>
                    {/* <p className="text-gray-500 font-bold">Birthdate:</p> */}
                    {/* <p className="text-gray-600">{member.birthdate}</p> */}
                  </div>
                  <div>
                    {/* <p className="text-gray-500 font-bold">Blacklisted:</p> */}
                    {/* <p className={member.banned ? "font-bold text-red-800":"font-bold text-green-600"}>{member.banned ? "Yes":"No"}</p> */}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-semibold">Section:</p>
                    {
                      <p key={request.section.id} className="text-gray-600">
                        {request.section.section_name}
                      </p>
                    }
               
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Subscription Plan:</p>
                    {
                      <p key={request.subscriptionplan.id} className="text-gray-600">
                        {request.subscriptionplan.name} - {request.subscriptionplan.price}
                        {/* {section.expiration_days_left} days left */}
                      </p>
                      
                    }
                  </div>
                  
                </div>
                {request.status === 0 ?
                <div className='flex justify-end'>
                <button
                  className="px-3 py-1 font-bold mb-5 mx-5 bg-transpert rounded-lg p-2 border border-gray-600 text-gray-600 hover:bg-green-600 hover:text-white"
                  onClick={() => handleAcceptClick(request)}
              >
                  Accept
                </button>
                <button
                  className="px-3 py-1 font-bold mb-5  bg-transpert rounded-lg p-2 border border-gray-600 text-gray-600 hover:bg-red-600 hover:text-white"
                  onClick={() => handleDeclineClick(request)}
              >
                  Decline
                </button>
                </div> : request.status === 1 ?<p className='text-lg font-bold text-green-400 flex justify-end'>Approved</p>:<p className='text-lg font-bold text-red-600 flex justify-end'>Declined</p>}
              </div>
            </div>)
          ))}
        </div>
        {showAcceptModal && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Approve Membership</p>
                <p className="text-base text-gray-400 font-semibold mb-12">Are you sure you want to add this <strong className='font-bold text-red-600'>{selectedRequest?.user.first_name +" " + selectedRequest?.user?.last_name}</strong> to the gym?</p>
                <div className="flex justify-end">
                  <button
                    className="mr-4 px-4 py-2 text-gray-500 hover:text-red-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick={handelAccept}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
            {showDeclineModal && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Decline Membership</p>
                <p className="text-base text-gray-400 font-semibold mb-12">Are you sure you want decline <strong className='font-bold text-red-600'>{selectedRequest?.user?.first_name +" " + selectedRequest?.user?.last_name}</strong> Request?</p>
                <div className="flex justify-end">
                  <button
                    className="mr-4 px-4 py-2 text-gray-500 hover:text-red-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick={handelDecline}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
   
    </>
  );
};

export default MembershipRequests;
