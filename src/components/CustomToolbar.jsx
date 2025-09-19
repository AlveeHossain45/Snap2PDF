// src/components/CustomToolbar.jsx

import React from 'react';

export const CustomToolbar = () => (
  <div id="toolbar" className="bg-white dark:bg-gray-800 p-2 rounded-t-lg border-b border-gray-300 dark:border-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="">
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="">Normal</option>
      </select>
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="impact">Impact</option>
        <option value="courier-new">Courier</option>
      </select>
      <select className="ql-size" defaultValue="">
        <option value="small">Small</option>
        <option value="" selected>Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" title="Bold"></button>
      <button className="ql-italic" title="Italic"></button>
      <button className="ql-underline" title="Underline"></button>
      <button className="ql-strike" title="Strikethrough"></button>
    </span>
    <span className="ql-formats">
      <select className="ql-color" title="Text Color"></select>
      <select className="ql-background" title="Highlight Color"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" title="Ordered List"></button>
      <button className="ql-list" value="bullet" title="Bullet List"></button>
      <button className="ql-indent" value="-1" title="Decrease Indent"></button>
      <button className="ql-indent" value="+1" title="Increase Indent"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-link" title="Insert Link"></button>
      <button className="ql-image" title="Insert Image"></button>
      <button className="ql-blockquote" title="Blockquote"></button>
      <button className="ql-clean" title="Clear Formatting"></button>
    </span>
  </div>
);

export default CustomToolbar;