// Custom hook for editor logic
import { useState, useEffect } from 'react'
import { generatePDF, downloadText } from '../utils/pdfGenerator'

export function useEditorTools() {
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const calculateStats = (content) => {
    const text = content.replace(/<[^>]*>/g, '')
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
    setCharCount(text.length)
  }

  const exportToPDF = async (element, options) => {
    setIsProcessing(true)
    try {
      await generatePDF(element, options)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const exportToTXT = (content, fileName) => {
    try {
      downloadText(content.replace(/<[^>]*>/g, ''), fileName)
    } catch (error) {
      console.error('Error exporting text:', error)
      alert('Failed to export text. Please try again.')
    }
  }

  return {
    wordCount,
    charCount,
    isProcessing,
    calculateStats,
    exportToPDF,
    exportToTXT
  }
}