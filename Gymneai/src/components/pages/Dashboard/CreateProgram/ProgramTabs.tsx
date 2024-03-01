import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const getActiveTabFromPath = (path) => {
  if (path.includes('/dashboard/gym-members-programs/create-program/arms') || path.includes('/dashboard/gym-members-programs/edit-program/arms')) return 'tab2';
  if (path.includes('/dashboard/gym-members-programs/create-program/chest') || path.includes('/dashboard/gym-members-programs/edit-program/chest')) return 'tab3';
  if (path.includes('/dashboard/gym-members-programs/create-program/back') || path.includes('/dashboard/gym-members-programs/edit-program/back')) return 'tab4';
  if (path.includes('/dashboard/gym-members-programs/create-program/legs') || path.includes('/dashboard/gym-members-programs/edit-program/legs')) return 'tab5';
  if (path.includes('/dashboard/gym-members-programs/create-program/shoulders') || path.includes('/dashboard/gym-members-programs/edit-program/shoulders')) return 'tab6';
  if (path.includes('/dashboard/gym-members-programs/create-program/submit-program') || path.includes('/dashboard/gym-members-programs/edit-program/submit-program')) return 'tab7';
  return 'tab1'; // Default value for the "Create Program" tab
};

export function ProgramTabs() {
  const location = useLocation();
  const data = [
    {
      label: `${location.pathname==="/dashboard/gym-members-programs/create-program"?"Create ":"Edit "}Program`,
      value: "tab1",
    },
    {
      label: "Arms",
      value: "tab2",
    },
    {
      label: "Chest",
      value: "tab3",
    },
    {
      label: "Back",
      value: "tab4",
    },
    {
      label: "Legs",
      value: "tab5",
    },
    {
      label: "Shoulders",
      value: "tab6",
    },
    {
      label: "Submit",
      value: "tab7",
    },
  ];



  const [activeTab, setActiveTab] = useState(() => getActiveTabFromPath(location.pathname));
  const activeTabIndex = data.findIndex((tab) => tab.value === activeTab);

  useEffect(() => {
    // Update the active tab when the location changes
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <Tabs value={activeTab} className="h-14 ml-52"> 
      <TabsHeader
        className="w-full lg:px-40 py-3 mb-20 fixed !bg-opacity-100 tabscolor"
        indicatorProps={{
          className: "bg-red-600 h-1 shadow-none rounded-none mt-16 lg:mt-13",
          style: {
            width: `${700 * (activeTabIndex + 1) / data.length}%`,
          },
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            className={activeTab === value ? "text-gray-300 font-bold font-base" : "text-gray-700 font-bold font-base"}
            style={{ cursor: 'none', opacity: 1 }}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
