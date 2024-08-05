import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 fixed bottom-0 left-0 w-full">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Karma Technologies LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
