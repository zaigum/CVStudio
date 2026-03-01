import { useState, useEffect } from 'react'
import {
    ArrowLeft, Eye, Save, User, Briefcase, GraduationCap,
    Code, Award, Globe, Plus, Trash2, ChevronDown, ChevronUp,
    Layout, Check
} from 'lucide-react'

const TEMPLATES = [
    { id: 0, name: 'Midnight Pro', color: '#6366f1', preview: 'from-indigo-600 to-purple-600' },
    { id: 1, name: 'Executive', color: '#1e293b', preview: 'from-slate-700 to-slate-900' },
    { id: 2, name: 'Creative Bloom', color: '#ec4899', preview: 'from-pink-500 to-rose-600' },
    { id: 3, name: 'Ocean Breeze', color: '#0ea5e9', preview: 'from-sky-500 to-cyan-600' },
    { id: 4, name: 'Forest Mint', color: '#10b981', preview: 'from-emerald-500 to-green-600' },
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
]

export default function EditorPage({ navigate, cvData, setCvData, selectedTemplate, setSelectedTemplate }) {
    const [activeSection, setActiveSection] = useState('personal')
    const [showTemplates, setShowTemplates] = useState(false)
    const [newSkill, setNewSkill] = useState('')
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
            const next = JSON.parse(JSON.stringify(prev))
            let obj = next
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
            obj[keys[keys.length - 1]] = value
            return next
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

    const addSkill = () => {
        if (newSkill.trim()) {
            setCvData(prev => ({ ...prev, skills: [...(prev.skills || []), newSkill.trim()] }))
            setNewSkill('')
        }
    }

    const removeSkill = (idx) => {
        setCvData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }))
    }

    const t = TEMPLATES[selectedTemplate]

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            {/* Top navbar */}
            <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center gap-4"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
                <button onClick={() => navigate('home')} className="btn-secondary py-2 px-3">
                    <ArrowLeft size={16} />
                </button>

                <div className="flex-1 flex items-center gap-2">
                    <span className="text-gray-900 font-semibold text-sm hidden md:block" style={{ fontFamily: 'Space Grotesk' }}>CV Editor</span>
                    {saveStatus && (
                        <span className="text-xs text-green-400 animate-fade-in">{saveStatus}</span>
                    )}
                </div>

                {/* Template selector */}
                <div className="relative">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="btn-secondary py-2 px-4 text-sm flex items-center gap-2"
                    >
                        <Layout size={15} />
                        <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                        <span className="hidden md:inline">{t.name}</span>
                        {showTemplates ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showTemplates && (
                        <div className="absolute right-0 top-12 glass rounded-xl p-3 z-50 w-56"
                            style={{ border: '1px solid rgba(99,102,241,0.25)' }}>
                            {TEMPLATES.map(tmpl => (
                                <button
                                    key={tmpl.id}
                                    onClick={() => { setSelectedTemplate(tmpl.id); setShowTemplates(false) }}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tmpl.preview}`} />
                                    <span className="text-gray-900 text-sm flex-1">{tmpl.name}</span>
                                    {selectedTemplate === tmpl.id && <Check size={14} style={{ color: '#6366f1' }} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={() => navigate('preview')} className="btn-primary py-2 px-5 text-sm">
                    <Eye size={15} /> Preview
                </button>
            </nav>

            <div className="pt-16 flex flex-1">
                {/* Sidebar */}
                <div className="w-16 md:w-56 glass fixed left-0 top-16 bottom-0 flex flex-col py-4 gap-1 px-2"
                    style={{ borderRight: '1px solid rgba(99,102,241,0.15)' }}>
                    {SECTIONS.map(sec => (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${activeSection === sec.id
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            style={activeSection === sec.id ? {
                                border: '1px solid rgba(99,102,241,0.2)'
                            } : {}}
                        >
                            <sec.icon size={17} style={{ flexShrink: 0 }} />
                            <span className="text-sm font-medium hidden md:block">{sec.label}</span>
                        </button>
                    ))}
                </div>

                {/* Editor Content */}
                <div className="ml-16 md:ml-56 flex-1 p-6 max-w-3xl">
                    <div className="animate-fade-in">

                        {/* PERSONAL INFO */}
                        {activeSection === 'personal' && (
                            <Section title="Personal Information" icon={User}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Full Name" value={cvData.personal?.name || ''} onChange={v => update('personal.name', v)} placeholder="e.g. Ahmed Ali" />
                                    <Field label="Professional Title" value={cvData.personal?.title || ''} onChange={v => update('personal.title', v)} placeholder="e.g. Software Engineer" />
                                    <Field label="Email" value={cvData.personal?.email || ''} onChange={v => update('personal.email', v)} placeholder="ahmed@email.com" type="email" />
                                    <Field label="Phone" value={cvData.personal?.phone || ''} onChange={v => update('personal.phone', v)} placeholder="+92 300 1234567" />
                                    <Field label="Location" value={cvData.personal?.location || ''} onChange={v => update('personal.location', v)} placeholder="Lahore, Pakistan" />
                                    <Field label="LinkedIn" value={cvData.personal?.linkedin || ''} onChange={v => update('personal.linkedin', v)} placeholder="linkedin.com/in/ahmed" />
                                    <Field label="Website / Portfolio" value={cvData.personal?.website || ''} onChange={v => update('personal.website', v)} placeholder="ahmed.dev" className="md:col-span-2" />
                                </div>
                            </Section>
                        )}

                        {/* SUMMARY */}
                        {activeSection === 'summary' && (
                            <Section title="Professional Summary" icon={User}>
                                <label className="text-gray-600 text-xs mb-2 block">Describe yourself in 2-3 lines</label>
                                <textarea
                                    className="input-field resize-none"
                                    rows={5}
                                    value={cvData.summary || ''}
                                    onChange={e => update('summary', e.target.value)}
                                    placeholder="Passionate software engineer with 3+ years of experience in building scalable web applications..."
                                />
                            </Section>
                        )}

                        {/* EXPERIENCE */}
                        {activeSection === 'experience' && (
                            <Section title="Work Experience" icon={Briefcase}>
                                {(cvData.experience || []).map((exp, i) => (
                                    <ItemCard key={i} index={i} onDelete={() => removeItem('experience', i)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Field label="Job Title" value={exp.title} onChange={v => updateItem('experience', i, 'title', v)} placeholder="Software Engineer" />
                                            <Field label="Company" value={exp.company} onChange={v => updateItem('experience', i, 'company', v)} placeholder="Company Name" />
                                            <Field label="Duration" value={exp.duration} onChange={v => updateItem('experience', i, 'duration', v)} placeholder="Jan 2022 - Present" />
                                            <Field label="Location" value={exp.location || ''} onChange={v => updateItem('experience', i, 'location', v)} placeholder="Lahore, Pakistan" />
                                        </div>
                                        <label className="text-gray-600 text-xs mt-3 mb-1 block">Description (bullet points, separate with Enter)</label>
                                        <textarea
                                            className="input-field resize-none mt-1"
                                            rows={3}
                                            value={exp.description || ''}
                                            onChange={e => updateItem('experience', i, 'description', e.target.value)}
                                            placeholder="• Developed React applications...&#10;• Led a team of 5 developers..."
                                        />
                                    </ItemCard>
                                ))}
                                <button className="btn-secondary w-full mt-3" onClick={() => addItem('experience', { title: '', company: '', duration: '', location: '', description: '' })}>
                                    <Plus size={16} /> Add Experience
                                </button>
                            </Section>
                        )}

                        {/* EDUCATION */}
                        {activeSection === 'education' && (
                            <Section title="Education" icon={GraduationCap}>
                                {(cvData.education || []).map((edu, i) => (
                                    <ItemCard key={i} index={i} onDelete={() => removeItem('education', i)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Field label="Degree" value={edu.degree} onChange={v => updateItem('education', i, 'degree', v)} placeholder="Bachelor of Computer Science" />
                                            <Field label="Institution" value={edu.school} onChange={v => updateItem('education', i, 'school', v)} placeholder="LUMS / FAST / NUST" />
                                            <Field label="Year" value={edu.year} onChange={v => updateItem('education', i, 'year', v)} placeholder="2020 - 2024" />
                                            <Field label="GPA / Grade" value={edu.gpa || ''} onChange={v => updateItem('education', i, 'gpa', v)} placeholder="3.8 / 4.0" />
                                        </div>
                                    </ItemCard>
                                ))}
                                <button className="btn-secondary w-full mt-3" onClick={() => addItem('education', { degree: '', school: '', year: '', gpa: '' })}>
                                    <Plus size={16} /> Add Education
                                </button>
                            </Section>
                        )}

                        {/* SKILLS */}
                        {activeSection === 'skills' && (
                            <Section title="Skills" icon={Code}>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        className="input-field"
                                        value={newSkill}
                                        onChange={e => setNewSkill(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addSkill()}
                                        placeholder="Type skill (e.g. React, Python...)"
                                    />
                                    <button className="btn-primary px-4" onClick={addSkill}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(cvData.skills || []).map((skill, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                                            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
                                            {skill}
                                            <button onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-300 transition-colors">
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {(cvData.skills || []).length === 0 && (
                                    <p className="text-gray-500 text-sm text-center py-8">No skills added. Add above.</p>
                                )}
                            </Section>
                        )}

                        {/* PROJECTS */}
                        {activeSection === 'projects' && (
                            <Section title="Projects" icon={Award}>
                                {(cvData.projects || []).map((proj, i) => (
                                    <ItemCard key={i} index={i} onDelete={() => removeItem('projects', i)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Field label="Project Name" value={proj.name || ''} onChange={v => updateItem('projects', i, 'name', v)} placeholder="E-Commerce Website" />
                                            <Field label="Tech Stack" value={proj.tech || ''} onChange={v => updateItem('projects', i, 'tech', v)} placeholder="React, Node.js, MongoDB" />
                                            <Field label="Link" value={proj.link || ''} onChange={v => updateItem('projects', i, 'link', v)} placeholder="github.com/username/project" />
                                            <Field label="Year" value={proj.year || ''} onChange={v => updateItem('projects', i, 'year', v)} placeholder="2024" />
                                        </div>
                                        <textarea
                                            className="input-field resize-none mt-3"
                                            rows={2}
                                            value={proj.description || ''}
                                            onChange={e => updateItem('projects', i, 'description', e.target.value)}
                                            placeholder="Project description..."
                                        />
                                    </ItemCard>
                                ))}
                                <button className="btn-secondary w-full mt-3" onClick={() => addItem('projects', { name: '', tech: '', description: '', link: '', year: '' })}>
                                    <Plus size={16} /> Add Project
                                </button>
                            </Section>
                        )}

                        {/* CERTIFICATIONS */}
                        {activeSection === 'certifications' && (
                            <Section title="Certifications" icon={Award}>
                                {(cvData.certifications || []).map((cert, i) => (
                                    <ItemCard key={i} index={i} onDelete={() => removeItem('certifications', i)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <Field label="Certificate Name" value={cert.name || ''} onChange={v => updateItem('certifications', i, 'name', v)} placeholder="AWS Solutions Architect" />
                                            <Field label="Issuer" value={cert.issuer || ''} onChange={v => updateItem('certifications', i, 'issuer', v)} placeholder="Amazon Web Services" />
                                            <Field label="Date" value={cert.date || ''} onChange={v => updateItem('certifications', i, 'date', v)} placeholder="2024" />
                                            <Field label="Credential ID" value={cert.id || ''} onChange={v => updateItem('certifications', i, 'id', v)} placeholder="ABC123" />
                                        </div>
                                    </ItemCard>
                                ))}
                                <button className="btn-secondary w-full mt-3" onClick={() => addItem('certifications', { name: '', issuer: '', date: '', id: '' })}>
                                    <Plus size={16} /> Add Certification
                                </button>
                            </Section>
                        )}

                        {/* LANGUAGES */}
                        {activeSection === 'languages' && (
                            <Section title="Languages" icon={Globe}>
                                {(cvData.languages || []).map((lang, i) => (
                                    <ItemCard key={i} index={i} onDelete={() => removeItem('languages', i)}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Language" value={lang.name || ''} onChange={v => updateItem('languages', i, 'name', v)} placeholder="English" />
                                            <div>
                                                <label className="text-slate-400 text-xs mb-1 block">Proficiency</label>
                                                <select
                                                    className="input-field"
                                                    value={lang.level || 'Intermediate'}
                                                    onChange={e => updateItem('languages', i, 'level', e.target.value)}
                                                >
                                                    <option>Native</option>
                                                    <option>Fluent</option>
                                                    <option>Advanced</option>
                                                    <option>Intermediate</option>
                                                    <option>Basic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </ItemCard>
                                ))}
                                <button className="btn-secondary w-full mt-3" onClick={() => addItem('languages', { name: '', level: 'Intermediate' })}>
                                    <Plus size={16} /> Add Language
                                </button>
                            </Section>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

function Section({ title, icon: Icon, children }) {
    return (
        <div className="glass rounded-2xl p-6 animate-slide-up" style={{ marginBottom: '20px' }}>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)' }}>
                    <Icon size={17} style={{ color: '#6366f1' }} />
                </div>
                <h2 className="text-gray-900 font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>{title}</h2>
            </div>
            {children}
        </div>
    )
}

function Field({ label, value, onChange, placeholder, type = 'text', className = '' }) {
    return (
        <div className={className}>
            <label className="text-gray-600 text-xs mb-1 block">{label}</label>
            <input
                type={type}
                className="input-field"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

function ItemCard({ children, index, onDelete }) {
    return (
        <div className="rounded-xl p-4 mb-3 relative bg-white" style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
            <button
                onClick={onDelete}
                className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-900/20"
            >
                <Trash2 size={15} />
            </button>
            {children}
        </div>
    )
}
