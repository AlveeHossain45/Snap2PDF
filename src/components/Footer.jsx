// src/components/Footer.jsx

import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-4 mt-10">
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Designed & Developed with ♥ by{' '}
          <a
            href="https://onexero.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-600 hover:text-primary-500 transition-colors"
          >
            onexero
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;