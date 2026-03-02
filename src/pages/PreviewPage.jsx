import { useRef, useState } from 'react'
import { ArrowLeft, Download, Printer, Edit3 } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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

export default function PreviewPage({ navigate, cvData, selectedTemplate }) {
    const componentRef = useRef(null)
    const [downloading, setDownloading] = useState(false)

    const handlePrint = () => {
        window.print()
    }

    const handleDownloadPDF = async () => {
        setDownloading(true)
        try {
            const element = componentRef.current
            
            // Temporarily increase size for better quality
            const originalWidth = element.style.width
            const originalTransform = element.parentElement.style.transform
            element.parentElement.style.transform = 'scale(1)'
            element.style.width = '210mm'
            
            const canvas = await html2canvas(element, {
                scale: 4,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 794,
                height: 1123,
                windowWidth: 794,
                windowHeight: 1123
            })
            
            // Restore original styles
            element.style.width = originalWidth
            element.parentElement.style.transform = originalTransform

            const imgData = canvas.toDataURL('image/png', 1.0)
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [794, 1123],
                hotfixes: ['px_scaling']
            })

            pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123, '', 'FAST')
            pdf.save(`${cvData?.personal?.name || 'CV'}_Resume.pdf`)
        } catch (error) {
            console.error('PDF generation error:', error)
            alert('Error generating PDF. Please try Print option.')
        } finally {
            setDownloading(false)
        }
    }

    const TemplateComponent = TemplateComponents[selectedTemplate] || TemplateMidnightPro
    const tInfo = TEMPLATES_INFO[selectedTemplate]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center gap-4 no-print"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
                <button onClick={() => navigate('editor')} className="btn-secondary py-2 px-3">
                    <ArrowLeft size={16} />
                </button>

                <div className="flex-1 flex items-center gap-3">
                    <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Space Grotesk' }}>CV Preview</span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: tInfo.color }} />
                        <span className="text-slate-400 text-xs">{tInfo.name}</span>
                    </div>
                </div>

                <button onClick={() => navigate('editor')} className="btn-secondary py-2 px-4 text-sm">
                    <Edit3 size={15} /> Edit
                </button>
                <button onClick={handlePrint} className="btn-secondary py-2 px-4 text-sm">
                    <Printer size={15} /> Print
                </button>
                <button onClick={handleDownloadPDF} className="btn-primary py-2 px-5 text-sm" disabled={downloading}>
                    <Download size={15} /> {downloading ? 'Generating...' : 'Download PDF'}
                </button>
            </nav>

            {/* Preview area */}
            <div className="pt-16 flex-1 overflow-auto" style={{ background: '#ffffff' }}>
                <div className="py-8 px-4 flex justify-center min-h-screen">
                    <div style={{
                        transform: window.innerWidth < 768 ? 'scale(0.5)' : 'scale(0.85)',
                        transformOrigin: 'top center',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: window.innerWidth < 768 ? '-50%' : '-8%',
                    }}>
                        <div ref={componentRef}>
                            <TemplateComponent data={cvData} />
                        </div>
                    </div>
                </div>

                {/* Template switcher at bottom */}
                <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-3 gap-3 no-print"
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
