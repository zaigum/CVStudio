import { useRef } from 'react'
import { ArrowLeft, Download, Printer, Edit3 } from 'lucide-react'
import TemplateMidnightPro from '../templates/TemplateMidnight'
import TemplateExecutive from '../templates/TemplateExecutive'
import TemplateCreativeBloom from '../templates/TemplateCreativeBloom'
import TemplateOceanBreeze from '../templates/TemplateOceanBreeze'
import TemplateForestMint from '../templates/TemplateForestMint'

const TEMPLATES_INFO = [
    { id: 0, name: 'Midnight Pro', color: '#6366f1' },
    { id: 1, name: 'Executive', color: '#3b82f6' },
    { id: 2, name: 'Creative Bloom', color: '#ec4899' },
    { id: 3, name: 'Ocean Breeze', color: '#0ea5e9' },
    { id: 4, name: 'Forest Mint', color: '#10b981' },
]

const TemplateComponents = [
    TemplateMidnightPro,
    TemplateExecutive,
    TemplateCreativeBloom,
    TemplateOceanBreeze,
    TemplateForestMint,
]

export default function PreviewPage({ navigate, cvData, selectedTemplate }) {
    const printRef = useRef(null)

    const handlePrint = () => {
        const el = document.getElementById('cv-preview')
        if (!el) return
        const html = el.outerHTML
        const win = window.open('', '_blank')
        win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${cvData?.personal?.name || 'Resume'}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { margin: 0; background: white; }
            @page { size: A4; margin: 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${html}
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `)
        win.document.close()
    }

    const handleDownloadPDF = async () => {
        const downloadBtn = document.querySelector('[data-download-btn]')
        if (downloadBtn) downloadBtn.textContent = 'Downloading...'

        try {
            const { default: jsPDF } = await import('jspdf')
            const { default: html2canvas } = await import('html2canvas')

            const el = document.getElementById('cv-preview')
            if (!el) return

            const canvas = await html2canvas(el, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                windowWidth: 794,
                windowHeight: 1123,
                letterRendering: true,
                allowTaint: false,
                removeContainer: true
            })

            const imgData = canvas.toDataURL('image/png', 1.0)
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            })

            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 0

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save(`${cvData?.personal?.name || 'CV'}_Resume.pdf`)
        } catch (e) {
            console.error('PDF download error:', e)
            alert('Error downloading PDF. Please use Print option.')
        } finally {
            if (downloadBtn) downloadBtn.textContent = 'Download PDF'
        }
    }

    const TemplateComponent = TemplateComponents[selectedTemplate] || TemplateMidnightPro
    const tInfo = TEMPLATES_INFO[selectedTemplate]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center gap-4"
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
                <button onClick={handleDownloadPDF} className="btn-primary py-2 px-5 text-sm" data-download-btn>
                    <Download size={15} /> Download PDF
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
                        <div ref={printRef}>
                            <TemplateComponent data={cvData} />
                        </div>
                    </div>
                </div>

                {/* Template switcher at bottom */}
                <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-3 gap-3"
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
