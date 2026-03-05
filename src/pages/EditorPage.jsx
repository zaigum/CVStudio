import { useState, useEffect } from 'react'
import { ArrowLeft, Eye, User, Briefcase, GraduationCap, Code, Award, Globe, FileText, ChevronDown, ChevronUp, Layout, Check } from 'lucide-react'
import PersonalInfo from '../components/editor/PersonalInfo'
import Summary from '../components/editor/Summary'
import Experience from '../components/editor/Experience'
import Education from '../components/editor/Education'
import Skills from '../components/editor/Skills'
import Projects from '../components/editor/Projects'
import Certifications from '../components/editor/Certifications'
import Languages from '../components/editor/Languages'
import CustomSections from '../components/editor/CustomSections'

const TEMPLATES = [
    { id: 0, name: 'Midnight Pro', color: '#6366f1', preview: 'from-indigo-600 to-purple-600' },
    { id: 1, name: 'Executive', color: '#1e293b', preview: 'from-slate-700 to-slate-900' },
    { id: 2, name: 'Creative Bloom', color: '#ec4899', preview: 'from-pink-500 to-rose-600' },
    { id: 3, name: 'Ocean Breeze', color: '#0ea5e9', preview: 'from-sky-500 to-cyan-600' },
    { id: 4, name: 'Forest Mint', color: '#10b981', preview: 'from-emerald-500 to-green-600' },
    { id: 5, name: 'Simple Clean', color: '#000000', preview: 'from-gray-800 to-gray-900' },
]

const SECTIONS = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'summary', icon: User, label: 'Summary' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: Award, label: 'Projects' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'languages', icon: Globe, label: 'Languages' },
    { id: 'custom', icon: FileText, label: 'Custom Sections' },
]

export default function EditorPage({ navigate, cvData, setCvData, selectedTemplate, setSelectedTemplate }) {
    const [activeSection, setActiveSection] = useState('personal')
    const [showTemplates, setShowTemplates] = useState(false)
    const [saveStatus, setSaveStatus] = useState('')

    // Auto-save indicator
    useEffect(() => {
        if (cvData) {
            setSaveStatus('Saving...')
            const timer = setTimeout(() => setSaveStatus('Saved ✓'), 500)
            return () => clearTimeout(timer)
        }
    }, [cvData])

    const update = (path, value) => {
        const keys = path.split('.')
        setCvData(prev => {
            try {
                const next = JSON.parse(JSON.stringify(prev))
                let obj = next
                for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
                obj[keys[keys.length - 1]] = value
                return next
            } catch (e) {
                console.error('Update error:', e)
                return prev
            }
        })
    }

    const addItem = (section, template) => {
        setCvData(prev => ({
            ...prev,
            [section]: [...(prev[section] || []), { ...template }]
        }))
    }

    const removeItem = (section, index) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }))
    }

    const updateItem = (section, index, field, value) => {
        setCvData(prev => {
            const arr = [...prev[section]]
            arr[index] = { ...arr[index], [field]: value }
            return { ...prev, [section]: arr }
        })
    }

    const t = TEMPLATES[selectedTemplate]

    const renderSection = () => {
        const props = { cvData, update, addItem, removeItem, updateItem, setCvData }
        switch (activeSection) {
            case 'personal': return <PersonalInfo {...props} />
            case 'summary': return <Summary {...props} />
            case 'experience': return <Experience {...props} />
            case 'education': return <Education {...props} />
            case 'skills': return <Skills {...props} />
            case 'projects': return <Projects {...props} />
            case 'certifications': return <Certifications {...props} />
            case 'languages': return <Languages {...props} />
            case 'custom': return <CustomSections {...props} />
            default: return null
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            {/* Top navbar */}
            <nav className="glass fixed top-0 left-0 right-0 z-50 px-3 md:px-6 py-3 flex items-center gap-2 md:gap-4"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
                <button onClick={() => navigate('home')} className="btn-secondary py-2 px-2 md:px-3">
                    <ArrowLeft size={16} />
                </button>

                <div className="flex-1 flex items-center gap-2">
                    <span className="text-gray-900 font-semibold text-xs md:text-sm hidden sm:block" style={{ fontFamily: 'Space Grotesk' }}>CV Editor</span>
                    {saveStatus && (
                        <span className="text-xs text-green-400 animate-fade-in">{saveStatus}</span>
                    )}
                </div>

                {/* Template selector */}
                <div className="relative">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="btn-secondary py-2 px-2 md:px-4 text-xs md:text-sm flex items-center gap-1 md:gap-2"
                    >
                        <Layout size={14} className="md:w-[15px] md:h-[15px]" />
                        <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                        <span className="hidden lg:inline">{t.name}</span>
                        {showTemplates ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showTemplates && (
                        <div className="absolute right-0 top-12 glass rounded-xl p-3 z-50 w-48 md:w-56"
                            style={{ border: '1px solid rgba(99,102,241,0.25)' }}>
                            {TEMPLATES.map(tmpl => (
                                <button
                                    key={tmpl.id}
                                    onClick={() => { setSelectedTemplate(tmpl.id); setShowTemplates(false) }}
                                    className="w-full flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                                >
                                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${tmpl.preview}`} />
                                    <span className="text-gray-900 text-xs md:text-sm flex-1">{tmpl.name}</span>
                                    {selectedTemplate === tmpl.id && <Check size={14} style={{ color: '#6366f1' }} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={() => navigate('preview')} className="btn-primary py-2 px-3 md:px-5 text-xs md:text-sm">
                    <Eye size={14} className="md:w-[15px] md:h-[15px]" /> <span className="hidden sm:inline">Preview</span>
                </button>
            </nav>

            <div className="pt-16 flex flex-1">
                {/* Sidebar */}
                <div className="w-14 md:w-16 lg:w-56 glass fixed left-0 top-16 bottom-0 flex flex-col py-2 md:py-4 gap-1 px-1 md:px-2"
                    style={{ borderRight: '1px solid rgba(99,102,241,0.15)' }}>
                    {SECTIONS.map(sec => (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id)}
                            className={`flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-3 rounded-lg md:rounded-xl transition-all text-left ${activeSection === sec.id
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            style={activeSection === sec.id ? {
                                border: '1px solid rgba(99,102,241,0.2)'
                            } : {}}
                        >
                            <sec.icon size={16} className="md:w-[17px] md:h-[17px]" style={{ flexShrink: 0 }} />
                            <span className="text-xs md:text-sm font-medium hidden lg:block">{sec.label}</span>
                        </button>
                    ))}
                </div>

                {/* Editor Content */}
                <div className="ml-14 md:ml-16 lg:ml-56 flex-1 p-3 md:p-6 max-w-3xl">
                    <div className="animate-fade-in">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
    )
}


