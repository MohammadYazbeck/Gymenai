import React, { useEffect, useState } from 'react';
import { useEmployeeContext } from '../../../../Providers/EmployeeContext';
import { NavLink, useNavigate } from 'react-router-dom';
import apiService from '../../../../services/apiService';
import AuthService from '../../../../services/authService';
import Loader from '../../Loader';

interface EmployeeData {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  location: string;
  national_id: string;
  position: string;
  phone_number: string;
  shift: string;
  salary: number;
  username:string;
}

interface ResponseData {
role:string;
emp: EmployeeData;
}



const ViewGymRoleEmployees: React.FC = () => {
  const { state, dispatch } = useEmployeeContext();
  const [display, setDisplay] = useState(false);
  const [data , setData] = useState<ResponseData[] | null >(null); 
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleRemoveClick = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  const handleRemove = async () => {
    setShowModal(false);
    setLoader(true);
    console.log(`Removing Employee with id ${selectedEmployee?.id}`);
    const deletedemployeeId= selectedEmployee?.id;
    try{
     const deleteResponse = await apiService.delete(`roleemp/${deletedemployeeId}/`);
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
    setSelectedEmployee(null);
  };
 

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
  
        // Make API call to fetch gym sections data with headers
        const response = await apiService.get(`roleemps/${AuthService.getgymid()}`);
  
        if (response.status === 201 || response.status === 200) {
          // Check if the response is an array, if not, wrap it in an array
          const responseData = Array.isArray(response.data) ? response.data : [response.data];
  
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
   
  async function downloadAndSaveImage(url: string, fileName: string): Promise<File | null> {
    try {
      // Fetch the image as a blob
      const response = await fetch(url);
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
    {loader ? <Loader/> :""}
      <div className="w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem]">
        <div className='flex items-center justify-between'>
          <div>
        <h2 className="text-2xl font-semibold text-red-600">Receptionist and coaches</h2>
        <p className="text-gray-600 mt-2">List of all gym receptionist and coaches</p>
        </div>
        <div className='mx-40 mt-4'>
          <NavLink to="/dashboard/gym-employees">
                <button
                  className="px-3 py-1 mb-5 font-bold mx-5 bg-transpert rounded-lg p-2 border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                  >
                  Normal Employees
                </button>
          </NavLink>
        </div>
        </div>
      </div>

      <div className="container mx-auto mt-[20rem] px-4 ml-[34rem]  max-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {display && Array.isArray(data) && data.map((employee) => (
            <div key={employee.emp.id} className="bg-transparent rounded-md overflow-hidden shadow-md border-red-900 mb-8">
              <div className="p-6 flex items-center justify-between">
              <div className='flex flex-col'>
                <h3 className="text-xl font-semibold text-red-600 mb-1">
                  {employee.emp.first_name} {employee.emp.last_name}
                </h3>
                <p className="text-gray-600 mb-2 font-bold">{employee.emp.position}</p>
                </div>
             
              </div>

              <div className="border-t border-gray-800 p-9">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-bold">Location:</p>
                    <p className="text-gray-600">{employee.emp.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Phone Number:</p>
                    <p className="text-gray-600">{employee.emp.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Salary:</p>
                    <p className="text-gray-600">{employee.emp.salary} SP</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">National ID:</p>
                    <p className="text-gray-600">{employee.emp.national_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold">Shift:</p>
                    <p className="text-gray-600">{employee.emp.shift}</p>
                  </div>
                 
                  { employee.role === "Reception" ?
                  <div>
                    <p className="text-gray-500 font-bold">Receptionist:</p>
                    <p className="text-gray-600">{'Yes'}</p>
                  </div>
                  :
                  ""
                  }
                  {employee.role === "Coach" ?
                  <div>
                    <p className="text-gray-500 font-bold">Coach:</p>
                    <p className="text-gray-600">{'Yes'}</p>
                  </div>
                    : 
                    ""  
                }
                </div>
              </div>

                <div className="border-t border-gray-800 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 font-semibold">
                        Email:
                      </p>
                      <p className="text-gray-600">
                        {employee.emp.username}
                      </p>
                    </div>
                  </div>
                </div>
              <div className='flex justify-end'>
              <button
                  className="px-3 py-1 mb-5 ml-5 bg-transpert font-bold rounded-lg p-2 border border-gray-700 text-gray-600 hover:bg-gray-200 hover:text-red-600"
                  onClick={async() => {
                    setLoader(true);
                    const downloadedFile = await downloadAndSaveImage('', 'downloaded_image.jpg');
                    if(downloadedFile){
                    dispatch({
                      type: 'SET_SELECTED_EMPLOYEE',
                      payload: {
                        id: employee.emp.id,
                        first_name: employee.emp.first_name,
                        last_name: employee.emp.last_name,
                        father_name:employee.emp.father_name,
                        photo:downloadedFile,
                        location: employee.emp.location,
                        national_id: employee.emp.national_id,
                        position: employee.emp.position,
                        phone_number: employee.emp.phone_number,
                        shift: employee.emp.shift,
                        salary: employee.emp.salary,
                        reception: employee.role === "Reception" ? true : false,
                        coach: employee.role === "Coach" ? true : false,
                        reception_data: {email:employee.role === "Reception" ? employee.emp.username : "", password: ""},
                        coach_data: {email:employee.role === "Reception" ? employee.emp.username : "", password:""},
                      },
                    });
                    setLoader(false);
                    navigate('/dashboard/role-employees/edit-roleemployee-info')
                    
                  }}
                  
                  }>
                  Edit Info
                </button>
               <button
                  className="px-3 py-1 mb-5 ml-5 bg-transpert font-bold rounded-lg p-2 border border-gray-700 text-gray-600 hover:bg-red-600 hover:text-white"
                  onClick={() => {
                    AuthService.setemail(employee.emp.username);
                    console.log(AuthService.getemail());
                    if(AuthService.getemail()){
                    navigate('/home/forget-password');
                    }
                  }}
              >
                  Reset Password
                </button>
                <button
                  className="px-3 py-1 mb-5 mx-5 bg-transpert font-bold rounded-lg p-2 border border-gray-700 text-gray-600 hover:bg-red-600 hover:text-white"
                  onClick={() => handleRemoveClick(employee.emp)}
              >
                  Remove
                </button>
                </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
            <div className="z-[30] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg  py-6 px-10">
              <p className="text-2xl text-red-600 font-semibold mb-3">Remove Employee</p>
              <p className="text-lg text-gray-600 font-semibold mb-3">Are you sure you want to remove  <strong className='font-bold text-red-600'>{selectedEmployee?.first_name +" " + selectedEmployee?.last_name}</strong></p>
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
};

export default ViewGymRoleEmployees;
