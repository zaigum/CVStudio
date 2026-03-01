import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'

export default function Toast({ type = 'info', message, onClose }) {
    const icons = {
        success: <CheckCircle size={18} />,
        error: <XCircle size={18} />,
        info: <Info size={18} />,
        warning: <AlertTriangle size={18} />
    }

    const styles = {
        success: 'bg-green-900/30 border-green-500/30 text-green-400',
        error: 'bg-red-900/30 border-red-500/30 text-red-400',
        info: 'bg-blue-900/30 border-blue-500/30 text-blue-400',
        warning: 'bg-yellow-900/30 border-yellow-500/30 text-yellow-400'
    }

    return (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-lg animate-slide-left ${styles[type]}`}>
            {icons[type]}
            <span className="text-sm font-medium">{message}</span>
            {onClose && (
                <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                    <XCircle size={16} />
                </button>
            )}
        </div>
    )
}
