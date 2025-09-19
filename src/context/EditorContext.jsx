// src/context/EditorContext.jsx

import { createContext, useContext, useReducer } from 'react'

const EditorContext = createContext()

const initialState = {
  content: '<h1>Welcome to Snap2PDF</h1><p>Start typing your content here...</p>',
  fontSize: 16,
  fontFamily: 'Arial',
  lineHeight: 1.6,
  margin: 20,
  template: 'default',
  fileName: 'document',
  pageSize: 'a4',
  orientation: 'portrait',
  isBold: false,
  isItalic: false,
  isUnderline: false,
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '#ffffff',
  // নতুন স্টেট
  theme: 'light', // 'light' or 'dark'
  autoSave: false,
}

function editorReducer(state, action) {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload }
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload }
    case 'SET_FONT_FAMILY':
      return { ...state, fontFamily: action.payload }
    case 'SET_LINE_HEIGHT':
      return { ...state, lineHeight: action.payload }
    case 'SET_MARGIN':
      return { ...state, margin: action.payload }
    case 'SET_TEMPLATE':
      return { ...state, template: action.payload }
    case 'SET_FILE_NAME':
      return { ...state, fileName: action.payload }
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload }
    case 'SET_ORIENTATION':
      return { ...state, orientation: action.payload }
    case 'TOGGLE_BOLD':
      return { ...state, isBold: !state.isBold }
    case 'TOGGLE_ITALIC':
      return { ...state, isItalic: !state.isItalic }
    case 'TOGGLE_UNDERLINE':
      return { ...state, isUnderline: !state.isUnderline }
    case 'SET_TEXT_ALIGN':
      return { ...state, textAlign: action.payload }
    case 'SET_COLOR':
      return { ...state, color: action.payload }
    case 'SET_BACKGROUND_COLOR':
      return { ...state, backgroundColor: action.payload }
    // নতুন Action
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'TOGGLE_AUTOSAVE':
      return { ...state, autoSave: !state.autoSave }
    case 'RESET_SETTINGS':
      // রিসেট করার সময় কন্টেন্ট এবং থিম ঠিক রাখা হবে
      return { 
        ...initialState, 
        content: state.content,
        theme: state.theme 
      }
    default:
      return state
  }
}

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}