import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import PreviewPage from './pages/PreviewPage'

function App() {
    const [currentPage, setCurrentPage] = useState(() => {
        const hash = window.location.hash.slice(1) || 'home'
        return hash
    })
    const [cvData, setCvData] = useState(null)
    const [selectedTemplate, setSelectedTemplate] = useState(0)

    // Save to localStorage
    useEffect(() => {
        if (cvData) {
            try {
                localStorage.setItem('cvData', JSON.stringify(cvData))
                localStorage.setItem('selectedTemplate', selectedTemplate.toString())
            } catch (e) {
                console.error('Error saving to localStorage:', e)
            }
        }
    }, [cvData, selectedTemplate])

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cvData')
            const savedTemplate = localStorage.getItem('selectedTemplate')
            if (saved) {
                const parsed = JSON.parse(saved)
                // Validate that parsed data doesn't have circular references
                JSON.stringify(parsed)
                setCvData(parsed)
            }
            if (savedTemplate) setSelectedTemplate(parseInt(savedTemplate))
        } catch (e) {
            console.error('Error loading from localStorage:', e)
            // Clear corrupted data
            localStorage.removeItem('cvData')
            localStorage.removeItem('selectedTemplate')
        }
    }, [])

    const navigate = (page, data = null) => {
        if (data) {
            try {
                JSON.stringify(data)
                setCvData(data)
            } catch (e) {
                console.error('Navigation data error:', e)
                setCvData({
                    personal: { name: '', email: '', phone: '', linkedin: '', website: '', location: '', title: '' },
                    summary: '', skills: [], experience: [], education: [], projects: [], languages: [], certifications: []
                })
            }
        }
        window.location.hash = page
        setCurrentPage(page)
    }

    // Handle browser back/forward
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1) || 'home'
            setCurrentPage(hash)
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    return (
        <div className="min-h-screen animated-bg">
            {currentPage === 'home' && <HomePage navigate={navigate} />}
            {currentPage === 'editor' && <EditorPage navigate={navigate} cvData={cvData} setCvData={setCvData} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />}
            {currentPage === 'preview' && <PreviewPage navigate={navigate} cvData={cvData} selectedTemplate={selectedTemplate} />}
        </div>
    )
}

export default App
