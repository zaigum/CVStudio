import { Globe, Plus } from 'lucide-react'
import { Section, Field, ItemCard } from './SharedComponents'

export default function Languages({ cvData, addItem, removeItem, updateItem }) {
    return (
        <Section title="Languages" icon={Globe}>
            {(cvData.languages || []).map((lang, i) => (
                <ItemCard key={i} index={i} onDelete={() => removeItem('languages', i)}>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Language" value={lang.name || ''} onChange={v => updateItem('languages', i, 'name', v)} placeholder="English" />
                        <div>
                            <label className="text-slate-400 text-xs mb-1 block">Proficiency</label>
                            <select
                                className="input-field"
                                value={lang.level || 'Intermediate'}
                                onChange={e => updateItem('languages', i, 'level', e.target.value)}
                            >
                                <option>Native</option>
                                <option>Fluent</option>
                                <option>Advanced</option>
                                <option>Intermediate</option>
                                <option>Basic</option>
                            </select>
                        </div>
                    </div>
                </ItemCard>
            ))}
            <button className="btn-secondary w-full mt-3" onClick={() => addItem('languages', { name: '', level: 'Intermediate' })}>
                <Plus size={16} /> Add Language
            </button>
        </Section>
    )
}
