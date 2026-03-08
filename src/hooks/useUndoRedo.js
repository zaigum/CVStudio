import { useState, useCallback } from 'react'

export default function useUndoRedo(initialState) {
    const [history, setHistory] = useState([initialState])
    const [currentIndex, setCurrentIndex] = useState(0)

    const setState = useCallback((newState) => {
        setHistory(prev => [...prev.slice(0, currentIndex + 1), newState])
        setCurrentIndex(prev => prev + 1)
    }, [currentIndex])

    const undo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }, [currentIndex])

    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }, [currentIndex, history.length])

    return {
        state: history[currentIndex],
        setState,
        undo,
        redo,
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1
    }
}
