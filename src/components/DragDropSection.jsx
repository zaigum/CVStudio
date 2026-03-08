import { useState } from 'react'
import { GripVertical } from 'lucide-react'

export default function DragDropSection({ sections, onReorder, activeSection, setActiveSection }) {
    const [draggedIndex, setDraggedIndex] = useState(null)

    const handleDragStart = (e, index) => {
        setDraggedIndex(index)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e, index) => {
        e.preventDefault()
        if (draggedIndex === null || draggedIndex === index) return

        const newSections = [...sections]
        const draggedItem = newSections[draggedIndex]
        newSections.splice(draggedIndex, 1)
        newSections.splice(index, 0, draggedItem)
        
        onReorder(newSections)
        setDraggedIndex(index)
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
    }

    return (
        <div className="space-y-1">
            {sections.map((sec, index) => (
                <div
                    key={sec.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-2 px-2 md:px-3 py-2 md:py-3 rounded-lg md:rounded-xl transition-all cursor-move ${
                        activeSection === sec.id
                            ? 'text-indigo-600 bg-indigo-50 border border-indigo-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    } ${draggedIndex === index ? 'opacity-50' : ''}`}
                    onClick={() => setActiveSection(sec.id)}
                >
                    <GripVertical size={14} className="text-gray-400" />
                    <sec.icon size={16} className="md:w-[17px] md:h-[17px]" />
                    <span className="text-xs md:text-sm font-medium hidden lg:block">{sec.label}</span>
                </div>
            ))}
        </div>
    )
}
