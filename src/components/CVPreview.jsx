import React from 'react';
import './CVPreview.css';

const CVPreview = ({ data }) => {
  if (!data) return <div className="cv-empty">No data provided</div>;

  const { basics, work, education, skills, projects } = data;

  const contactItems = [
    basics?.email,
    basics?.phone,
    basics?.url?.replace(/^https?:\/\//, ''),
    typeof basics?.location === 'string' ? basics.location : basics?.location?.city
  ].filter(Boolean);

  return (
    <div className="cv-document">
      <header className="cv-header">
        <h1 className="cv-name">{basics?.name || 'Your Name'}</h1>
        {basics?.label && <h2 className="cv-title">{basics.label}</h2>}
        
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
        {basics?.summary && (
          <section className="cv-section">
            <h3 className="section-title">Professional Summary</h3>
            <div className="section-content">
              <p className="cv-summary">{basics.summary}</p>
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Skills</h3>
            <div className="section-content">
              <div className="skills-list">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="skill-item">
                    <strong>{skillGroup.name}:</strong> {skillGroup.keywords?.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {work && work.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Experience</h3>
            <div className="section-content">
              {work.map((job, index) => (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <div>
                      <h4 className="item-title">{job.position}</h4>
                      <div className="item-subtitle">{job.company}</div>
                    </div>
                    <div className="item-date">
                      {job.startDate} – {job.endDate || 'Present'}
                    </div>
                  </div>
                  {job.summary && <p className="item-summary">{job.summary}</p>}
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="item-highlights">
                      {job.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Projects</h3>
            <div className="section-content">
              {projects.map((proj, index) => (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <div>
                      <h4 className="item-title">{proj.name}</h4>
                      {proj.roles && <div className="item-subtitle">{proj.roles.join(', ')}</div>}
                    </div>
                    {proj.url && (
                      <div className="item-date">
                        <a href={proj.url} target="_blank" rel="noreferrer">{proj.url.replace(/^https?:\/\//, '')}</a>
                      </div>
                    )}
                  </div>
                  {proj.description && <p className="item-summary">{proj.description}</p>}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="item-highlights">
                      {proj.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Education</h3>
            <div className="section-content">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="item-header">
                    <div>
                      <h4 className="item-title">{edu.institution}</h4>
                      <div className="item-subtitle">
                        {edu.studyType} in {edu.area}
                      </div>
                    </div>
                    <div className="item-date">
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
