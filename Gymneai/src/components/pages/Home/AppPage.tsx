import '../../../assets/style.css'; // Import a separate CSS file for styling
import ReactTyped from "react-typed";
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';


function AppPage() {

  const secondChildRef = useRef();

  const scrollToSecondChild = () => {
    secondChildRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="parent w-[100vw]">
      <div className="child ">
       <div className=' main-section-container-image '>
        <div className="main-section-container flex justify-center ">
            <div className='px-[1rem] hidden pt-[14rem] 2xl:flex absloute'>
               <div className='main-mobile-image1'></div>
            </div>
            <div className='px-[1rem] hidden pt-[19rem] 2xl:flex relative right-[9rem]'>
               <div className='main-mobile-image2'></div>
            </div>
            <div className='flex flex-col  justify-center max-w-[40rem] px-10'>
                  <h1 className='main-section-text ml-6 mb-20'>
                  Your Daily Helper..  {<br></br>}For  Your Training {''}
              <ReactTyped
                strings={['Journey']}
                typeSpeed={130}
                className='text-red-600'
                backSpeed={40}
                cursorChar="|"
                showCursor={true}
              />
                      </h1>
                    <div className='px-[2rem] text-3xl text-gray-400 text-left max-w-[45rem] '> 
                            <strong className='text-red-600 '>GymneAi {''}</strong> 
                            <ReactTyped
                              strings={ [' App provides you the functionalty to choose your gym, ineract with your coach and powerfull AI tool to help you with you training proccess.']}
                              typeSpeed={10}
                              backSpeed={40}
                              cursorChar="|"
                              showCursor={false}
                            />
                            <div className='flex ml-[20rem]'>

                            <div className=' mt-[8rem]  w-[12rem] text-black font-bold text-xl text-center px-8  py-[1rem] bg-white opacity-[80%] rounded-3xl hover:bg-red-700 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
                            onClick={scrollToSecondChild}>
                               Try it Now
                            </div>
                            
                            </div>
                    </div> 
                </div>
            </div>
        </div>
      </div>

      <div className="child child3-bg" ref={secondChildRef}>
       <div className='flex flex-col items-center w-[100vw] h-[100vh]  px-[1rem] pt-[15rem] bg-black opacity-[85%]'>
                  <h1 className="main-section-text texml-[6rem] mb-1">
                      <ReactTyped
                    strings={ ['DOWNLOAD NOW!']}
                    typeSpeed={100}
                    className='text-red-600 font-bold'
                    cursorChar="|"
                    showCursor={false}
                  />      
                   </h1>
                  <p className='text-gray-600 text-lg font-bold mb-8'>(Gymnai App v.0.0.1)</p>
                  <div className='px-[2rem] py-9 text-3xl text-gray-300 text-center w-[60rem] ml-20'> 
                  Gymnai App created using flutter framework wich make it avaliable for both Android and IOS.
                   </div>  
          <div className=' flex flex-col mt-40'>
          <p className='text-gray-400 text-center font-bold mb-5 text-lg'>Click to Download</p>

            <div className='py-[1rem]'>
            <button className='w-[20rem] h-[4.7rem] bg-gray-300 rounded-3xl text-black font-bold text-4xl flex items-center hover:bg-green-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
              <div className='android-image ml-4'></div>
              <p className='ml-10'>Android</p>
            </button>
            </div>


            <div className='py-[1rem]'>
            <button className='w-[20rem] h-[4.7rem] bg-gray-300 rounded-3xl text-black font-bold text-4xl flex items-center hover:bg-gray-800 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
              <div className='apple-image'></div>
              <p className='ml-16 mt-1'>iOS</p>
            </button>
            </div>


          </div>
                  

        </div>
      </div>
      </div>
  );
}

export default AppPage;
