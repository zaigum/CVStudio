import { X } from 'lucide-react'

const TEMPLATES = [
    { id: 0, name: 'Midnight Pro', preview: 'from-indigo-600 to-purple-600' },
    { id: 1, name: 'Executive', preview: 'from-slate-700 to-slate-900' },
    { id: 2, name: 'Creative Bloom', preview: 'from-pink-500 to-rose-600' },
    { id: 3, name: 'Ocean Breeze', preview: 'from-sky-500 to-cyan-600' },
    { id: 4, name: 'Forest Mint', preview: 'from-emerald-500 to-green-600' },
    { id: 5, name: 'Simple Clean', preview: 'from-gray-800 to-gray-900' },
]

export default function TemplateComparison({ onClose, onSelect, TemplateComponents, cvData }) {
    if (!TemplateComponents || TemplateComponents.length === 0) return null
    
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto">
            <div className="glass rounded-2xl p-6 max-w-7xl w-full max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Compare Templates</h2>
                    <button onClick={onClose} className="btn-secondary p-2">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TEMPLATES.map((t) => {
                        const Component = TemplateComponents[t.id]
                        if (!Component) return null
                        return (
                            <div key={t.id} className="glass rounded-xl overflow-hidden">
                                <div className={`h-8 bg-gradient-to-r ${t.preview} flex items-center justify-center`}>
                                    <span className="text-white text-sm font-bold">{t.name}</span>
                                </div>
                                <div className="p-4 bg-white" style={{ transform: 'scale(0.3)', transformOrigin: 'top left', height: '400px', width: '333%' }}>
                                    <Component data={cvData} />
                                </div>
                                <button
                                    onClick={() => { onSelect(t.id); onClose() }}
                                    className="w-full btn-primary py-3 rounded-none"
                                >
                                    Use This Template
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
