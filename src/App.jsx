import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import PreviewPage from './pages/PreviewPage'

function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [cvData, setCvData] = useState(null)
    const [selectedTemplate, setSelectedTemplate] = useState(0)

    // Save to localStorage
    useEffect(() => {
        if (cvData) {
            localStorage.setItem('cvData', JSON.stringify(cvData))
            localStorage.setItem('selectedTemplate', selectedTemplate.toString())
        }
    }, [cvData, selectedTemplate])

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cvData')
        const savedTemplate = localStorage.getItem('selectedTemplate')
        if (saved) setCvData(JSON.parse(saved))
        if (savedTemplate) setSelectedTemplate(parseInt(savedTemplate))
    }, [])

    const navigate = (page, data = null) => {
        if (data) setCvData(data)
        setCurrentPage(page)
    }

    return (
        <div className="min-h-screen animated-bg">
            {currentPage === 'home' && (
                <HomePage navigate={navigate} />
            )}
            {currentPage === 'editor' && (
                <EditorPage
                    navigate={navigate}
                    cvData={cvData}
                    setCvData={setCvData}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                />
            )}
            {currentPage === 'preview' && (
                <PreviewPage
                    navigate={navigate}
                    cvData={cvData}
                    selectedTemplate={selectedTemplate}
                />
            )}
        </div>
    )
}

export default App
