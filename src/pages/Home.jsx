// src/pages/Home.jsx

import { useState } from 'react';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import TemplateModal from '../components/TemplateModal';
import { LayoutTemplate } from 'lucide-react';

export default function Home() {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* --- প্রিমিয়াম হিরো সেকশন --- */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          Professional Text to PDF Editor
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Create, edit, and export beautiful documents with ease. Choose a template and start writing.
        </p>
      </header>

      {/* --- টেমপ্লেট বাটন --- */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsTemplateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <LayoutTemplate className="h-4 w-4" />
          <span>Templates</span>
        </button>
      </div>

      {/* --- প্রধান এডিটর গ্রিড --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="transition-all duration-300 hover:shadow-2xl rounded-xl">
          <Editor />
        </div>
        <div>
          <Preview />
        </div>
      </div>

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </div>
  );
}