// src/App.jsx

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { EditorProvider, useEditor } from './context/EditorContext';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ধাপ ১: একটি নতুন কম্পোনেন্ট তৈরি করুন যা Context ব্যবহার করবে
function AppContent() {
  // এই কম্পোনেন্টটি EditorProvider-এর ভেতরে থাকায় useEditor() সঠিকভাবে কাজ করবে
  const { state } = useEditor();

  // থিম পরিবর্তনের লজিকটি এখন এখানে থাকবে
  useEffect(() => {
    const root = window.document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]); // যখনই state.theme পরিবর্তন হবে, এই কোডটি রান করবে

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// ধাপ ২: মূল App কম্পোনেন্টটি শুধু Provider এবং AppContent রেন্ডার করবে
function App() {
  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
}

export default App;