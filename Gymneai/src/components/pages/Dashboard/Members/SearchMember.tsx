import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../../services/apiService';
import Loader from '../../Loader';

interface Member{
id:number;
first_name: string;
last_name: string;
father_name: string;
username: string;
phone_number: string;
national_id:string;
otp:string;
}

interface Image{
images: File[];

}

interface Gym{
  pk:number;
  name: string;
  logo: string;
  location: string;
  capacity: number;
  wokring_hours: string;
  commercial_register_number:string;
  license_number:string;
  description: string;
  image: Image[];
  owner: number

  }
  
interface  Section {
  id: number,
  section_name: string,
  coach_name: string,
  time: string,
  image: string,
  number_of_session: number,
  gym : number
}

interface Plan {
id:number,
name: string,
price: number,
section: number

}

interface Info {
gym: Gym[];
section: Section[],
plan: Plan[],

}

interface Data{
User: Member,
Info: Info[],
}
 


function SearchMember() {

    const [searchQuery, setSearchQuery] = useState('');
    const [loader, setLoader] = useState(false);
    const [display, setDisplay] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [data , setData] = useState<Data | null >(null); 
    const navigate = useNavigate();

    const handleSubmit = async () => {
      setErrors({['']:''});
      setData(null);
        setLoader(true);
        try {
          const response = await apiService.get(`searchmem/${searchQuery}/`,);
          console.log(response);
  
          if (response.status === 200 || response.status === 201) {
            // ADD GYM ID
            setData(response.data);
            setDisplay(true);
            setLoader(false);
            
          };
        } catch (error) {
          setLoader(false);
          console.log("API ERROR", error.response.status);
  
          if(error.response.status === 404){
            setErrors((prevErrors) => ({
              ...prevErrors,
              ['Not Found']: 'Notfound',
            }));
          }else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            ['ConnectionEr']: 'Connection Error',
          }));
        }
        }
    };
    
  return (
    <>
      {loader ? <Loader/> : ""}
      <div className="w-full fixed bg-[#222222] pt-14 pb-12 pl-[34rem]">
        <h2 className="text-2xl font-semibold text-red-600">Search for a Gym Member</h2>
        <p className="text-gray-600 mt-2">Enter the member phone number</p>
      </div>

    {/* Search Bar */}
    <div className=' flex fixed'>
    <div className="xl:w-[110rem] lg:w-[60rem] mt-40 mr-3 bg-[#222222] pb-10 pl-[35rem]">
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 px-4 border rounded-md w-full focus:outline-none focus:ring-red-900 focus:border-red-900 bg-transparent text-gray-300"
        />
      </div>
      <button className='p-2 h-[2.7rem] bg-red-600 mr-20 lg:mr-[10rem] mt-40 rounded-md text-white font-bold hover:bg-white hover:text-red-600'
      onClick={handleSubmit}>
        Search
      </button>
      </div>
            { display && data ?
                  //  member.banned === false ?
                  <div key={data.User.id} className="bg-transpert sm:w-[40rem] lg:w-[80rem] xl:w=[80rem] rounded-md overflow-hidden shadow-md border-red-900 mb-8 ml-[34rem] mt-80">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-red-600 mb-2">
                        {data.User.first_name} {data.User.last_name}
                      </h3>
                      <p className="text-gray-500 mb-2">{data.User.username}</p>
                      <div className="flex items-center justify-end">
                        {/* <div className={`w-6 h-6 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div> */}
                        {/* <p className="text-gray-500 px-5">{member.status==='active' ? "Active" : "Inactive"}</p> */}

                      </div>
                    </div>

                    <div className="border-t border-gray-800 p-9">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 font-bold">Father's Name:</p>
                          <p className="text-gray-600">{data.User.father_name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-bold">National ID:</p>
                          <p className="text-gray-600">{data.User.national_id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-bold">Phone Number:</p>
                          <p className="text-gray-600">{data.User.phone_number}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-800 p-6">
                      <div className="grid grid-cols-2 gap-4">
                      <div>
        
                      {data.Info && Array.isArray(data.Info) &&
                        data.Info.map((info) => (
                          <div className="text-gray-600">
                            {info.section && Array.isArray(info.section) &&
                              info.section.map((section) => (
                                <div key={section.id} className="text-gray-600">
                                  <p>
                                    <strong>Section Name:</strong> {section.section_name}
                                  </p>
                                  {info.plan && Array.isArray(info.plan) &&
                                    info.plan
                                      .filter((plan) => plan.section === section.id)
                                      .map((filteredPlan) => (
                                        <p key={filteredPlan.id} className="text-gray-600">
                                          <strong>Subscription Plan:</strong> {`${filteredPlan.name} - ${filteredPlan.price}`}
                                        </p>
                                      ))}
                                </div>
                              ))}
                          </div>
                        ))}
                </div>
                </div>
              </div>
            </div>
          : "" }
    </>
  );
};

export default SearchMember;
