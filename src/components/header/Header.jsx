import React, { useState, useEffect } from 'react';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#user-menu-button') && !event.target.closest('#user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://karmatech.ae/theme/images/clients-logo/client-sxx/KTLogo.png" className="h-8" alt="Flowbite Logo" />
        </a>
      </div>
    </nav>
  );
}

export default Header;
