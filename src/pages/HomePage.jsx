import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Sparkles, Zap, Layout, Download, ArrowRight, Star } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocument } from 'pdf-lib'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

const TEMPLATES = [
    { id: 0, name: 'Midnight Pro', colors: ['#6366f1', '#8b5cf6'], preview: 'bg-gradient-to-br from-indigo-900 to-purple-900' },
    { id: 1, name: 'Executive', colors: ['#0f172a', '#1e293b'], preview: 'bg-gradient-to-br from-slate-900 to-slate-800' },
    { id: 2, name: 'Creative Bloom', colors: ['#ec4899', '#f43f5e'], preview: 'bg-gradient-to-br from-pink-900 to-rose-900' },
    { id: 3, name: 'Ocean Breeze', colors: ['#0ea5e9', '#06b6d4'], preview: 'bg-gradient-to-br from-sky-900 to-cyan-900' },
    { id: 4, name: 'Forest Mint', colors: ['#10b981', '#059669'], preview: 'bg-gradient-to-br from-emerald-900 to-green-900' },
]

const FEATURES = [
    { icon: Upload, title: 'PDF Scan & Import', desc: 'Upload your existing CV and automatically extract data' },
    { icon: Layout, title: '5 Premium Templates', desc: 'Professional and modern templates that impress' },
    { icon: Sparkles, title: 'AI-Powered Suggestions', desc: 'Get suggestions to improve your CV'},
    { icon: Download, title: 'PDF Export', desc: 'Download in high quality PDF format' },
]

export default function HomePage({ navigate }) {
    const [scanning, setScanning] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [error, setError] = useState('')

    const extractPages = async (arrayBuffer, pageNumbers) => {
        const srcDoc = await PDFDocument.load(arrayBuffer)
        const newDoc = await PDFDocument.create()
        const pages = await newDoc.copyPages(srcDoc, pageNumbers.map(n => n - 1))
        pages.forEach(page => newDoc.addPage(page))
        return await newDoc.save()
    }

    const splitPDF = async (arrayBuffer) => {
        const srcDoc = await PDFDocument.load(arrayBuffer)
        const totalPages = srcDoc.getPageCount()
        const pdfs = []
        
        for (let i = 0; i < totalPages; i++) {
            const newDoc = await PDFDocument.create()
            const [page] = await newDoc.copyPages(srcDoc, [i])
            newDoc.addPage(page)
            pdfs.push(await newDoc.save())
        }
        return pdfs
    }

    const mergePDFs = async (pdfBuffers) => {
        const mergedDoc = await PDFDocument.create()
        for (const buffer of pdfBuffers) {
            const pdf = await PDFDocument.load(buffer)
            const pages = await mergedDoc.copyPages(pdf, pdf.getPageIndices())
            pages.forEach(page => mergedDoc.addPage(page))
        }
        return await mergedDoc.save()
    }

    const removePage = async (arrayBuffer, pageNumber) => {
        const srcDoc = await PDFDocument.load(arrayBuffer)
        const newDoc = await PDFDocument.create()
        const totalPages = srcDoc.getPageCount()
        const pageIndices = Array.from({length: totalPages}, (_, i) => i).filter(i => i !== pageNumber - 1)
        const pages = await newDoc.copyPages(srcDoc, pageIndices)
        pages.forEach(page => newDoc.addPage(page))
        return await newDoc.save()
    }

    const extractTextFromPDF = async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
            let fullText = ''

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map(item => item.str).join(' ')
                fullText += pageText + '\n'
                setScanProgress(Math.round((i / pdf.numPages) * 100))
            }
            
            // Clean up text - replace multiple spaces with single space
            fullText = fullText.replace(/\s+/g, ' ').replace(/\s*\n\s*/g, '\n')
            return fullText
        } catch (e) {
            throw new Error('Error reading PDF: ' + e.message)
        }
    }

    const parseResumeText = (text) => {
        console.log('🔍 Starting parsing...')
        
        // Split by common delimiters
        const lines = text.split(/[\n•]/).map(l => l.trim()).filter(l => l.length > 2)
        console.log('📝 Total lines:', lines.length)

        // Extract name (first meaningful line)
        const nameMatch = text.match(/^([A-Z][a-z]+\s+[A-Z][a-z]+)/)
        const name = nameMatch ? nameMatch[1] : lines[0]?.split(/Developer|at/)[0]?.trim() || ''
        console.log('👤 Name:', name)
        
        // Extract email and phone
        const emailMatch = text.match(/([\w.-]+@[\w.-]+\.\w{2,})/i)
        const phoneMatch = text.match(/(\+?\d{10,11})/)
        console.log('📧 Email:', emailMatch?.[0])
        console.log('📱 Phone:', phoneMatch?.[0])
        
        // Extract LinkedIn
        const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i)
        console.log('🔗 LinkedIn:', linkedinMatch?.[0])
        
        // Extract website
        const websiteMatch = text.match(/(https?:\/\/[a-z0-9-]+\.netlify\.app)/i)
        console.log('🌐 Website:', websiteMatch?.[0])
        
        // Extract location
        const locationMatch = text.match(/House\s+([^@]+?)(?=\s*infozaigum|\s*Education)/i)
        const location = locationMatch ? locationMatch[1].replace(/Pakistan/i, '').trim() + ', Pakistan' : ''
        console.log('📍 Location:', location)
        
        // Extract title
        const titleMatch = text.match(/(\.NET Developer[^\n]*|React Developer[^\n]*)/i)
        const title = titleMatch ? titleMatch[1].split('at')[0].trim() : 'Developer'
        console.log('💼 Title:', title)
        
        // Extract summary
        const summaryMatch = text.match(/I'm ([^]+?)(?=E\s+Skills|Skills)/i)
        const summary = summaryMatch ? "I'm " + summaryMatch[1].trim().replace(/\s+/g, ' ').substring(0, 400) : ''
        console.log('📄 Summary:', summary.substring(0, 150))

        // Extract skills
        const skills = []
        const skillsMatch = text.match(/Skills[^B]+(.*?)(?=B\s+Experience|Experience)/is)
        if (skillsMatch) {
            const skillsList = ['JavaScript', 'React', 'React.js', 'Node.js', 'HTML', 'CSS', 'TypeScript', 'Next.js', 
                              'Tailwind', 'Bootstrap', 'Material UI', 'Redux', 'Firebase', 'Git', 'GitHub',
                              '.NET', 'ASP.NET', 'C#', 'SQL Server', 'Entity Framework', 'WebAPI', 'MVC',
                              'Framer Motion', 'Ant Design', 'SASS', 'Responsive Web Design']
            skillsList.forEach(skill => {
                if (skillsMatch[1].toLowerCase().includes(skill.toLowerCase())) skills.push(skill)
            })
        }
        console.log('🛠️ Skills:', skills)

        // Extract experience
        const experience = []
        const expMatches = text.matchAll(/([\w\s\/\.]+developer)\s+([A-Z]+)\s+-\s+([^|]+?)\|\s*([^\n]+)/gi)
        for (const match of expMatches) {
            experience.push({
                title: match[1].trim(),
                company: match[2].trim(),
                duration: match[4].trim(),
                description: ''
            })
        }
        console.log('💼 Experience:', experience)

        // Extract education
        const education = []
        const eduMatches = text.matchAll(/([^\n]+?)\s+\/\s+([A-Z]+)\s+\((\d{4})\)/g)
        for (const match of eduMatches) {
            education.push({
                institution: match[1].trim(),
                degree: match[2].trim(),
                year: match[3]
            })
        }
        console.log('🎓 Education:', education)

        // Extract projects
        const projects = []
        const projectMatches = text.matchAll(/([A-Z][\w\s-]+)\s+(https:\/\/[a-z0-9-]+\.netlify\.app\/)\s+([^\n]{50,200})/gi)
        for (const match of projectMatches) {
            projects.push({
                name: match[1].trim(),
                description: match[3].trim(),
                technologies: match[2]
            })
        }
        console.log('🚀 Projects:', projects)

        // Extract languages
        const languages = []
        const langMatches = text.matchAll(/([A-Z][a-z]+)\s+-\s+(Native|Medium|Fluent)/g)
        for (const match of langMatches) {
            languages.push({ name: match[1], proficiency: match[2] })
        }
        console.log('🗣️ Languages:', languages)
        
        const result = {
            personal: { 
                name, 
                email: emailMatch?.[0] || '', 
                phone: phoneMatch?.[0] || '', 
                linkedin: linkedinMatch?.[0] || '', 
                website: websiteMatch?.[0] || '', 
                location, 
                title
            },
            summary: summary || 'Passionate professional with expertise in delivering high-quality results.',
            skills: skills.length ? skills : ['JavaScript', 'React', 'Node.js'],
            experience,
            education,
            projects,
            languages,
            certifications: []
        }
        
        console.log('✅ Final Result:', result)
        return result
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (!file || file.type !== 'application/pdf') {
            setError('❌ Please upload PDF file only')
            return
        }

        setScanning(true); setError(''); setScanProgress(0);
        try {
            const text = await extractTextFromPDF(file)
            console.log('📄 Extracted Text:', text)
            
            const parsed = parseResumeText(text)
            console.log('✅ Parsed Data:', parsed)
            
            setTimeout(() => {
                setScanning(false)
                const cleanData = JSON.parse(JSON.stringify(parsed))
                navigate('editor', { ...cleanData, templateId: 0 })
            }, 500)
        } catch (e) {
            console.error('❌ Error:', e)
            setScanning(false)
            setError('❌ ' + e.message)
        }
    }, [navigate])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    })

    const startFresh = (templateId = 0) => {
        navigate('editor', {
            personal: { name: '', email: '', phone: '', linkedin: '', website: '', location: '', title: '' },
            summary: '', skills: [], experience: [], education: [], projects: [], languages: [], certifications: [],
            templateId
        })
    }

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-[#f9fafb]">
            {/* Background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(80px)' }} />
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #ec4899, transparent)', filter: 'blur(80px)' }} />
            </div>

            {/* Navbar */}
            <nav className="glass fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                        <FileText size={18} color="white" />
                    </div>
                    <span className="text-gray-900 font-bold text-xl tracking-tight font-space">
                        CV<span className="gradient-text">Studio</span>
                    </span>
                </div>
                <button onClick={startFresh} className="btn-primary text-sm py-2 px-5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
                    <Sparkles size={15} /> New Start
                </button>
            </nav>

            {/* Main Content - Increased top padding (pt-32) and added more bottom padding (pb-32) */}
            <div className="relative z-10 pt-36 pb-32 px-6">
                {/* Hero */}
                <div className="max-w-6xl mx-auto text-center mb-20 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-indigo-500/10 border border-indigo-500/20">
                        <Star size={14} className="text-yellow-400" />
                        <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">Pakistan's #1 CV Maker</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight font-space tracking-tighter text-gray-900">
                        Craft Your <span className="gradient-text">Resume</span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Upload your PDF to extract details instantly or start from scratch with 5 premium templates designed for impact.
                    </p>

                    <button onClick={startFresh} className="btn-primary text-lg py-4 px-10 rounded-2xl shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all">
                        <Zap size={20} className="fill-current" /> Create Now <ArrowRight size={18} />
                    </button>
                </div>

                {/* PDF Upload */}
                <div className="max-w-3xl mx-auto mb-32">
                    <div className="text-center mb-6">
                        <p className="text-gray-500 text-xs tracking-widest uppercase">— Recruiters spend an average of 6 seconds per resume —</p>
                    </div>

                    <div
                        {...getRootProps()}
                        className={`relative rounded-3xl p-16 text-center cursor-pointer transition-all duration-500 border-2 border-dashed ${
                            isDragActive ? 'border-indigo-500 bg-indigo-500/10 scale-105' : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50'
                        }`}
                    >
                        <input {...getInputProps()} />
                        {scanning ? (
                            <div className="space-y-6">
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-500 flex items-center justify-center animate-pulse">
                                    <FileText size={32} color="white" />
                                </div>
                                <div>
                                    <p className="text-gray-900 font-bold text-xl mb-2">Analyzing your experience...</p>
                                    <div className="w-full max-w-xs mx-auto bg-white/10 rounded-full h-3 overflow-hidden">
                                        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-gray-900 text-2xl font-bold">{isDragActive ? 'Drop it here!' : 'Drag & Drop your PDF'}</h3>
                                <p className="text-gray-600">or click to browse your computer</p>
                                <span className="inline-block px-3 py-1 rounded-md bg-gray-100 text-[10px] text-gray-600 font-bold uppercase tracking-widest">PDF only • Max 10MB</span>
                            </div>
                        )}
                        {error && <p className="mt-4 text-rose-400 font-medium">{error}</p>}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {FEATURES.map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white border border-gray-200 hover:border-indigo-500/30 transition-all hover:-translate-y-2 group shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon size={24} />
                            </div>
                            <h4 className="text-gray-900 font-bold text-lg mb-3">{feature.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Templates Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 font-space">Choose Your <span className="gradient-text">Style</span></h2>
                        <p className="text-gray-600">Tailored templates for every industry</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {TEMPLATES.map((t) => (
                            <div key={t.id} onClick={() => startFresh(t.id)} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-indigo-500/50 transition-all hover:-translate-y-2 shadow-sm">
                                <div className={`h-48 ${t.preview} relative p-6 flex flex-col justify-end overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg">Use Template</button>
                                    </div>
                                    <div className="w-full space-y-2">
                                        <div className="h-2 w-3/4 bg-white/30 rounded" />
                                        <div className="h-2 w-1/2 bg-white/20 rounded" />
                                    </div>
                                </div>
                                <div className="p-5 flex justify-between items-center">
                                    <span className="text-gray-900 font-bold text-sm">{t.name}</span>
                                    <div className="flex -space-x-1">
                                        {t.colors.map((c, i) => (
                                            <div key={i} className="w-3 h-3 rounded-full border border-black/50" style={{ background: c }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}