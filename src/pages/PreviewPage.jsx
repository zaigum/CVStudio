import { useRef, useState } from 'react'
import { ArrowLeft, Download, Printer, Edit3, FileJson, FileText as FileTextIcon, History } from 'lucide-react'
import { generateHighQualityPDF } from '../utils/pdfGenerator'
import { exportToJSON, exportToWord } from '../utils/exportUtils'
import VersionHistory from '../components/VersionHistory'
import TemplateMidnightPro from '../templates/TemplateMidnight'
import TemplateExecutive from '../templates/TemplateExecutive'
import TemplateCreativeBloom from '../templates/TemplateCreativeBloom'
import TemplateOceanBreeze from '../templates/TemplateOceanBreeze'
import TemplateForestMint from '../templates/TemplateForestMint'
import TemplateSimpleClean from '../templates/TemplateSimpleClean'

const TEMPLATES_INFO = [
    { id: 0, name: 'Midnight Pro', color: '#6366f1' },
    { id: 1, name: 'Executive', color: '#3b82f6' },
    { id: 2, name: 'Creative Bloom', color: '#ec4899' },
    { id: 3, name: 'Ocean Breeze', color: '#0ea5e9' },
    { id: 4, name: 'Forest Mint', color: '#10b981' },
    { id: 5, name: 'Simple Clean', color: '#000000' },
]

const TemplateComponents = [
    TemplateMidnightPro,
    TemplateExecutive,
    TemplateCreativeBloom,
    TemplateOceanBreeze,
    TemplateForestMint,
    TemplateSimpleClean,
]

export default function PreviewPage({ navigate, cvData, selectedTemplate, setCvData }) {
    const componentRef = useRef(null)
    const [downloading, setDownloading] = useState(false)
    const [showExportMenu, setShowExportMenu] = useState(false)
    const [showVersionHistory, setShowVersionHistory] = useState(false)

    const handlePrint = () => {
        window.print()
    }

    const handleDownloadPDF = async () => {
        setDownloading(true)
        const result = await generateHighQualityPDF(
            componentRef.current, 
            `${cvData?.personal?.name || 'CV'}_Resume.pdf`
        )
        if (!result.success) {
            alert('Error generating PDF. Please try Print option.')
        }
        setDownloading(false)
    }

    const TemplateComponent = TemplateComponents[selectedTemplate] || TemplateMidnightPro
    const tInfo = TEMPLATES_INFO[selectedTemplate]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="glass fixed top-0 left-0 right-0 z-50 px-3 md:px-6 py-3 flex items-center gap-2 md:gap-4 no-print"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
                <button onClick={() => navigate('editor')} className="btn-secondary py-2 px-2 md:px-3">
                    <ArrowLeft size={16} />
                </button>

                <div className="flex-1 flex items-center gap-2 md:gap-3">
                    <span className="text-white font-semibold text-xs md:text-sm hidden sm:block" style={{ fontFamily: 'Space Grotesk' }}>CV Preview</span>
                    <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: tInfo.color }} />
                        <span className="text-slate-400 text-[10px] md:text-xs">{tInfo.name}</span>
                    </div>
                </div>

                <button onClick={() => navigate('editor')} className="btn-secondary py-2 px-2 md:px-4 text-xs md:text-sm hidden sm:flex">
                    <Edit3 size={14} className="md:w-[15px] md:h-[15px]" /> Edit
                </button>
                <button onClick={() => setShowVersionHistory(!showVersionHistory)} className="btn-secondary py-2 px-2 md:px-3">
                    <History size={14} />
                </button>
                <button onClick={handlePrint} className="btn-secondary py-2 px-2 md:px-4 text-xs md:text-sm">
                    <Printer size={14} className="md:w-[15px] md:h-[15px]" /> <span className="hidden md:inline">Print</span>
                </button>
                <div className="relative">
                    <button onClick={() => setShowExportMenu(!showExportMenu)} className="btn-primary py-2 px-3 md:px-5 text-xs md:text-sm">
                        <Download size={14} className="md:w-[15px] md:h-[15px]" /> <span className="hidden sm:inline">Export</span>
                    </button>
                    {showExportMenu && (
                        <div className="absolute right-0 top-12 glass rounded-xl p-2 z-50 w-40">
                            <button onClick={() => { handleDownloadPDF(); setShowExportMenu(false) }} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded flex items-center gap-2">
                                <Download size={12} /> PDF
                            </button>
                            <button onClick={() => { exportToJSON(cvData); setShowExportMenu(false) }} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded flex items-center gap-2">
                                <FileJson size={12} /> JSON
                            </button>
                            <button onClick={() => { exportToWord(cvData); setShowExportMenu(false) }} className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded flex items-center gap-2">
                                <FileTextIcon size={12} /> Word
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Preview area */}
            <div className="pt-16 flex-1 overflow-auto" style={{ background: '#ffffff' }}>
                {showVersionHistory && (
                    <div className="fixed right-4 top-20 z-50 w-80">
                        <VersionHistory cvData={cvData} onRestore={(data) => { setCvData(data); setShowVersionHistory(false) }} />
                    </div>
                )}
                <div className="py-4 md:py-8 px-2 md:px-4 flex justify-center min-h-screen">
                    <div style={{
                        transform: window.innerWidth < 640 ? 'scale(0.4)' : window.innerWidth < 768 ? 'scale(0.5)' : window.innerWidth < 1024 ? 'scale(0.7)' : 'scale(0.85)',
                        transformOrigin: 'top center',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: window.innerWidth < 640 ? '-60%' : window.innerWidth < 768 ? '-50%' : window.innerWidth < 1024 ? '-30%' : '-8%',
                    }}>
                        <div ref={componentRef}>
                            <TemplateComponent data={cvData} />
                        </div>
                    </div>
                </div>

                {/* Template switcher at bottom */}
                <div className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-3 gap-3 no-print"
                    style={{ border: '1px solid rgba(99,102,241,0.2)', zIndex: 40 }}>
                    {TEMPLATES_INFO.map(t => (
                        <button
                            key={t.id}
                            onClick={() => navigate('editor')}
                            className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all hover:bg-white/5"
                            title={t.name}
                        >
                            <div className="w-8 h-5 rounded-md" style={{ background: t.color, opacity: selectedTemplate === t.id ? 1 : 0.4 }} />
                            <span className="text-xs" style={{ color: selectedTemplate === t.id ? '#fff' : '#64748b', fontSize: '9px' }}>
                                {t.name.split(' ')[0]}
                            </span>
                        </button>
                    ))}
                    <span className="text-slate-500 text-xs flex items-center pl-2 ml-1 border-l border-slate-700">
                        Change template
                    </span>
                </div>
            </div>
        </div>
    )
}
