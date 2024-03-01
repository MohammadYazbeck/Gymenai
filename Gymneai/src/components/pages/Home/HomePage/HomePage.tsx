import '../../../../assets/style.css'; 
import ReactTyped from "react-typed";
import Features from './Features';
import { NavLink } from 'react-router-dom';


function HomePage() {
  return (
    <div className="parent w-[100vw]">
      <div className="child ">
       <div className='main-section-container-image '>
        <div className="main-section-container flex justify-around ">
            <div className='px-[1rem] hidden pt-[25rem] 2xl:flex'>
               <div className='main-laptop-image '></div>
            </div>
            <div className='flex flex-col items-start justify-center max-w-[40rem] px-10'>
                  <h1 className='main-section-text ml-6 mb-20'>
                  Manage Your Gym {''}
              <ReactTyped
                strings={ ['Smarter', 'Better', 'Cleaner','Faster']}
                typeSpeed={130}
                loop
                className='text-red-600'
                backSpeed={40}
                cursorChar="|"
                showCursor={true}
              />
                      </h1>
                    <div className='px-[2rem] text-3xl text-gray-400 text-left max-w-[45rem] '> 
                            
                            <strong className='text-red-600 '>GymneAi {''}</strong> 
                            <ReactTyped
                              strings={ ['is an integrated platform for gym owners to manage their gym in a modern and efficient way. And for members to help them in their training journey.']}
                              typeSpeed={10}
                              backSpeed={40}
                              cursorChar="|"
                              showCursor={false}
                            />
                            <div className='flex ml-44'>

                            <NavLink to="/home/sign-in">
                            <div className=' mt-[8rem] mr-5 w-[12rem] text-white border border-gray-500 font-bold text-xl text-center px-8  py-[1rem] bg-transparent opacity-[80%] rounded-3xl hover:border-red-600 hover:text-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                               LOGIN
                            </div>
                            </NavLink>

                            <NavLink to="/home/sign-up/personal-info">
                            <div className=' mt-[8rem]  w-[12rem] text-black font-bold text-xl text-center px-8  py-[1rem] bg-white opacity-[80%] rounded-3xl hover:bg-red-700 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                               SIGN UP
                            </div>
                            </NavLink>
                            
                            </div>
                    </div> 
                </div>
            </div>
        </div>
      </div>

      <div className="child child1-bg">
       <div className='flex-column w-[58.5rem] h-[100vh] ml-[10rem] px-[1rem] pt-[15rem] bg-black opacity-[85%]'>
                  <h1 className="main-section-text ml-[6rem] mb-10">
                      <ReactTyped
                    strings={ ['   Efficient Gym Management']}
                    typeSpeed={100}
                    className='text-red-600 font-bold'
                    cursorChar="|"
                    showCursor={false}
                  />      
                   </h1>
                  <div className='px-[2rem] py-9 text-3xl text-gray-500 text-left w-[45rem] ml-20'> 
                  Streamline and automate gym management processes to enhance efficiency for gym owners, including section management, employee management, and member administration.
                   </div>  
        </div>
      </div>

      <div className="child child2-bg">
        <div className='flex items-center justify-end'>
          <div className='flex-column w-[58.5rem] h-[100vh] mr-[10rem] pt-[15rem] bg-black opacity-[85%]'>
                  <h1 className="main-section-text ml-[6rem]  mb-10">
                  <ReactTyped
                    strings={ ["Support and Communication",]}
                    typeSpeed={100}
                    className='text-red-600 font-bold'
                    cursorChar="|"
                    showCursor={false}
                  />     
                   </h1>
                   <div className='px-[2rem] py-9 text-3xl text-gray-500 text-left w-[45rem] ml-20'> 
                    Provide a robust support system for gym owners, allowing them to easily manage member requests, contact support, and efficiently communicate with both employees and members for a seamless gym experience.
                    </div>  
            </div>
          </div>
        </div>

        <div className="child child3-bg ">
            <Features/>
        </div>

      </div>
  );
}

export default HomePage;
