// src/components/Navbar.jsx

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Navbar() {
  const location = useLocation();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Snap2PDF</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  location.pathname === '/'
                    ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/50'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Editor
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  location.pathname === '/about'
                    ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/50'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                About
              </Link>
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
}