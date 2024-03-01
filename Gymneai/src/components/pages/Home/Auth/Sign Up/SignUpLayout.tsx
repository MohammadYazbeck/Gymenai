import { Outlet } from "react-router-dom";
import { SignUpTabs } from "./SignUpTabs";
import { RegisterProvider } from "../../../../../Providers/RegisterContext";

export default function SignUpLayout(){

    return(
    <div>
    <SignUpTabs/>
    <RegisterProvider>
     <Outlet/>   
     </RegisterProvider>
    </div>
    );

}