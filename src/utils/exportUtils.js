// Export to JSON
export const exportToJSON = (cvData) => {
    const dataStr = JSON.stringify(cvData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cvData?.personal?.name || 'CV'}_data.json`
    link.click()
    URL.revokeObjectURL(url)
}

// Export to Word (HTML format)
export const exportToWord = (cvData) => {
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${cvData?.personal?.name || 'CV'}</title></head>
<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
<h1>${cvData?.personal?.name || ''}</h1>
<p>${cvData?.personal?.email || ''} | ${cvData?.personal?.phone || ''}</p>
<p>${cvData?.personal?.location || ''}</p>
${cvData?.summary ? `<h2>Summary</h2><p>${cvData.summary}</p>` : ''}
${cvData?.experience?.length ? `<h2>Experience</h2>${cvData.experience.map(e => `
<div><h3>${e.position}</h3><p><strong>${e.company}</strong> | ${e.duration}</p><p>${e.description}</p></div>
`).join('')}` : ''}
${cvData?.education?.length ? `<h2>Education</h2>${cvData.education.map(e => `
<div><h3>${e.degree}</h3><p><strong>${e.institution}</strong> | ${e.year}</p></div>
`).join('')}` : ''}
${cvData?.skills?.length ? `<h2>Skills</h2><p>${cvData.skills.join(', ')}</p>` : ''}
</body>
</html>`
    const blob = new Blob([html], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cvData?.personal?.name || 'CV'}.doc`
    link.click()
    URL.revokeObjectURL(url)
}

// Import from JSON
export const importFromJSON = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result)
                resolve(data)
            } catch (err) {
                reject(new Error('Invalid JSON file'))
            }
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsText(file)
    })
}
