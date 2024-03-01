import { BeatLoader } from 'react-spinners';
import { useState } from 'react';

function Loader() {
  const loading =true;
  return (
    <div className='w-screen h-[100%] bg-black opacity-[89%] fixed flex items-center justify-center top-0 z-50'>
        <div className='flex flex-col items-center justify-center'>
            
                <div> <BeatLoader
                color='red'
                loading={loading}
                size={30}
                aria-label='Loading Spinner'
                data-testid="loader"                
                /></div>
               
        </div>
    </div>
  );
}

export default Loader;
