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




const ViewGymMembers: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [display, setDisplay] = useState(false);
  const [success,setSuccess] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const handleRemoveClick = (member: User) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCancel = () => {
    setSelectedMember(null);
    setShowModal(false);
  };

  const handleRemove = async () => {
    console.log(`Adding member to black list  id ${selectedMember?.id}`);
    setShowModal(false);
    setLoader(true)
    try {
        const response = await apiService.put('add-remove-blacklist',{
          "memeberid":selectedMember?.id,
          "status":1
        }, {
          headers: {
            Authorization: `Bearer ${AuthService.getAccessToken()}`
          }
        });

        if (response.status ===200){
          setLoader(false)
          setSuccess(true)
        }

    } catch (error) {
      console.log(error);
    }
    setSelectedMember(null);
  };

  
  const filteredMembers = data?.filter((usergym) =>
    `${usergym.user.first_name} ${usergym.user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
  return (
    <>
       {loader ? <Loader/> :""}  
      <div className=" flex items-center justify-between w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem]">
        <div>
        <h2 className="text-2xl font-semibold text-red-600">Gym Members</h2>
        <p className="text-gray-600 mt-2">List of all gym members</p>
        </div>
        <div className='mx-40 mt-4'>
          <NavLink to="blacklisted-members">
                <button
                  className="px-3 py-1 mb-5 font-bold mx-5 bg-transpert rounded-lg p-2 border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                  >
                  Blacklisted Members
                </button>
          </NavLink>
        </div>
      </div>
    {/* Search Bar */}
 <div className="w-full pr-20 lg:pr-[10rem] mt-40 bg-[#222222] pb-10 pl-[35rem] fixed">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 px-4 border rounded-md w-full focus:outline-none focus:ring-red-900 focus:border-red-900 bg-transparent text-gray-300"
        />
      </div>

      <div className="container mx-auto mt-[20rem] px-4 ml-[34rem]">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {display && filteredMembers &&Array.isArray(filteredMembers) && filteredMembers.map((member) => 
          (
            ((member.user.isblacklisted === "True" || member.user.isblacklisted === null ) ? <div key={member.user.id} className="bg-transpert rounded-md overflow-hidden shadow-md border-red-900 mb-8">
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
                  {/* <div> */}
                    {/* <p className="text-gray-500 font-bold">Birthdate:</p> */}
                    {/* <p className="text-gray-600">{member.birthdate}</p> */}
                  {/* </div> */}
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
                <div className='flex justify-end'>
                <button
                  className="px-3 py-1 font-bold mb-5 mx-5 bg-transpert rounded-lg p-2 border border-gray-600 text-gray-600 hover:bg-red-600 hover:text-white"
                  onClick={() => handleRemoveClick(member.user)}
              >
                  Add To The Blacklist
                </button>
                </div>
              </div>
            </div>:"")
          ))}
        </div>
        {showModal && 
        (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Add Member to the Blacklist</p>
                <p className="text-base text-gray-400 font-semibold mb-12">Are you sure you want to add this <strong className='font-bold text-red-600'>{selectedMember?.first_name +" " + selectedMember?.last_name}</strong> to the blacklist?</p>
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
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

        {success && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Success</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Added to the blacklist</p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg"
                    onClick= {(e) =>{
                      setSuccess(false)
                      navigate('/dashboard/gym-members/blacklisted-members');
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
   
    </>
  );
};

export default ViewGymMembers;
