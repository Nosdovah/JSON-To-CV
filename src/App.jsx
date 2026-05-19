import { useState, useEffect } from 'react';
import CVPreview from './components/CVPreview';
import JSONEditor from './components/JSONEditor';
import { Download, FileJson } from 'lucide-react';
import defaultData from './data/defaultData.json';
import './App.css';

function App() {
  const [cvData, setCvData] = useState(defaultData);
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultData, null, 2));
  const [error, setError] = useState('');

  const handleJsonChange = (text) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setCvData(parsed);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <FileJson size={28} className="logo-icon" />
          <h1>CVGenius</h1>
        </div>
        <button className="export-btn" onClick={handlePrint}>
          <Download size={18} />
          Export to PDF
        </button>
      </header>

      <main className="main-content">
        <div className="editor-panel">
          <div className="panel-header">
            <h2>JSON Data</h2>
            {error && <span className="error-badge">{error}</span>}
          </div>
          <JSONEditor value={jsonText} onChange={handleJsonChange} />
        </div>

        <div className="preview-panel">
          <div className="cv-wrapper">
            <CVPreview data={cvData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
