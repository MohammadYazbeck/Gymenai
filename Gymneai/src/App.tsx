import { Route,createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import AuthService from './services/authService'
// Pages 

import HomePage from './components/pages/Home/HomePage/HomePage'
import SignIn from './components/pages/Home/Auth/Sign In/SignIn'
import GymInfo from './components/pages/Home/Auth/Sign Up/GymInfo'
import AddSection from './components/pages/Dashboard/Sections/AddSection'
import AddEmployee from './components/pages/Dashboard/Employees/AddEmployee'
import AddMember from './components/pages/Dashboard/Members/AddMember'
import EditGymInfo from './components/pages/Dashboard/EditInformation/EditGymInfo'
import EditPersonalInfo from './components/pages/Dashboard/EditInformation/EditPersonalInfo'
import Support from './components/pages/Dashboard/Support'
import PersonalInfo from './components/pages/Home/Auth/Sign Up/PersonalInfo'

import { HomeLayout } from './components/layout/HomeLayout'
import { DashboardLayout } from './components/layout/DashboardLayout'
import NotFound from './components/pages/NotFound'
import CreateProgram from './components/pages/Dashboard/CreateProgram/CreateProgram'
import Chest from './components/pages/Dashboard/CreateProgram/BodyParts/Chest'
import Back from './components/pages/Dashboard/CreateProgram/BodyParts/Back'
import Legs from './components/pages/Dashboard/CreateProgram/BodyParts/Legs'
import SignUpLayout from './components/pages/Home/Auth/Sign Up/SignUpLayout'
import Arms from './components/pages/Dashboard/CreateProgram/BodyParts/Arms'
import Shoulders from './components/pages/Dashboard/CreateProgram/BodyParts/Shoulders'
import ForgetPassword from './components/pages/Home/Auth/Forget Password/ForgetPassword'
import SetNewPassword from './components/pages/Home/Auth/Forget Password/SetNewPassword'
import VerificationCode from './components/pages/Home/Auth/VerificationCode'
import ViewGymSections from './components/pages/Dashboard/Sections/ViewGymSections'
import ViewGymMembers from './components/pages/Dashboard/Members/ViewGymMembers'
import SearchMember from './components/pages/Dashboard/Members/SearchMember'
import ViewGymEmployees from './components/pages/Dashboard/Employees/ViewGymEmployees'
import GymMembersPrograms from './components/pages/Dashboard/CreateProgram/GymMembersPrograms'
import GymMembersProgramsLayout from './components/pages/Dashboard/CreateProgram/GymMemebrsProgramsLayout'
import CreateProgramLayout from './components/pages/Dashboard/CreateProgram/CreateProgramLayout'
import SubmitProgram from './components/pages/Dashboard/CreateProgram/SubmitProgram'
import EditSection from './components/pages/Dashboard/Sections/EditSection'
import EditEmployee from './components/pages/Dashboard/Employees/EditEmployee'
import BlacklistedMembers from './components/pages/Dashboard/Members/BlacklistedMembers'
import GymQRCode from './components/pages/Dashboard/GymQRCode'
import NoAccess from './components/pages/NoAccess'
import WrittenPrograms from './components/pages/Dashboard/CreateProgram/WrittenPrograms'
import MembershipRequests from './components/pages/Dashboard/Members/MembershipRequests'
import AppPage from './components/pages/Home/AppPage'
import ViewGymRoleEmployees from './components/pages/Dashboard/Employees/ViewGymRoleEmployees'
import NearlyEndedSubs from './components/pages/Dashboard/Members/NearlyEndedSubs'
import About from './components/pages/Home/About'
import EditRoleEmployee from './components/pages/Dashboard/Employees/EditRoleEmployee'
// let role= AuthService.getRole()
const router = createBrowserRouter(createRoutesFromElements(
 <Route path='/'>

      <Route path='home' element={<HomeLayout/>}>
    {/* Home  */}
              <Route index element={<HomePage/>} />
              <Route path='app' element={<AppPage/>} />
              <Route path='about-us' element={<About/>} />
    {/* Sign-in */}
              <Route path='sign-in' element={<SignIn/>} />
              <Route path='sign-in/forget-password' element={<ForgetPassword/>} />
              <Route path='sign-in/forget-password/verification-code' element={<VerificationCode/>} />
              <Route path='sign-in/forget-password/reset-password' element={<SetNewPassword/>} />

    {/* {Forget Employee password} */}
              <Route path='forget-password' element={<ForgetPassword/>} />
              <Route path='forget-password/verification-code' element={<VerificationCode/>} />
              <Route path='forget-password/reset-password' element={<SetNewPassword/>} />



    {/* Sign-UP */}
              <Route path='sign-up' element={<SignUpLayout/>}>
                  <Route path='personal-info' element={<PersonalInfo/>} />
                  {/* <Route path='sub-plans' element={<SubPlans/>} /> */}
                  <Route path='gym-info' element={<GymInfo/>} />         
                  {/* <Route path='gym-sections-plans' element={<GymSections/>} /> */}
                  <Route path='verification-code' element={<VerificationCode/>} />
             </Route>
      </Route>

      <Route path='dashboard' element={
        (AuthService.getRole() === 'owner' || 
         AuthService.getRole() === 'reception' ||
         AuthService.getRole() === 'coach') ?<DashboardLayout/>: <NoAccess/>}>
        {/* <ProtectedRoute  path='dashboard' element={<DashboardLayout/>} allowedRoles={["owner","reception","coach"]}> */}

              {/* Sections  */}
               <Route path='add-section' element={AuthService.getRole() === 'owner' ?<AddSection/>: <NoAccess/>} />
              <Route path='gym-sections' element={AuthService.getRole() === 'owner' ?<ViewGymSections/>: <NoAccess/>} />
              <Route path='gym-sections/edit-section' element={AuthService.getRole() === 'owner' ?<EditSection/>: <NoAccess/>} />

              {/* Members  */}
              {/* <Route path='add-member' element={<AddMember/>}/> */}
              <Route path='gym-members' element={AuthService.getRole() === 'owner' ?<ViewGymMembers/>:<NoAccess/>}/>
              <Route path='nearly-ended-subs' element={(AuthService.getRole() === 'owner'|| AuthService.getRole()==='reception') ?<NearlyEndedSubs/>:<NoAccess/>}/>
              <Route path='membership-requests' element={
                (AuthService.getRole() === 'owner' || AuthService.getRole() === 'reception') 
                ?<MembershipRequests/>:<NoAccess/>}/>
              <Route path='gym-members/blacklisted-members' element={AuthService.getRole() === 'owner' ?<BlacklistedMembers/>:<NoAccess/>}/>
              <Route path='search-member' element={AuthService.getRole() === 'reception' ?<SearchMember/>:<NoAccess/>}/>

             {/* Employees  */}
              <Route path='add-employee' element={AuthService.getRole() === 'owner' ?<AddEmployee/>:<NoAccess/>} />

              <Route path='gym-employees' element={AuthService.getRole() === 'owner' ?<ViewGymEmployees/>:<NoAccess/>} />
              <Route path='gym-employees/edit-employee-info' element={AuthService.getRole() === 'owner' ?<EditEmployee/>:<NoAccess/>} />

              <Route path='role-employees' element={AuthService.getRole() === 'owner' ?<ViewGymRoleEmployees/>:<NoAccess/>} />
              <Route path='role-employees/edit-roleemployee-info' element={AuthService.getRole() === 'owner' ?<EditRoleEmployee/>:<NoAccess/>} />


             {/* Edit Informatiion  */}
              <Route path='edit-gym-info' element={AuthService.getRole() === 'owner' ?<EditGymInfo/>:<NoAccess/>} />
              <Route path='edit-personal-info' element={AuthService.getRole() === 'owner' ?<EditPersonalInfo/>:<NoAccess></NoAccess>} />
             {/* Support  */}
              <Route path='support' element={AuthService.getRole() === 'owner' ?<Support/>:<NoAccess/>} />

              {/* Support  */}
              <Route path='qr-code' element={<GymQRCode/>} />

             {/* Coach Section*/}
              <Route path='gym-members-programs' element={AuthService.getRole() === 'coach' ?<GymMembersProgramsLayout/>:<NoAccess/>}>
                  <Route index element={<GymMembersPrograms/>} />
                  <Route path='written-programs' element={<WrittenPrograms/>}/>
                  <Route path='written-programs/submit-program' element={<SubmitProgram/>}/>


                  {/* {CREATE PROGRAM} */}
                  <Route path='create-program' element={<CreateProgramLayout/>}>
                          <Route index element={<CreateProgram/>}/>
                          <Route path='arms' element={<Arms/>}/>
                          <Route path='chest' element={<Chest/>}/>
                          <Route path='back' element={<Back/>}/>
                          <Route path='legs' element={<Legs/>}/>
                          <Route path='shoulders' element={<Shoulders/>}/>
                          <Route path='submit-program' element={<SubmitProgram/>}/>
                  </Route>

                  {/* {EDIT PROGRAM} */}
                  <Route path='edit-program' element={<CreateProgramLayout/>}>
                          <Route index element={<CreateProgram/>}/>
                          <Route path='arms' element={<Arms/>}/>
                          <Route path='chest' element={<Chest/>}/>
                          <Route path='back' element={<Back/>}/>
                          <Route path='legs' element={<Legs/>}/>
                          <Route path='shoulders' element={<Shoulders/>}/>
                          <Route path='submit-program' element={<SubmitProgram/>}/>
                  </Route>
              </Route>
              {/* </ProtectedRoute> */}
      </Route>
      <Route path='*' element={<NotFound/>}></Route>
      <Route path='no-access' element={<NoAccess/>}></Route>

 </Route>
))

function App() {
  return (

<RouterProvider router={router}/>
  )
}

export default App














//     <>
//     <BrowserRouter>
//     <main>
//       <ScrollToTop/>
//         <Routes>
//           {/* Home */}

//           <Route index element={<><Header/><HomePage/><Footer/></>} />
//           <Route path='platform' element={<><Header/><HomePage/><Footer/></>} />
//           <Route path='app' element={<><Header/><HomePage/><Footer/></>} />
//           <Route path='about-us' element={<><Header/><HomePage/><Footer/></>} />

//           {/* Sign-in */}
//           <Route path='sign-in' element={<><Header/><SignIn/><Footer/></>} />

//           {/* Sign-UP */}

//           <Route path='sign-up' element={<><Header/><SignUpTabs activeTab='tab1' /><SignUp/><Footer/></>} />
//           <Route path='sign-up/sub-plans' element={<><Header/><SignUpTabs activeTab='tab2' /><SubPlans/><Footer/></>} />
//           <Route path='sign-up/gym-info' element={<><Header/><SignUpTabs activeTab='tab3' /><GymInfo/><Footer/></>} />
//           <Route path='sign-up/gym-sections-plans' element={<><Header/><SignUpTabs activeTab='tab4' /><GymSections/><Footer/></>} />
//           <Route path='sign-up/verification-code' element={<><Header/><SignUpTabs activeTab='tab5' /><VerificationCode/><Footer/></>} />

//           {/* Dashboard */}

          // {/* <Route path='dashboard' element={<><Dashboard_SidebarOwner/></>} /> */}

          //     {/* Sections  */}
          //     <Route path='dashboard/add-section' element={<div className='flex'><Dashboard_SidebarOwner/><div className='flex-grow justify-center'><AddSection/></div></div>} />

          //     {/* Members  */}
          //     <Route path='dashboard/add-member' element={<div className='flex'><Dashboard_SidebarOwner/><div className='flex-grow justify-center'><AddMember/></div></div>} />

          //    {/* Employees  */}
          //     <Route path='dashboard/add-employee' element={<div className='flex'><Dashboard_SidebarOwner/><div className='flex-grow justify-center'><AddEmployee/></div></div>} />

          //    {/* Edit Informatiion  */}
          //     <Route path='dashboard/edit-gym-info' element={<div className='flex'><Dashboard_SidebarOwner/><div className='flex-grow justify-center'><EditGymInfo/></div></div>} />
          //     <Route path='dashboard/edit-personal-info' element={<div className='flex'><Dashboard_SidebarOwner/><div className='flex-grow justify-center'><EditPersonalInfo/></div></div>} />


          //    {/* Support  */}
          //     <Route path='dashboard/support' element={<div className='flex'><Dashboard_SidebarOwner/><div className='flex-grow justify-center'><Support/></div></div>} />




//               {/* <Route  path='dashboard' element={<><Dashboard_SidebarCoach/></>} /> */}
//               {/* <Route  path='dashboard' element={<><Dashboard_SidebarEmployee/></>} /> */}





//        </Routes>
//     </main>
//     </BrowserRouter>
    
// </>