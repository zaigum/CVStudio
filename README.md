# CVStudio - Professional CV Maker 🚀

Pakistan ka #1 CV Generator! PDF upload karein ya fresh start karein aur minutes mein professional CV banayein.

## ✨ Features

- 📄 **PDF Import** - Apna existing CV upload karein aur automatically data extract hoga
- 🎨 **5 Premium Templates** - Professional aur modern designs
- ✏️ **Smart Editor** - Live editing ke sath instant preview
- 💾 **Auto Save** - Aapka data automatically save hota rehta hai
- 📱 **Responsive Design** - Mobile aur desktop dono pe perfect
- 🖨️ **PDF Export** - High quality PDF download karein
- 🌙 **Dark Theme** - Beautiful dark mode interface

## 🎨 Available Templates

1. **Midnight Pro** - Purple/Indigo gradient (Default)
2. **Executive** - Professional slate theme
3. **Creative Bloom** - Pink/Rose creative design
4. **Ocean Breeze** - Sky blue modern look
5. **Forest Mint** - Green fresh design

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

### Usage

1. **Home Page** - PDF upload karein ya "Naya Start" button click karein
2. **Editor Page** - Apni details fill karein (Personal Info, Experience, Education, etc.)
3. **Preview Page** - CV preview dekhen aur PDF download karein

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
│   │   ├── HomePage.jsx       # Landing page with PDF upload
│   │   ├── EditorPage.jsx     # CV editing interface
│   │   └── PreviewPage.jsx    # CV preview & download
│   ├── templates/
│   │   ├── TemplateMidnight.jsx
│   │   ├── TemplateExecutive.jsx
│   │   ├── TemplateCreativeBloom.jsx
│   │   ├── TemplateOceanBreeze.jsx
│   │   └── TemplateForestMint.jsx
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── public/
├── package.json
└── vite.config.js
```

## 🎯 Key Features Explained

### PDF Import
- Automatically extracts text from uploaded PDF
- Parses personal info, experience, education, skills
- Smart regex-based data extraction

### Auto Save
- Uses localStorage to save CV data
- Automatically saves on every change
- Data persists across browser sessions

### Template System
- 5 professionally designed templates
- Easy template switching
- Print-optimized layouts

### PDF Export
- High-quality PDF generation
- A4 format optimized
- Proper scaling and formatting

## 🎨 Customization

### Adding New Templates

1. Create new template file in `src/templates/`
2. Follow existing template structure
3. Add to `TEMPLATES` array in HomePage and EditorPage
4. Add component to PreviewPage

### Styling

- Global styles: `src/index.css`
- Uses CSS custom properties for theming
- Tailwind CSS for utility classes

## 📝 CV Sections

- **Personal Information** - Name, email, phone, location, links
- **Professional Summary** - Brief introduction
- **Work Experience** - Job history with descriptions
- **Education** - Academic background
- **Skills** - Technical and soft skills
- **Projects** - Portfolio projects
- **Certifications** - Professional certificates
- **Languages** - Language proficiency

## 🐛 Troubleshooting

### PDF Upload Issues
- Make sure file is valid PDF (max 10MB)
- Check browser console for errors
- Try different PDF if extraction fails

### PDF Download Issues
- Use Print option as alternative
- Check browser popup blocker
- Ensure sufficient memory available

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

MIT License - Feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 💡 Tips

- Fill all sections for best results
- Use bullet points in descriptions
- Keep summary concise (2-3 lines)
- Add relevant skills only
- Proofread before downloading

## 🌟 Credits

Built with ❤️ for Pakistani job seekers

---

**Happy CV Building! 🎉**
