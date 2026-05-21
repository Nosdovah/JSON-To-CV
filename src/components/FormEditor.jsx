import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import './FormEditor.css';

const CommaSeparatedInput = ({ value, onChange, rows }) => {
  const [localValue, setLocalValue] = useState(Array.isArray(value) ? value.join(', ') : '');

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    const currentParsed = localValue.split(',').map(s => s.trim()).filter(Boolean);
    const newParsed = Array.isArray(value) ? value : [];
    if (JSON.stringify(currentParsed) !== JSON.stringify(newParsed)) {
      setLocalValue(newParsed.join(', '));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (rows) {
    return <textarea rows={rows} value={localValue} onChange={handleChange}></textarea>;
  }
  return <input type="text" value={localValue} onChange={handleChange} />;
};

const FormEditor = ({ data, onChange }) => {
  // Ensure we have a valid object
  const formData = typeof data === 'object' && data !== null ? data : {};

  // Generic updater
  const updateSection = (section, newSectionData) => {
    onChange({ ...formData, [section]: newSectionData });
  };

  const updateBasics = (field, value) => {
    updateSection('basics', { ...(formData.basics || {}), [field]: value });
  };

  const addArrayItem = (section, defaultItem = {}) => {
    const list = Array.isArray(formData[section]) ? formData[section] : [];
    updateSection(section, [...list, defaultItem]);
  };

  const updateArrayItem = (section, index, field, value) => {
    const list = Array.isArray(formData[section]) ? [...formData[section]] : [];
    if (!list[index]) return;
    
    // For comma-separated keywords/roles/highlights
    if ((field === 'keywords' || field === 'roles' || field === 'highlights') && typeof value === 'string') {
      list[index][field] = value.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      list[index][field] = value;
    }
    
    updateSection(section, list);
  };

  const removeArrayItem = (section, index) => {
    const list = Array.isArray(formData[section]) ? [...formData[section]] : [];
    list.splice(index, 1);
    updateSection(section, list);
  };

  return (
    <div className="form-editor">
      <div className="form-section">
        <h3>Basics</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={formData.basics?.name || ''} onChange={e => updateBasics('name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Job Title / Label</label>
          <input type="text" value={formData.basics?.label || ''} onChange={e => updateBasics('label', e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.basics?.email || ''} onChange={e => updateBasics('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={formData.basics?.phone || ''} onChange={e => updateBasics('phone', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Website / URL</label>
            <input type="text" value={formData.basics?.url || ''} onChange={e => updateBasics('url', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={formData.basics?.location || ''} onChange={e => updateBasics('location', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Professional Summary</label>
          <textarea rows="4" value={formData.basics?.summary || ''} onChange={e => updateBasics('summary', e.target.value)}></textarea>
        </div>
      </div>

      <div className="form-section">
        <div className="section-header-flex">
          <h3>Work Experience</h3>
          <button className="add-btn" onClick={() => addArrayItem('work', { company: '', position: '', startDate: '', endDate: '', summary: '', highlights: [] })}>
            <Plus size={14} /> Add
          </button>
        </div>
        {(formData.work || []).map((item, i) => (
          <div key={i} className="form-card">
            <div className="form-card-header">
              <h4>{item.company || 'New Company'}</h4>
              <button className="icon-btn delete-btn" onClick={() => removeArrayItem('work', i)}><Trash2 size={16} /></button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Company</label>
                <input type="text" value={item.company || ''} onChange={e => updateArrayItem('work', i, 'company', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input type="text" value={item.position || ''} onChange={e => updateArrayItem('work', i, 'position', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input type="text" value={item.startDate || ''} onChange={e => updateArrayItem('work', i, 'startDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="text" value={item.endDate || ''} onChange={e => updateArrayItem('work', i, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Summary</label>
              <textarea rows="2" value={item.summary || ''} onChange={e => updateArrayItem('work', i, 'summary', e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label>Highlights (comma separated)</label>
              <CommaSeparatedInput rows="3" value={item.highlights} onChange={val => updateArrayItem('work', i, 'highlights', val)} />
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <div className="section-header-flex">
          <h3>Education</h3>
          <button className="add-btn" onClick={() => addArrayItem('education', { institution: '', area: '', studyType: '', startDate: '', endDate: '' })}>
            <Plus size={14} /> Add
          </button>
        </div>
        {(formData.education || []).map((item, i) => (
          <div key={i} className="form-card">
            <div className="form-card-header">
              <h4>{item.institution || 'New Institution'}</h4>
              <button className="icon-btn delete-btn" onClick={() => removeArrayItem('education', i)}><Trash2 size={16} /></button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Institution</label>
                <input type="text" value={item.institution || ''} onChange={e => updateArrayItem('education', i, 'institution', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Area of Study</label>
                <input type="text" value={item.area || ''} onChange={e => updateArrayItem('education', i, 'area', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Study Type</label>
                <input type="text" placeholder="e.g. Bachelor's" value={item.studyType || ''} onChange={e => updateArrayItem('education', i, 'studyType', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Dates</label>
                <div style={{display:'flex', gap:'8px'}}>
                  <input type="text" placeholder="Start" value={item.startDate || ''} onChange={e => updateArrayItem('education', i, 'startDate', e.target.value)} />
                  <input type="text" placeholder="End" value={item.endDate || ''} onChange={e => updateArrayItem('education', i, 'endDate', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <div className="section-header-flex">
          <h3>Skills</h3>
          <button className="add-btn" onClick={() => addArrayItem('skills', { name: '', keywords: [] })}>
            <Plus size={14} /> Add
          </button>
        </div>
        {(formData.skills || []).map((item, i) => (
          <div key={i} className="form-card">
            <div className="form-card-header">
              <h4>{item.name || 'New Skill Group'}</h4>
              <button className="icon-btn delete-btn" onClick={() => removeArrayItem('skills', i)}><Trash2 size={16} /></button>
            </div>
            <div className="form-group">
              <label>Skill Category Name</label>
              <input type="text" value={item.name || ''} onChange={e => updateArrayItem('skills', i, 'name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Keywords (comma separated)</label>
              <CommaSeparatedInput value={item.keywords} onChange={val => updateArrayItem('skills', i, 'keywords', val)} />
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <div className="section-header-flex">
          <h3>Projects</h3>
          <button className="add-btn" onClick={() => addArrayItem('projects', { name: '', roles: [], url: '', description: '', highlights: [] })}>
            <Plus size={14} /> Add
          </button>
        </div>
        {(formData.projects || []).map((item, i) => (
          <div key={i} className="form-card">
            <div className="form-card-header">
              <h4>{item.name || 'New Project'}</h4>
              <button className="icon-btn delete-btn" onClick={() => removeArrayItem('projects', i)}><Trash2 size={16} /></button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input type="text" value={item.name || ''} onChange={e => updateArrayItem('projects', i, 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>URL</label>
                <input type="text" value={item.url || ''} onChange={e => updateArrayItem('projects', i, 'url', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Roles (comma separated)</label>
              <CommaSeparatedInput value={item.roles} onChange={val => updateArrayItem('projects', i, 'roles', val)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="2" value={item.description || ''} onChange={e => updateArrayItem('projects', i, 'description', e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label>Highlights (comma separated)</label>
              <CommaSeparatedInput rows="3" value={item.highlights} onChange={val => updateArrayItem('projects', i, 'highlights', val)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormEditor;
