// src/pages/About.jsx

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">About Snap2PDF</h1>
        
        {/*
          <<<<< --- মূল এবং চূড়ান্ত পরিবর্তন এখানে --- >>>>>
          
          'prose' ক্লাসের সাথে 'dark:prose-invert' ক্লাসটি যোগ করা হয়েছে।
          এটি নিশ্চিত করবে যে Dark Mode-এ 'prose'-এর ভেতরের লেখাগুলো 
          সাদা বা হালকা হয়ে ফুটে উঠবে।
        */}
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Snap2PDF is a professional text-to-PDF converter that allows you to create beautiful, 
            formatted documents with ease. Our advanced editor provides all the tools you need to 
            create professional PDF documents.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 dark:text-slate-300">
            <li>Rich text editing with formatting options</li>
            <li>Multiple templates for different document types</li>
            <li>Customizable fonts, colors, and styles</li>
            <li>PDF export with adjustable page settings</li>
            <li>Text export functionality</li>
            <li>Real-time preview of your document</li>
            <li>Word and character count statistics</li>
            <li>Responsive design that works on all devices</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700 dark:text-slate-300">
            <li>Start typing your content in the editor</li>
            <li>Use the toolbar to format your text</li>
            <li>Choose a template from the templates menu</li>
            <li>Adjust page settings in the preview panel</li>
            <li>Export your document as PDF or text file</li>
          </ol>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">Premium Features</h3>
            <p className="text-blue-700 dark:text-blue-300">
              Upgrade to our premium plan to unlock advanced features like custom templates, 
              cloud storage, collaboration tools, and more export options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}