// Template selector
import { useState } from 'react'
import { useEditor } from '../context/EditorContext'
import { templates } from '../utils/templates'
import { X } from 'lucide-react'

export default function TemplateModal({ isOpen, onClose }) {
  const { state, dispatch } = useEditor()
  const [selectedTemplate, setSelectedTemplate] = useState(state.template)

  const applyTemplate = () => {
    const template = templates[selectedTemplate]
    dispatch({ type: 'SET_TEMPLATE', payload: selectedTemplate })
    dispatch({ type: 'SET_FONT_FAMILY', payload: template.styles.fontFamily })
    dispatch({ type: 'SET_FONT_SIZE', payload: template.styles.fontSize })
    dispatch({ type: 'SET_LINE_HEIGHT', payload: template.styles.lineHeight })
    dispatch({ type: 'SET_COLOR', payload: template.styles.color })
    dispatch({ type: 'SET_BACKGROUND_COLOR', payload: template.styles.backgroundColor })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Choose a Template</h3>
          <button onClick={onClose} className="editor-toolbar-btn">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(templates).map(([key, template]) => (
            <div
              key={key}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === key
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTemplate(key)}
            >
              <div className="font-semibold mb-2">{template.name}</div>
              <div
                className="text-sm p-2 rounded"
                style={{
                  fontFamily: template.styles.fontFamily,
                  fontSize: `${template.styles.fontSize}px`,
                  lineHeight: template.styles.lineHeight,
                  color: template.styles.color,
                  backgroundColor: template.styles.backgroundColor
                }}
              >
                This is a sample text showing how your document will look with the {template.name} template.
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={applyTemplate} className="btn-primary">
            Apply Template
          </button>
        </div>
      </div>
    </div>
  )
}