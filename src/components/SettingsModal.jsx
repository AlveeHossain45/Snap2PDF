// src/components/SettingsModal.jsx

import { useEditor } from '../context/EditorContext';
import { X, Sun, Moon } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const { state, dispatch } = useEditor();

  if (!isOpen) return null;

  const handleThemeChange = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all formatting settings?')) {
      dispatch({ type: 'RESET_SETTINGS' });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Settings</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div>
            <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">Appearance</h4>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
              <span className="font-medium text-slate-700 dark:text-slate-300">Theme</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`p-2 rounded-lg transition-colors ${state.theme === 'light' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                  title="Light Mode"
                >
                  <Sun className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-2 rounded-lg transition-colors ${state.theme === 'dark' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                  title="Dark Mode"
                >
                  <Moon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Editor Settings */}
          <div>
            <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">Editor</h4>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg opacity-60">
              <label htmlFor="autoSave" className="text-slate-700 dark:text-slate-300">Auto-Save (coming soon)</label>
              <input type="checkbox" id="autoSave" disabled className="cursor-not-allowed" />
            </div>
          </div>
          
          {/* Reset Settings */}
          <div>
            <button
              onClick={handleReset}
              className="w-full text-left text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-lg transition-colors font-medium"
            >
              Reset All Formatting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}