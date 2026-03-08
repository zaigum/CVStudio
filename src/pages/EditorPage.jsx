import { useState, useEffect } from 'react'
import { ArrowLeft, Eye, User, Briefcase, GraduationCap, Code, Award, Globe, FileText, ChevronDown, ChevronUp, Layout, Check, Undo2, Redo2, Download, Lightbulb, SpellCheck, Grid3x3 } from 'lucide-react'
import KeyboardShortcuts from '../components/KeyboardShortcuts'
import DragDropSection from '../components/DragDropSection'
import TemplateComparison from '../components/TemplateComparison'
import { exportToJSON, exportToWord } from '../utils/exportUtils'
import { getSummarySuggestions, getSkillSuggestions, improveDescription } from '../utils/aiSuggestions'
import { checkSpelling, autoCorrect } from '../utils/spellCheck'
import PersonalInfo from '../components/editor/PersonalInfo'
import Summary from '../components/editor/Summary'
import Experience from '../components/editor/Experience'
import Education from '../components/editor/Education'
import Skills from '../components/editor/Skills'
import Projects from '../components/editor/Projects'
import Certifications from '../components/editor/Certifications'
import Languages from '../components/editor/Languages'
import CustomSections from '../components/editor/CustomSections'

import TemplateMidnightPro from '../templates/TemplateMidnight'
import TemplateExecutive from '../templates/TemplateExecutive'
import TemplateCreativeBloom from '../templates/TemplateCreativeBloom'
import TemplateOceanBreeze from '../templates/TemplateOceanBreeze'
import TemplateForestMint from '../templates/TemplateForestMint'
import TemplateSimpleClean from '../templates/TemplateSimpleClean'

const TEMPLATE_COMPONENTS = [
    TemplateMidnightPro,
    TemplateExecutive,
    TemplateCreativeBloom,
    TemplateOceanBreeze,
    TemplateForestMint,
    TemplateSimpleClean,
]

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

export default function EditorPage({ navigate, cvData, setCvData, selectedTemplate, setSelectedTemplate, undo, redo, canUndo, canRedo }) {
    const [activeSection, setActiveSection] = useState('personal')
    const [showTemplates, setShowTemplates] = useState(false)
    const [saveStatus, setSaveStatus] = useState('')
    const [sections, setSections] = useState(SECTIONS)
    const [showComparison, setShowComparison] = useState(false)
    const [showAISuggestions, setShowAISuggestions] = useState(false)
    const [showExportMenu, setShowExportMenu] = useState(false)
    const [spellErrors, setSpellErrors] = useState([])

    // Auto-save indicator
    useEffect(() => {
        if (cvData) {
            setSaveStatus('Saving...')
            const timer = setTimeout(() => setSaveStatus('Saved ✓'), 500)
            return () => clearTimeout(timer)
        }
    }, [cvData])

    // Spell check
    useEffect(() => {
        const text = cvData?.summary || ''
        const { errors } = checkSpelling(text)
        setSpellErrors(errors)
    }, [cvData?.summary])

    const handleAutoCorrect = () => {
        if (cvData?.summary) {
            update('summary', autoCorrect(cvData.summary))
        }
    }

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

                {canUndo && (
                    <button onClick={undo} className="btn-secondary py-2 px-2 md:px-3" title="Undo (Ctrl+Z)">
                        <Undo2 size={14} />
                    </button>
                )}
                {canRedo && (
                    <button onClick={redo} className="btn-secondary py-2 px-2 md:px-3" title="Redo (Ctrl+Y)">
                        <Redo2 size={14} />
                    </button>
                )}
                
                <div className="relative">
                    <button onClick={() => setShowExportMenu(!showExportMenu)} className="btn-secondary py-2 px-2 md:px-3">
                        <Download size={14} />
                    </button>
                    {showExportMenu && (
                        <div className="absolute right-0 top-12 glass rounded-xl p-2 z-50 w-40">
                            <button onClick={() => { exportToJSON(cvData); setShowExportMenu(false) }} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded">Export JSON</button>
                            <button onClick={() => { exportToWord(cvData); setShowExportMenu(false) }} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded">Export Word</button>
                        </div>
                    )}
                </div>

                <button onClick={() => setShowComparison(true)} className="btn-secondary py-2 px-2 md:px-3" title="Compare Templates">
                    <Grid3x3 size={14} />
                </button>

                <button onClick={() => setShowAISuggestions(!showAISuggestions)} className="btn-secondary py-2 px-2 md:px-3" title="AI Suggestions">
                    <Lightbulb size={14} />
                </button>

                {spellErrors.length > 0 && (
                    <button onClick={handleAutoCorrect} className="btn-secondary py-2 px-2 md:px-3 text-orange-500" title="Fix Spelling">
                        <SpellCheck size={14} />
                    </button>
                )}

                <button onClick={() => navigate('preview')} className="btn-primary py-2 px-3 md:px-5 text-xs md:text-sm">
                    <Eye size={14} className="md:w-[15px] md:h-[15px]" /> <span className="hidden sm:inline">Preview</span>
                </button>
            </nav>

            <div className="pt-16 flex flex-1">
                {/* Sidebar */}
                <div className="w-14 md:w-16 lg:w-56 glass fixed left-0 top-16 bottom-0 flex flex-col py-2 md:py-4 px-1 md:px-2"
                    style={{ borderRight: '1px solid rgba(99,102,241,0.15)' }}>
                    <DragDropSection 
                        sections={sections} 
                        onReorder={setSections} 
                        activeSection={activeSection} 
                        setActiveSection={setActiveSection} 
                    />
                </div>

                {/* Editor Content */}
                <div className="ml-14 md:ml-16 lg:ml-56 flex-1 p-3 md:p-6 max-w-3xl">
                    {showAISuggestions && (
                        <div className="glass rounded-xl p-4 mb-4">
                            <h3 className="text-sm font-bold mb-2 flex items-center gap-2"><Lightbulb size={16} /> AI Suggestions</h3>
                            {activeSection === 'summary' && (
                                <div className="space-y-2">
                                    {getSummarySuggestions(cvData).map((s, i) => (
                                        <button key={i} onClick={() => update('summary', s)} className="w-full text-left text-xs p-2 rounded bg-white/5 hover:bg-white/10">{s}</button>
                                    ))}
                                </div>
                            )}
                            {activeSection === 'skills' && getSkillSuggestions(cvData?.skills).length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {getSkillSuggestions(cvData?.skills).map((s, i) => (
                                        <button key={i} onClick={() => setCvData(prev => ({ ...prev, skills: [...(prev.skills || []), s] }))} className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30">{s}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="animate-fade-in">
                        {renderSection()}
                    </div>
                </div>
            </div>

            <KeyboardShortcuts 
                onSave={() => setSaveStatus('Saved ✓')} 
                onPreview={() => navigate('preview')} 
                onUndo={undo} 
                onRedo={redo} 
                canUndo={canUndo} 
                canRedo={canRedo} 
            />

            {showComparison && (
                <TemplateComparison 
                    onClose={() => setShowComparison(false)} 
                    onSelect={setSelectedTemplate} 
                    TemplateComponents={TEMPLATE_COMPONENTS} 
                    cvData={cvData} 
                />
            )}
        </div>
    )
}


