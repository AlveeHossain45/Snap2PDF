// src/components/Preview.jsx

import { useEffect } from 'react';
import { useEditor } from '../context/EditorContext';
import { useEditorTools } from '../hooks/useEditor';
import { Download, FileText, ExternalLink } from 'lucide-react'; // ExternalLink আইকন যোগ করা হয়েছে
import { isInAppBrowser } from '../utils/envChecker'; // ইন-অ্যাপ ব্রাউজার চেকার ইমপোর্ট করা হয়েছে

export default function Preview() {
  const { state, dispatch } = useEditor();
  const { isProcessing, exportToPDF, exportToTXT, wordCount, charCount, calculateStats } = useEditorTools();

  useEffect(() => {
    calculateStats(state.content);
  }, [state.content, calculateStats]);

  const handleExportPDF = async () => {
    // PDF জেনারেট করার আগে চেক করা হচ্ছে এটি ইন-অ্যাপ ব্রাউজার কিনা
    if (isInAppBrowser()) {
      // যদি হয়, তাহলে ব্যবহারকারীকে একটি সতর্কবার্তা দেখানো হচ্ছে
      alert(
        "PDF generation is not supported in this browser.\n\nPlease open this link in your main browser (like Chrome or Safari) for the best experience."
      );
      return; // এবং ফাংশনের কাজ এখানেই থামিয়ে দেওয়া হচ্ছে
    }

    // যদি সাধারণ ব্রাউজার হয়, তাহলে PDF জেনারেশনের প্রক্রিয়া স্বাভাবিকভাবে চলবে
    await exportToPDF(state.content, {
      fileName: state.fileName,
      pageSize: state.pageSize,
      orientation: state.orientation,
      margin: state.margin,
    });
  };

  const handleExportTXT = () => {
    exportToTXT(state.content, state.fileName);
  };

  // একটি helper ফাংশন যা বর্তমান লিঙ্কটি ক্লিপবোর্ডে কপি করবে
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard! Now you can paste it in your main browser.");
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
      
      {/* --- ইন-অ্যাপ ব্রাউজারের জন্য সতর্কবার্তা --- */}
      {isInAppBrowser() && (
        <div className="bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 p-4 rounded-md mb-6" role="alert">
          <div className="flex items-center">
            <ExternalLink className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-bold">Limited Experience</p>
              <p className="text-sm">For PDF downloads, please open this site in your main browser (e.g., Chrome, Safari).</p>
              <button onClick={copyLinkToClipboard} className="mt-2 text-sm font-semibold underline hover:text-yellow-600">Copy Link</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Preview & Export</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span>{wordCount} words</span> / <span>{charCount} chars</span>
        </div>
      </div>
      
      <div
        className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-6 min-h-[250px] mb-6 prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: state.content }}
      />
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">File Name</label>
            <input 
              type="text" 
              value={state.fileName} 
              onChange={(e) => dispatch({ type: 'SET_FILE_NAME', payload: e.target.value })} 
              className="premium-input" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Page Size</label>
            <select 
              value={state.pageSize} 
              onChange={(e) => dispatch({ type: 'SET_PAGE_SIZE', payload: e.target.value })} 
              className="premium-input"
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
              <option value="legal">Legal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Orientation</label>
            <select 
              value={state.orientation} 
              onChange={(e) => dispatch({ type: 'SET_ORIENTATION', payload: e.target.value })} 
              className="premium-input"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Margin ({state.margin}mm)</label>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={state.margin} 
              onChange={(e) => dispatch({ type: 'SET_MARGIN', payload: parseInt(e.target.value) })} 
              className="w-full cursor-pointer" 
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button 
            onClick={handleExportPDF} 
            disabled={isProcessing} 
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>{isProcessing ? 'Generating...' : 'Export PDF'}</span>
          </button>
          <button 
            onClick={handleExportTXT} 
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>TXT</span>
          </button>
        </div>
      </div>
    </div>
  );
}