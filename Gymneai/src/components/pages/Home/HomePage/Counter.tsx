import React, { useState, useEffect } from 'react';

interface CounterProps {
  initialCount: number;
  title: string;
}

const Counter: React.FC<CounterProps> = ({ initialCount, title }) => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount + 1;

        // Stop the interval when reaching or exceeding the initial count
        if (newCount >= initialCount) {
          clearInterval(interval);
          return initialCount;
        }

        return newCount;
      });
    }, 40); // Adjust the interval duration (milliseconds) as needed

  }, [initialCount]); // Run the effect only when the initial count changes

  return (
    <div className='text-center flex flex-col items-center'>
      <p className='font-bold text-red-600 text-9xl mb-10'>{count}</p>
      <h2 className='text-white text-7xl'>{title}</h2>
    </div>
  );
};

export default Counter;
