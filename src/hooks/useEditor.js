// src/hooks/useEditor.js

import { useState } from 'react';
import { generatePDF, downloadText } from '../utils/pdfGenerator'; // utils থেকে ফাংশন ইমপোর্ট করুন

export function useEditorTools() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateStats = (content) => {
    // HTML ট্যাগ বাদ দিয়ে শুধু টেক্সট গণনা করা
    const text = content.replace(/<[^>]*>/g, '');
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  // --- মূল পরিবর্তন এখানে ---
  // এখন এই ফাংশনটি একটি HTML স্ট্রিং আশা করে, কোনো DOM এলিমেন্ট নয়
  const exportToPDF = async (contentHTML, options) => {
    setIsProcessing(true);
    try {
      // সরাসরি HTML কন্টেন্ট এবং অপশনগুলো pdfGenerator-এ পাঠানো হচ্ছে
      await generatePDF(contentHTML, options);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const exportToTXT = (content, fileName) => {
    try {
      downloadText(content, fileName);
    } catch (error) {
      console.error('Error exporting text:', error);
      alert('Failed to export text. Please try again.');
    }
  };

  return {
    wordCount,
    charCount,
    isProcessing,
    calculateStats,
    exportToPDF,
    exportToTXT,
  };
}