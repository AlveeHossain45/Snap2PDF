// About page
export default function About() {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Snap2PDF</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Snap2PDF is a professional text-to-PDF converter that allows you to create beautiful, 
              formatted documents with ease. Our advanced editor provides all the tools you need to 
              create professional PDF documents.
            </p>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Rich text editing with formatting options</li>
              <li>Multiple templates for different document types</li>
              <li>Customizable fonts, colors, and styles</li>
              <li>PDF export with adjustable page settings</li>
              <li>Text export functionality</li>
              <li>Real-time preview of your document</li>
              <li>Word and character count statistics</li>
              <li>Responsive design that works on all devices</li>
            </ul>
  
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 mb-6">
              <li>Start typing your content in the editor</li>
              <li>Use the toolbar to format your text</li>
              <li>Choose a template from the templates menu</li>
              <li>Adjust page settings in the preview panel</li>
              <li>Export your document as PDF or text file</li>
            </ol>
  
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Premium Features</h3>
              <p className="text-primary-700">
                Upgrade to our premium plan to unlock advanced features like custom templates, 
                cloud storage, collaboration tools, and more export options.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }