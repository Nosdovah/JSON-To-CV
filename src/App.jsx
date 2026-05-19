import { useState, useRef } from 'react';
import CVPreview from './components/CVPreview';
import JSONEditor from './components/JSONEditor';
import { Download, FileJson, Upload } from 'lucide-react';
import defaultData from './data/defaultData.json';
import './App.css';

function App() {
  const [cvData, setCvData] = useState(defaultData);
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultData, null, 2));
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsed = JSON.parse(content);
        setJsonText(JSON.stringify(parsed, null, 2));
        setCvData(parsed);
        setError('');
      } catch (err) {
        setError('Invalid JSON format in uploaded file');
      }
    };
    reader.readAsText(file);
    // Reset the input value so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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
            <div className="panel-header-left">
              <h2>JSON Data</h2>
              {error && <span className="error-badge">{error}</span>}
            </div>
            <button className="upload-btn" onClick={triggerFileUpload} title="Upload JSON File">
              <Upload size={16} />
              <span>Upload</span>
            </button>
            <input 
              type="file" 
              accept=".json" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
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
