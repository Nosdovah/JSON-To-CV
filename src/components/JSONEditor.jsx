import React from 'react';
import './JSONEditor.css';

const JSONEditor = ({ value, onChange }) => {
  return (
    <div className="json-editor-container">
      <textarea
        className="json-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
};

export default JSONEditor;
