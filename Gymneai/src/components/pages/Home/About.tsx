import ReactTyped from "react-typed";

function About() {
  return (
    <div className="parent w-screen h-screen overflow-y-scroll">
      <div className="child child3-bg">
        <div className='flex flex-col items-center w-screen h-screen px-28 pt-[10rem] bg-black bg-opacity-85 text-white'>
          <h1 className="main-section-text text-3xl mb-1">
            <ReactTyped
              strings={['About Us']}
              typeSpeed={100}
              className='text-gray-300 font-bold'
              cursorChar="|"
              showCursor={false}
            />
          </h1>
          <div className='px-10 py-10 text-xl text-gray-300 text-center max-w-screen-xl mx-auto'>
            <p>
              Welcome to Gymenai - Redefining Gym Management
              At Gymenai, we're on a mission to revolutionize the fitness management landscape. Our team is dedicated to providing an innovative and comprehensive solution that addresses the challenges faced by gym owners, employees, and members.
            </p>
            <br/>
            <br/>

            <p>
              <strong className='text-3xl text-gray-300 '>Our Vision</strong>
              <br /><br/>
              <em>Empowering Fitness, Connecting Communities</em><br />
              We envision a future where gym management is seamless, interactive, and tailored to the needs of both owners and members. Gymenai is committed to creating a holistic platform that transforms the fitness experience.
            </p>
         
            <p>
            <br/>
            <br/>


              <strong className='text-3xl text-gray-300'>Meet the Team</strong><br /><br />
              Get to know the passionate individuals behind Gymenai. Our team comprises experienced professionals in fitness management, technology, and customer support. Together, we work tirelessly to bring you a platform that meets the highest standards of excellence.
            </p>
            <br/>
            <br/>

            <p>
              <strong className='text-3xl text-gray-300'>Join Us on the Fitness Journey</strong><br /><br />
              Whether you're a gym owner looking for advanced management tools or a fitness enthusiast seeking an interactive workout experience, Gymenai welcomes you. Join us as we redefine the fitness landscape and create a connected community of fitness enthusiasts.
            </p>
          </div>
          <div className='flex flex-col mt-40'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
