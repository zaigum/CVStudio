import { useState, useEffect } from 'react'
import { Clock, Download, Trash2 } from 'lucide-react'

export default function VersionHistory({ cvData, onRestore }) {
    const [versions, setVersions] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('cvVersions')
        if (saved) {
            setVersions(JSON.parse(saved))
        }
    }, [])

    const saveVersion = () => {
        const newVersion = {
            id: Date.now(),
            data: cvData,
            timestamp: new Date().toISOString(),
            name: cvData?.personal?.name || 'Untitled'
        }
        const updated = [newVersion, ...versions].slice(0, 10)
        setVersions(updated)
        localStorage.setItem('cvVersions', JSON.stringify(updated))
    }

    const deleteVersion = (id) => {
        const updated = versions.filter(v => v.id !== id)
        setVersions(updated)
        localStorage.setItem('cvVersions', JSON.stringify(updated))
    }

    return (
        <div className="glass rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <Clock size={16} /> Version History
                </h3>
                <button onClick={saveVersion} className="btn-primary text-xs py-1 px-3">
                    Save Version
                </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-auto">
                {versions.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10">
                        <div className="flex-1">
                            <p className="text-xs font-medium">{v.name}</p>
                            <p className="text-[10px] text-gray-500">{new Date(v.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => onRestore(v.data)} className="p-1 hover:bg-white/10 rounded">
                                <Download size={12} />
                            </button>
                            <button onClick={() => deleteVersion(v.id)} className="p-1 hover:bg-white/10 rounded text-red-400">
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                ))}
                {versions.length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-4">No saved versions</p>
                )}
            </div>
        </div>
    )
}
