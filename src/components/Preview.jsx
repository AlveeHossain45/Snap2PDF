// src/components/Preview.jsx

import { useRef, useEffect } from 'react';
import { useEditor } from '../context/EditorContext';
import { useEditorTools } from '../hooks/useEditor';
import { Download, FileText } from 'lucide-react';

export default function Preview() {
  const { state, dispatch } = useEditor();
  const { isProcessing, exportToPDF, exportToTXT, wordCount, charCount, calculateStats } = useEditorTools();
  const previewRef = useRef(null);

  useEffect(() => {
    calculateStats(state.content);
  }, [state.content, calculateStats]);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    await exportToPDF(previewRef.current, {
      fileName: state.fileName,
      pageSize: state.pageSize,
      orientation: state.orientation,
      margin: state.margin,
    });
  };

  const handleExportTXT = () => {
    exportToTXT(state.content, state.fileName);
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Preview & Export</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span>{wordCount} words</span> / <span>{charCount} chars</span>
        </div>
      </div>

      {/* 
        <<<<< --- মূল এবং চূড়ান্ত পরিবর্তন এখানে --- >>>>>
        
        নিচের className-টিকে পরিবর্তন করা হয়েছে।
        - dark:bg-slate-700: Dark Mode-এ ব্যাকগ্রাউন্ডকে ডার্ক করবে।
        - dark:prose-invert: Dark Mode-এ `prose`-এর ভেতরের সব লেখার রঙকে সাদা/হালকা করে দেবে।
        
        এখন প্রিভিউ প্যানেলটি এডিটর প্যানেলের মতোই থিম পরিবর্তন করবে।
      */}
      <div
        ref={previewRef}
        className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-6 min-h-[250px] mb-6 prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: state.content }}
      />
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">File Name</label>
            <input type="text" value={state.fileName} onChange={(e) => dispatch({ type: 'SET_FILE_NAME', payload: e.target.value })} className="premium-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Page Size</label>
            <select value={state.pageSize} onChange={(e) => dispatch({ type: 'SET_PAGE_SIZE', payload: e.target.value })} className="premium-input">
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
              <option value="legal">Legal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Orientation</label>
            <select value={state.orientation} onChange={(e) => dispatch({ type: 'SET_ORIENTATION', payload: e.target.value })} className="premium-input">
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Margin ({state.margin}mm)</label>
            <input type="range" min="0" max="50" value={state.margin} onChange={(e) => dispatch({ type: 'SET_MARGIN', payload: parseInt(e.target.value) })} className="w-full cursor-pointer" />
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button onClick={handleExportPDF} disabled={isProcessing} className="btn-primary flex-1 flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>{isProcessing ? 'Generating...' : 'Export PDF'}</span>
          </button>
          <button onClick={handleExportTXT} className="btn-secondary flex items-center justify-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>TXT</span>
          </button>
        </div>
      </div>
    </div>
  );
}