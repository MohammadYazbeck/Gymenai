import React, { FormEvent, useState } from 'react';

interface SupportData {
  title: string;
  explanation: string;
}

const Support: React.FC = () => {
  const [supportData, setSupportData] = useState<SupportData>({
    title: '',
    explanation: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setSupportData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting support data:', supportData);
    setSupportData({
      title: '',
      explanation: '',
    });
  };

  return (
    <>
      <form className="lg:w-full" onSubmit={handleSubmit}>
        <div className="ml-60 space-y-12 px-20 mt-28 lg:pl-60">
          <div className="pb-12">
            <h2 className="font-semibold leading-7 text-red-600 text-2xl">Support</h2>
            <p className="mt-1 text-mm leading-6 text-gray-600">Submit your support request below</p>

            <div className="mt-2 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              {/* You may add specific inputs for support if needed */}
            </div>

            <div className="mt-20 pb-28 border-b border-gray-400/10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <p className="text-lg leading-6 text-gray-400 pb-8 font-bold">Provide Your Information</p>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="support-title" className="block text-md font-medium leading-6 text-gray-400">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="support-title"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    value={supportData.title}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="support-explanation" className="block text-md font-medium leading-6 text-gray-400">
                  Explanation
                </label>
                <div className="mt-2">
                  <textarea
                    id="support-explanation"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-md sm:leading-6 bg-white font-bold"
                    onChange={(e) => handleInputChange('explanation', e.target.value)}
                    rows={4}
                    value={supportData.explanation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-20 lg:px-60 mb-14 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="w-20 rounded-md bg-red-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Support;
