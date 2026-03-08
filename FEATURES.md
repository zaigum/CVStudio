# CVStudio - Professional CV Maker 🚀 (Enhanced Edition)

Pakistan ka #1 CV Generator with AI-powered features! PDF upload karein ya fresh start karein aur minutes mein professional CV banayein.

## ✨ New Features Added

### 🔄 **Undo/Redo**
- Ctrl+Z for undo
- Ctrl+Y or Ctrl+Shift+Z for redo
- Full history tracking of all changes

### ⌨️ **Keyboard Shortcuts**
- `Ctrl+S` - Save (auto-save already enabled)
- `Ctrl+P` - Preview CV
- `Ctrl+Z` - Undo last change
- `Ctrl+Y` - Redo change

### 🎯 **Drag & Drop Section Reordering**
- Sidebar sections ko drag karke reorder karein
- Apne CV ka structure customize karein

### 📥 **Multiple Export Formats**
- PDF (High Quality)
- JSON (Data backup)
- Word Document (.doc)

### 🤖 **AI-Powered Suggestions**
- Smart summary suggestions based on your experience
- Related skills recommendations
- Description improvement tips
- Quantifiable metrics suggestions

### ✍️ **Spell Checker**
- Automatic typo detection
- One-click auto-correct
- Common mistakes highlighting

### 🔍 **Template Comparison**
- Side-by-side template preview
- Compare all 6 templates at once
- Quick template switching

### 📜 **Version History**
- Save multiple CV versions
- Restore previous versions
- Timestamp tracking
- Up to 10 versions stored

### ⚡ **Improved PDF Generation**
- Higher quality output
- Better scaling
- Multi-page support
- Faster generation

## 🎨 Available Templates

1. **Midnight Pro** - Purple/Indigo gradient (Default)
2. **Executive** - Professional slate theme
3. **Creative Bloom** - Pink/Rose creative design
4. **Ocean Breeze** - Sky blue modern look
5. **Forest Mint** - Green fresh design
6. **Simple Clean** - Minimalist black & white

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Use New Features

### Undo/Redo
- Make changes in editor
- Press `Ctrl+Z` to undo
- Press `Ctrl+Y` to redo
- Buttons appear in navbar when available

### Drag & Drop Sections
- Go to Editor page
- Hover over section in sidebar
- Drag grip icon to reorder
- Sections rearrange instantly

### Export Options
- Click Download icon in navbar
- Choose format: PDF, JSON, or Word
- File downloads automatically

### AI Suggestions
- Click lightbulb icon in editor
- View smart suggestions for current section
- Click suggestion to apply
- Works for Summary and Skills sections

### Spell Check
- Type in any text field
- Spell check icon appears if errors found
- Click to auto-correct all typos

### Template Comparison
- Click grid icon in editor
- View all templates side-by-side
- Click "Use This Template" to switch

### Version History
- Go to Preview page
- Click history icon
- Save current version
- Restore any previous version

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **PDF.js** - PDF parsing
- **html2canvas + jsPDF** - PDF generation
- **Lucide React** - Icons
- **React Dropzone** - File upload

## 📁 Project Structure

```
cv-generator/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── EditorPage.jsx (Enhanced)
│   │   └── PreviewPage.jsx (Enhanced)
│   ├── components/
│   │   ├── KeyboardShortcuts.jsx (New)
│   │   ├── DragDropSection.jsx (New)
│   │   ├── TemplateComparison.jsx (New)
│   │   └── VersionHistory.jsx (New)
│   ├── hooks/
│   │   └── useUndoRedo.js (New)
│   ├── utils/
│   │   ├── exportUtils.js (New)
│   │   ├── aiSuggestions.js (New)
│   │   ├── spellCheck.js (New)
│   │   └── pdfGenerator.js (New)
│   └── templates/
│       └── (6 templates)
```

## 💡 Tips

- Use keyboard shortcuts for faster editing
- Save versions before major changes
- Try AI suggestions for better content
- Compare templates before finalizing
- Export to JSON for backup
- Use spell checker before downloading

## 🌟 Credits

Built with ❤️ for Pakistani job seekers
Enhanced with AI-powered features

---

**Happy CV Building! 🎉**
