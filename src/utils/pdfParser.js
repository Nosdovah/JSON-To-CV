import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const parsePdf = async (arrayBuffer) => {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    text += textContent.items.map(s => s.str).join(' ') + '\n';
  }
  return text;
};

// Basic heuristic logic to extract data
export const extractCvData = (text) => {
  const data = {
    basics: {
      name: "", label: "", email: "", phone: "", url: "", summary: "", location: ""
    },
    work: [],
    education: [],
    skills: [],
    projects: []
  };

  // Simple heuristic parsing logic
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);

  // Try to find email
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) data.basics.email = emailMatch[1];

  // Try to find phone
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) data.basics.phone = phoneMatch[0];

  // First line is usually name
  if (lines.length > 0) {
    data.basics.name = lines[0];
  }

  // Look for sections
  let currentSection = null;
  let currentItem = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    if (lowerLine.includes('experience') || lowerLine.includes('employment') || lowerLine.includes('work history')) {
      currentSection = 'work';
      continue;
    } else if (lowerLine.includes('education') || lowerLine.includes('academic')) {
      currentSection = 'education';
      continue;
    } else if (lowerLine.includes('skills')) {
      currentSection = 'skills';
      continue;
    } else if (lowerLine.includes('projects')) {
      currentSection = 'projects';
      continue;
    }

    if (currentSection === 'work') {
      // Basic work heuristic: dates are common
      if (/20\d{2}/.test(line) && !currentItem) {
        currentItem = { company: line, position: "", startDate: "", endDate: "", summary: "", highlights: [] };
        data.work.push(currentItem);
      } else if (currentItem) {
        if (!currentItem.position) currentItem.position = line;
        else currentItem.highlights.push(line);
      } else {
        currentItem = { company: line, position: "", startDate: "", endDate: "", summary: "", highlights: [] };
        data.work.push(currentItem);
      }
    } else if (currentSection === 'education') {
      if (/20\d{2}/.test(line) && !currentItem) {
        currentItem = { institution: line, area: "", studyType: "", startDate: "", endDate: "" };
        data.education.push(currentItem);
      } else if (currentItem) {
        if (!currentItem.area) currentItem.area = line;
        else currentItem.studyType = line;
      } else {
        currentItem = { institution: line, area: "", studyType: "", startDate: "", endDate: "" };
        data.education.push(currentItem);
      }
    } else if (currentSection === 'skills') {
      if (data.skills.length === 0) {
        data.skills.push({ name: "Core Skills", keywords: [] });
      }
      data.skills[0].keywords.push(line);
    }
  }

  // Clean up slightly
  if (data.work.length === 0) data.work = [{ company: "", position: "", startDate: "", endDate: "", summary: "", highlights: [""] }];
  if (data.education.length === 0) data.education = [{ institution: "", area: "", studyType: "", startDate: "", endDate: "" }];
  if (data.skills.length === 0) data.skills = [{ name: "", keywords: [""] }];

  return data;
};
