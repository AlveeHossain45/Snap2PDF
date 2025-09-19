// src/components/Toolbar.jsx
// ... imports ...
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, Plus, Minus, RotateCcw
} from 'lucide-react'
import { useEditor } from '../context/EditorContext'


export default function Toolbar() {
  const { state, dispatch } = useEditor()
  // ... functions ...

  const applyFormatting = (format) => {
    document.execCommand(format, false, null)
    dispatch({ type: `TOGGLE_${format.toUpperCase()}` })
  }

  const setTextAlign = (align) => {
    document.execCommand('justify' + align, false, null)
    dispatch({ type: 'SET_TEXT_ALIGN', payload: align })
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4 flex flex-wrap items-center gap-2 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => applyFormatting('bold')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.isBold ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        {/* ... অন্যান্য বাটন একইভাবে আপডেট করুন ... */}
        <button
          onClick={() => applyFormatting('italic')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.isItalic ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => applyFormatting('underline')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.isUnderline ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => setTextAlign('Left')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.textAlign === 'left' ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        {/* ... অন্যান্য অ্যালাইন বাটন আপডেট করুন ... */}
        <button
          onClick={() => setTextAlign('Center')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.textAlign === 'center' ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTextAlign('Right')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.textAlign === 'right' ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTextAlign('Full')}
          className={`editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700 ${state.textAlign === 'justify' ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => dispatch({ type: 'SET_FONT_SIZE', payload: Math.max(8, state.fontSize - 2) })}
          className="editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700"
          title="Decrease Font Size"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300 w-8 text-center">{state.fontSize}px</span>
        <button
          onClick={() => dispatch({ type: 'SET_FONT_SIZE', payload: state.fontSize + 2 })}
          className="editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700"
          title="Increase Font Size"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <select
        value={state.fontFamily}
        onChange={(e) => dispatch({ type: 'SET_FONT_FAMILY', payload: e.target.value })}
        className="px-3 py-1 border rounded text-sm bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
      >
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
      </select>

      <input
        type="color"
        value={state.color}
        onChange={(e) => dispatch({ type: 'SET_COLOR', payload: e.target.value })}
        className="w-8 h-8 cursor-pointer bg-transparent"
        title="Text Color"
      />

      <button
        onClick={() => dispatch({ type: 'RESET_SETTINGS' })}
        className="editor-toolbar-btn dark:text-gray-300 dark:hover:bg-gray-700"
        title="Reset Settings"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  )
}