import { useState } from 'react'
import { Code, Plus, Trash2 } from 'lucide-react'
import { Section } from './SharedComponents'

export default function Skills({ cvData, setCvData }) {
    const [newSkill, setNewSkill] = useState('')

    const addSkill = () => {
        if (newSkill.trim()) {
            setCvData(prev => ({ ...prev, skills: [...(prev.skills || []), newSkill.trim()] }))
            setNewSkill('')
        }
    }

    const removeSkill = (idx) => {
        setCvData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }))
    }

    return (
        <Section title="Skills" icon={Code}>
            <div className="flex gap-2 mb-4">
                <input
                    className="input-field"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                    placeholder="Type skill (e.g. React, Python...)"
                />
                <button className="btn-primary px-4" onClick={addSkill}>
                    <Plus size={16} />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {(cvData.skills || []).map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
                        {skill}
                        <button onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={13} />
                        </button>
                    </div>
                ))}
            </div>
            {(cvData.skills || []).length === 0 && (
                <p className="text-gray-500 text-sm text-center py-8">No skills added. Add above.</p>
            )}
        </Section>
    )
}
