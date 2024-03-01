import { Outlet } from "react-router-dom";
import { ProgramTabs } from "./ProgramTabs";
import { ExerciseProvider } from "../../../../Providers/ExerciseContext";

export default function GymMembersProgramsLayout(){

    return(
    <div>
    <ExerciseProvider>
    <Outlet/>
    </ExerciseProvider>
    </div>
    );

}