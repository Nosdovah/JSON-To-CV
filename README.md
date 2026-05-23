# JSON-DOCIFY 📄✨

**JSON-DOCIFY** is a modern, real-time CV/Resume builder designed to compile structured JSON data into an elegant, print-ready CV. Perfect for developers who want a code-first approach to CV writing or a quick, responsive form-based editor with a live A4 preview.

---

## 🚀 Features

*   **Dual Editor Modes**:
    *   **JSON Editor**: Real-time syntax highlighting and schema validation warning to keep your document structured.
    *   **Form Editor**: A user-friendly form interface with dynamic fields to build, edit, and reorganize CV entries on the fly.
*   **Instant Live Preview**: A side-by-side view showing exactly how the document looks on an A4 canvas.
*   **Perfect A4 PDF Export**: Specialized CSS `@media print` rules ensure page-break avoidance for logical sections (e.g., jobs or education entries aren't awkwardly sliced in half) and print margins match official A4 specifications.
*   **Local Auto-Save**: Saves changes to `localStorage` automatically (1-hour session retention) so you won't lose progress on page refresh.
*   **Import Support**: Upload any valid JSON file matching the schema to quickly resume or share CV configurations.

---

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
*   **Styling**: Vanilla CSS (modular styles)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
├── public/                # Static assets (logos, etc.)
└── src/
    ├── components/
    │   ├── CVPreview.jsx   # Renders the formatted CV document
    │   ├── CVPreview.css   # Document layout and print styles
    │   ├── FormEditor.jsx  # Form editor input components
    │   ├── FormEditor.css  # Styles for form controls
    │   ├── JSONEditor.jsx  # Raw text JSON editor textarea
    │   └── JSONEditor.css  # Styles for JSON text input area
    ├── data/
    │   └── defaultData.json# Starter CV template configuration
    ├── App.jsx            # Main app shell and application logic
    ├── App.css            # Overall dashboard structure and general print overrides
    └── index.css          # Design system variables and typography resets
```

---

## 📋 JSON Schema Example

Below is the structured schema used to populate the CV builder:

```json
{
  "basics": {
    "name": "Jane Doe",
    "label": "Full Stack Developer",
    "email": "jane.doe@example.com",
    "phone": "+1 234 567 890",
    "url": "https://janedoe.dev",
    "summary": "Experienced engineer specializing in high-performance React architectures...",
    "location": "San Francisco, CA"
  },
  "work": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "startDate": "2024",
      "endDate": "Present",
      "summary": "Led frontend architecture development...",
      "highlights": [
        "Reduced page bundle size by 35% through dynamic code splitting",
        "Mentored a team of 4 junior developers"
      ]
    }
  ],
  "education": [
    {
      "institution": "University of Science",
      "area": "Computer Science",
      "studyType": "Bachelor of Science",
      "startDate": "2018",
      "endDate": "2022"
    }
  ],
  "skills": [
    {
      "name": "Frontend",
      "keywords": ["React", "JavaScript", "CSS", "Vite"]
    }
  ],
  "projects": [
    {
      "name": "JSON-DOCIFY",
      "roles": ["Creator", "Lead Developer"],
      "url": "https://github.com/example/json-docify",
      "description": "An open-source resume generator...",
      "highlights": [
        "Implemented real-time local state synchronization",
        "Optimized print stylesheets for A4 pagination"
      ]
    }
  ]
}
```

---

## ⚡ Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Development Server

Start the local hot-reloading development server:

```bash
npm run dev
```

### 3. Production Build

Build the optimized production assets:

```bash
npm run build
```

---

## 🖨️ PDF Printing Tips

For the best results when exporting to PDF:
1. Click **Export to PDF** on the dashboard.
2. In the browser Print Dialog, set **Destination** to **Save as PDF**.
3. Under **More settings**:
   * Set **Paper size** to **A4**.
   * Set **Margins** to **Default** (the print stylesheet automatically configures the A4 standard `20mm` page margins).
   * Ensure **Headers and footers** are unchecked if you want a clean document layout.
   * Enable **Background graphics** to show any styling accents.
