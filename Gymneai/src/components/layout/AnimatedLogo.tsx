import React, { useState } from 'react';

const AnimatedLogo = () => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div className="relative">
      {/* GIF Image */}
      <img
        className={`h-[5.5rem] w-[5rem]  fixed left-[6rem] transition duration-300 ease-in-out opacity-${isHovered ? '100' : '0'}`}
        src="src/assets/images/logo.gif"
        alt="logo"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      {/* PNG Image */}
      <img
        className={`h-[3.8rem] mt-2 w-[3.8rem] fixed left-[6.4rem] transition duration-300 ease-in-out opacity-${isHovered ? '0' : '100'}`}
        src="src/assets/images/logo.png"
        alt="logo"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
};

export default AnimatedLogo;
