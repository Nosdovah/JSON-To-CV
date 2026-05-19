import React from 'react';
import './CVPreview.css';

const CVPreview = ({ data }) => {
  if (!data || typeof data !== 'object') return <div className="cv-empty">No valid data provided</div>;

  const { basics, work, education, skills, projects } = data;

  const contactItems = [
    basics?.email,
    basics?.phone,
    basics?.url && typeof basics.url === 'string' ? basics.url.replace(/^https?:\/\//, '') : null,
    basics?.location ? (typeof basics.location === 'string' ? basics.location : basics.location.city || basics.location.address) : null
  ].filter(item => item && typeof item === 'string');

  return (
    <div className="cv-document">
      <header className="cv-header">
        <h1 className="cv-name">{basics?.name || 'Your Name'}</h1>
        {basics?.label && typeof basics.label === 'string' && <h2 className="cv-title">{basics.label}</h2>}
        
        {contactItems.length > 0 && (
          <div className="cv-contact">
            {contactItems.map((item, index) => (
              <React.Fragment key={index}>
                <span className="contact-item">{item}</span>
                {index < contactItems.length - 1 && <span className="contact-separator">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      <div className="cv-body">
        {basics?.summary && typeof basics.summary === 'string' && (
          <section className="cv-section">
            <h3 className="section-title">Professional Summary</h3>
            <div className="section-content">
              <p className="cv-summary">{basics.summary}</p>
            </div>
          </section>
        )}

        {skills && Array.isArray(skills) && skills.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Skills</h3>
            <div className="section-content">
              <div className="skills-list">
                {skills.map((skillGroup, index) => {
                  if (!skillGroup || typeof skillGroup !== 'object') return null;
                  return (
                    <div key={index} className="skill-item">
                      {skillGroup.name && <strong>{skillGroup.name}: </strong>}
                      {Array.isArray(skillGroup.keywords) ? skillGroup.keywords.join(', ') : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {work && Array.isArray(work) && work.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Experience</h3>
            <div className="section-content">
              {work.map((job, index) => {
                if (!job || typeof job !== 'object') return null;
                return (
                  <div key={index} className="experience-item">
                    <div className="item-header">
                      <div>
                        {job.position && <h4 className="item-title">{job.position}</h4>}
                        {job.company && <div className="item-subtitle">{job.company}</div>}
                      </div>
                      {(job.startDate || job.endDate) && (
                        <div className="item-date">
                          {job.startDate || ''} – {job.endDate || 'Present'}
                        </div>
                      )}
                    </div>
                    {job.summary && typeof job.summary === 'string' && <p className="item-summary">{job.summary}</p>}
                    {job.highlights && Array.isArray(job.highlights) && job.highlights.length > 0 && (
                      <ul className="item-highlights">
                        {job.highlights.map((hl, i) => (
                          <li key={i}>{hl}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {projects && Array.isArray(projects) && projects.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Projects</h3>
            <div className="section-content">
              {projects.map((proj, index) => {
                if (!proj || typeof proj !== 'object') return null;
                return (
                  <div key={index} className="experience-item">
                    <div className="item-header">
                      <div>
                        {proj.name && <h4 className="item-title">{proj.name}</h4>}
                        {proj.roles && Array.isArray(proj.roles) && <div className="item-subtitle">{proj.roles.join(', ')}</div>}
                      </div>
                      {proj.url && typeof proj.url === 'string' && (
                        <div className="item-date">
                          <a href={proj.url} target="_blank" rel="noreferrer">{proj.url.replace(/^https?:\/\//, '')}</a>
                        </div>
                      )}
                    </div>
                    {proj.description && typeof proj.description === 'string' && <p className="item-summary">{proj.description}</p>}
                    {proj.highlights && Array.isArray(proj.highlights) && proj.highlights.length > 0 && (
                      <ul className="item-highlights">
                        {proj.highlights.map((hl, i) => (
                          <li key={i}>{hl}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {education && Array.isArray(education) && education.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Education</h3>
            <div className="section-content">
              {education.map((edu, index) => {
                if (!edu || typeof edu !== 'object') return null;
                return (
                  <div key={index} className="education-item">
                    <div className="item-header">
                      <div>
                        {edu.institution && <h4 className="item-title">{edu.institution}</h4>}
                        {(edu.studyType || edu.area) && (
                          <div className="item-subtitle">
                            {edu.studyType || ''} {edu.studyType && edu.area ? 'in' : ''} {edu.area || ''}
                          </div>
                        )}
                      </div>
                      {(edu.startDate || edu.endDate) && (
                        <div className="item-date">
                          {edu.startDate || ''} – {edu.endDate || ''}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
