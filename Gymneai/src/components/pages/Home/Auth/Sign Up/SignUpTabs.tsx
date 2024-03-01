import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';

interface TabData {
  label: string;
  value: string;
}

export function SignUpTabs() {
  const data: TabData[] = [
    {
      label: "Personal Information",
      value: "tab1",
    },
    {
      label: "Verification Code",
      value: "tab2",
    },
    {
      label: "Gym Information",
      value: "tab3",
    },
  ];

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('/home/sign-up/personal-info')) return 'tab1';
    if (path.includes('/home/sign-up/gym-info')) return 'tab3';
    if (path.includes('/home/sign-up/verification-code')) return 'tab2';
    return ''; // Default value
  });

  const activeTabIndex = data.findIndex((tab) => tab.value === activeTab);

  useEffect(() => {
    // Update the active tab when the location changes
    const path = location.pathname;
    if (path.includes('/home/sign-up/personal-info')) setActiveTab('tab1');
    else if (path.includes('/home/sign-up/verification-code')) setActiveTab('tab2');
    else if (path.includes('/home/sign-up/gym-info')) setActiveTab('tab3');
  }, [location.pathname]);

  return (
    <div className='mt-[5.5rem]'>
      <Tabs value={activeTab} className="h-14 mb-20">
        {/* @ts-ignore */}
        <TabsHeader
          className="w-screen px-20 lg:px-40 py-3 fixed !bg-opacity-100 tabscolor"
          indicatorProps={{
            className: "bg-red-600 h-0.5 shadow-none  rounded-none mt-16 lg:mt-13",
            style: {
              width: `${(300 * (activeTabIndex + 1)) / data.length}%`, // Correct the width calculation
            },
          }}
        >
          {data.map(({ label, value }) => (
            // @ts-ignore
            <Tab
              key={value}
              value={value}
              className={activeTab === value ? "text-gray-300 font-bold font-base " : "text-gray-700 font-bold font-base"}
              style={{ cursor: 'none', opacity: 1 }}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
}
