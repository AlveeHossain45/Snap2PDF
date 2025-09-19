// src/components/Editor.jsx

import { useEditor } from '../context/EditorContext';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';

// --- কুইলকে নতুন ফন্ট ফ্যামিলি চেনানোর জন্য এই অংশটি জরুরি ---
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'georgia', 'helvetica', 'impact', 'courier-new'];
Quill.register(Font, true);
// --- কনফিগারেশন শেষ ---

export default function Editor() {
  const { state, dispatch } = useEditor();

  const handleContentChange = (content) => {
    dispatch({ type: 'SET_CONTENT', payload: content });
  };

  // মডিউল কনফিগারেশন আপডেট করুন
  const modules = {
    toolbar: {
      container: "#toolbar", // আমাদের কাস্টম টুলবারের ID এখানে দিন
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white">
      <CustomToolbar /> {/* আমাদের কাস্টম টুলবার এখানে রেন্ডার করুন */}
      <ReactQuill
        theme="snow" // থিম "snow" রাখতে হবে, কিন্তু টুলবার দেখাবে না কারণ আমরা container指定করেছি
        value={state.content}
        onChange={handleContentChange}
        modules={modules}
        style={{ 
          height: '420px', 
          color: state.theme === 'dark' ? 'white' : 'black'
        }}
        className="custom-quill-editor"
      />
    </div>
  );
}