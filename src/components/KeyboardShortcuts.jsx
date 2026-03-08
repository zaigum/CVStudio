import { useEffect } from 'react'

export default function KeyboardShortcuts({ onSave, onPreview, onUndo, onRedo, canUndo, canRedo }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl/Cmd + S: Save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
                onSave?.()
            }
            
            // Ctrl/Cmd + P: Preview
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault()
                onPreview?.()
            }
            
            // Ctrl/Cmd + Z: Undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
                e.preventDefault()
                onUndo?.()
            }
            
            // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
            if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || 
                ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
                if (canRedo) {
                    e.preventDefault()
                    onRedo?.()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onSave, onPreview, onUndo, onRedo, canUndo, canRedo])

    return null
}
