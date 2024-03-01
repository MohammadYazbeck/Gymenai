import '../../../assets/style.css';
import { useEffect, useRef, useState } from 'react';
import apiService from '../../../services/apiService';
import AuthService from '../../../services/authService';
import { useToasts } from 'react-toast-notifications';

interface Data {
  activememeber: number;
  capacity: number;
}

function ActiveMembers() {
  const [data, setData] = useState<Data>();
  const prevActiveMembersRef = useRef<number | null>(null);
  const { addToast } = useToasts();

  const showNotification = () => {
    addToast('A new member has entered the gym!', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimout:10000,
      style: {
        background: '#000', 
        color: '#fff',
        borderRadius: '8px',
      },
    });
  };
  

  const fetchData = async () => {
    try {
      const response = await apiService.get(`gymactive/${AuthService.getgymid()}`);
      if (response.status === 200) {
        const currentActiveMembers = response.data.activememeber;

        if (prevActiveMembersRef.current !== null && currentActiveMembers > prevActiveMembersRef.current) {
          showNotification();
        }

        setData(response.data);
        prevActiveMembersRef.current = currentActiveMembers;

        console.log('RESPONSE', response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
       <>
      <div className='flex items-center justify-between px-8'>
        <p className='text-gray-600'>Active Members</p>
        <p className='font-bold text-green-600'>{data?.activememeber}</p>
      </div>
      <div className='flex items-center justify-between px-8'>
        <p className='text-gray-600'>Gym Capacity</p>
        <p className='font-bold text-gray-500'>{data?.capacity}</p>
      </div>
      <div className='flex items-center justify-between px-8'>
        <p className='text-gray-600'>Status</p>
        <p
          className={`"font-bold text-gray-500" ${
            ((data?.activememeber! / data?.capacity!) === 0) ? ''
              : ((data?.activememeber! / data?.capacity!) <= 0.5) ? 'text-green-600'
              : ((data?.activememeber! / data?.capacity!) > 0.5 && (data?.activememeber! / data?.capacity!) <= 0.8) ? 'text-orange-600'
                : ((data?.activememeber! / data?.capacity!) > 0.8 && (data?.activememeber! / data?.capacity!) < 1) ? 'text-red-600'
                  : ((data?.activememeber! / data?.capacity!) === 1) ? 'text-red-600'
                    : ''
          }`}
        >
          {((data?.activememeber! / data?.capacity!) === 0) ? 'Empty'
            : ((data?.activememeber! / data?.capacity!) <= 0.5) ? 'Not Crowded'
              : ((data?.activememeber! / data?.capacity!) > 0.5 && (data?.activememeber! / data?.capacity!) <= 0.8) ? 'Crowded'
                : ((data?.activememeber! / data?.capacity!) > 0.8 && (data?.activememeber! / data?.capacity!) < 1) ? 'Almost Full'
                  : ((data?.activememeber! / data?.capacity!) === 1) ? 'Full'
                    : ''
          }
        </p>
      </div>
    </>
  );
}

export default ActiveMembers;
