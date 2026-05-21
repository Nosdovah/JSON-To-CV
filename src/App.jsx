import { useState, useRef, useEffect } from 'react';
import CVPreview from './components/CVPreview';
import JSONEditor from './components/JSONEditor';
import FormEditor from './components/FormEditor';
import { Download, Upload } from 'lucide-react';
import defaultData from './data/defaultData.json';
import './App.css';

const SESSION_KEY = 'cv_builder_session_data';
const SESSION_TIME_KEY = 'cv_builder_session_timestamp';
const ONE_HOUR = 60 * 60 * 1000;

function App() {
  const loadInitialData = () => {
    try {
      const savedTime = localStorage.getItem(SESSION_TIME_KEY);
      if (savedTime && (Date.now() - parseInt(savedTime, 10) < ONE_HOUR)) {
        const savedData = localStorage.getItem(SESSION_KEY);
        if (savedData) {
          return JSON.parse(savedData);
        }
      }
    } catch (e) {
      console.error("Failed to load session data", e);
    }
    return defaultData;
  };

  const initialData = loadInitialData();
  const [cvData, setCvData] = useState(initialData);
  const [jsonText, setJsonText] = useState(JSON.stringify(initialData, null, 2));
  const [editorMode, setEditorMode] = useState('json');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(cvData));
      localStorage.setItem(SESSION_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.error("Failed to save session data", e);
    }
  }, [cvData]);

  const checkSchema = (data) => {
    if (!data || typeof data !== 'object') return 'Should be a JSON object';
    const suggestedSections = ['basics', 'work', 'education', 'skills'];
    const missing = suggestedSections.filter(key => !(key in data));
    if (missing.length > 0) {
      return `Missing recommended sections: ${missing.join(', ')}`;
    }
    return '';
  };

  const handleJsonChange = (text) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setCvData(parsed);
      setError('');
      
      const schemaWarning = checkSchema(parsed);
      setWarning(schemaWarning);
    } catch (err) {
      setError('Invalid JSON syntax');
      setWarning('');
    }
  };

  const handleFormChange = (newData) => {
    setCvData(newData);
    setJsonText(JSON.stringify(newData, null, 2));
    const schemaWarning = checkSchema(newData);
    setWarning(schemaWarning);
    setError('');
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
        
        const schemaWarning = checkSchema(parsed);
        setWarning(schemaWarning);
      } catch (err) {
        setError('Invalid JSON format in file');
        setWarning('');
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
          <img src={`${import.meta.env.BASE_URL}JSON-DOCIFY-Photoroom.png`} alt="JSON-DOCIFY Logo" className="logo-img" />
          <h1>JSON-DOCIFY</h1>
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
              <div className="mode-toggle">
                <button 
                  className={`toggle-btn ${editorMode === 'json' ? 'active' : ''}`}
                  onClick={() => setEditorMode('json')}
                >JSON</button>
                <button 
                  className={`toggle-btn ${editorMode === 'form' ? 'active' : ''}`}
                  onClick={() => setEditorMode('form')}
                >Form</button>
              </div>
              {error && <span className="error-badge">{error}</span>}
              {warning && !error && <span className="warning-badge">{warning}</span>}
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
          {editorMode === 'json' ? (
            <JSONEditor value={jsonText} onChange={handleJsonChange} />
          ) : (
            <FormEditor data={cvData} onChange={handleFormChange} />
          )}
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
