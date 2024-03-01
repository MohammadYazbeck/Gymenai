import { BsPersonGear ,BsLightningCharge, BsRobot, BsFillShieldLockFill, BsWindow} from "react-icons/bs";
import Counter from "./Counter";

interface FeaturesProps {}

const Features: React.FC<FeaturesProps>=()=>{
const size= 50;

return(
<div className="flex flex-col items-center justify-around h-[100vh]">
       <div className="mt-[15rem] flex flex-row justify-around w-full">
        <Counter
        title="GYM OWNER"
        initialCount={100}
        />  
         <Counter
        title="EMPLOYEE"
        initialCount={600}
        />  
         <Counter
        title="GYM MEMBER"
        initialCount={1200}
        />  
        </div>


        <div className=" flex items-center justify-center text-center w-full h-[15rem]  font-bold  py-[2rem] bg-white opacity-[80%] text-md">
                <div className={"w-[20vw] text-black  hover:text-red-600 hover:text-xl"}>
                <div className="flex flex-col items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  ">
                <BsPersonGear
                className=" w-[4rem] h-[4rem] hover:w-[5rem] hover:h-[5rem] hover:text-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  mb-4 "
                />
                <p>User Exeprcience</p>

                </div> 
                </div>

                <div className={" w-[20vw] text-black  hover:text-red-600 hover:text-xl"}>
                <div className="flex flex-col items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
            <BsLightningCharge
            className="w-[4rem] h-[4rem] hover:w-[5rem] hover:h-[5rem] hover:text-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  mb-4"
            />
            <p>High Performance</p>
                </div> 
                
                </div>

                <div className={" w-[20vw] text-black  hover:text-red-600 hover:text-xl"}>
                <div className="flex flex-col items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
            <BsRobot
            className="w-[4rem] h-[4rem] hover:w-[5rem] hover:h-[5rem] hover:text-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  mb-4"
            /> 
            <p>AI Integration</p>
                </div> 
               
                </div>

                <div className={" w-[20vw] text-black  hover:text-red-600 hover:text-xl"}>
                <div className="flex flex-col items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
            <BsFillShieldLockFill
            className="w-[4rem] h-[4rem] hover:w-[5rem] hover:h-[5rem] hover:text-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  mb-4"
            />
            <p>High Security</p>
                </div> 
                
                </div>

                <div className={" w-[20vw] text-black  hover:text-red-600 hover:text-xl "}>
                <div className="flex flex-col items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
            <BsWindow
            className="w-[4rem] h-[4rem] hover:w-[5rem] hover:h-[5rem] hover:text-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  mb-4"
            />
            <p>Usability</p>
                </div> 
                
                </div>
                
        </div>
</div>
)
}
export default Features;