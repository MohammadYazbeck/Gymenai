import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


interface MemberData {
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalId: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthdate: string;
  sections: string;
  subscriptionPlans: string;
}

const AddMember: React.FC = () => {
  const [memberData, setMemberData] = useState<MemberData>({
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalId: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birthdate: '',
    sections: '',
    subscriptionPlans: '',
  });

  const handleInputChange = (field: keyof MemberData, value: string) => {
    setMemberData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // Your logic for handling form submission goes here
  // };
  return (
    <>
      <form className="lg:w-full">
        <div className="ml-60 space-y-12 px-20 mt-28 lg:pl-60">
          <div className="pb-12">
            <h2 className="font-semibold leading-7 text-red-600 text-2xl">Add a Member</h2>
            <p className="mt-1 text-mm leading-6 text-gray-600">
              Please provide information about the new member
            </p>

            <div className="mt-2 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              {/* Add specific inputs for the new member if needed */}
            </div>

            <div className="mt-20 pb-28 border-b border-gray-400/10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <p className="text-lg leading-6 text-gray-400 pb-8 font-bold">Member Information</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-first-name" className="block text-md font-medium leading-6 text-gray-400">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-last-name" className="block text-md font-medium leading-6 text-gray-400">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-last-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-father-name" className="block text-md font-medium leading-6 text-gray-400">
                  Father's Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-father-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-national-id" className="block text-md font-medium leading-6 text-gray-400">
                  National ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-national-id"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-email" className="block text-md font-medium leading-6 text-gray-400">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-email"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-phone-number" className="block text-md font-medium leading-6 text-gray-400">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-phone-number"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-gender" className="block text-md font-medium leading-6 text-gray-400">
                  Gender
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-gender"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-birthdate" className="block text-md font-medium leading-6 text-gray-400">
                  Birthdate
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-birthdate"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-sections" className="block text-md font-medium leading-6 text-gray-400">
                  Sections
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-sections"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('sections', e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="member-subscription-plans" className="block text-md font-medium leading-6 text-gray-400">
                  Subscription Plans
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="member-subscription-plans"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('subscriptionPlans', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-20 lg:px-60 mb-14 flex items-center justify-end gap-x-6">
          <NavLink to="/sign-up/gym-info">
            <button type="button" className="text-md font-semibold leading-6 text-white hover:text-red-600">
              Back
            </button>
          </NavLink>
          <button
            type="submit"
            className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Save
          </button>
          <NavLink to="/sign-up/verification-code">
            <button
              type="submit"
              className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Skip
            </button>
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default AddMember;
