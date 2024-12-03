"use client";
import React, { useState, useEffect } from 'react';
import { MobileNav } from './MobileNav';
import NormalNav from './NormalNav';

const LargeScreenComponent = () => {
  return <NormalNav />;
};

const SmallScreenComponent = () => {
  return <MobileNav />;
};

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkScreenSize = () => {
    if (window.innerWidth <= 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    // Initial check on mount
    checkScreenSize();

    // Update screen size on window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div>
      {isSmallScreen ? <SmallScreenComponent /> : <LargeScreenComponent />}
    </div>
  );
};

export default Navbar;
