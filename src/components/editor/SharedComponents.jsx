import { Trash2 } from 'lucide-react'

export function Section({ title, icon: Icon, children }) {
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

export function Field({ label, value, onChange, placeholder, type = 'text', className = '' }) {
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

export function ItemCard({ children, index, onDelete }) {
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
