import { GraduationCap, Plus } from 'lucide-react'
import { Section, Field, ItemCard } from './SharedComponents'

export default function Education({ cvData, addItem, removeItem, updateItem }) {
    return (
        <Section title="Education" icon={GraduationCap}>
            {(cvData.education || []).map((edu, i) => (
                <ItemCard key={i} index={i} onDelete={() => removeItem('education', i)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Degree" value={edu.degree} onChange={v => updateItem('education', i, 'degree', v)} placeholder="Bachelor of Computer Science" />
                        <Field label="Institution" value={edu.school} onChange={v => updateItem('education', i, 'school', v)} placeholder="LUMS / FAST / NUST" />
                        <Field label="Year" value={edu.year} onChange={v => updateItem('education', i, 'year', v)} placeholder="2020 - 2024" />
                        <Field label="GPA / Grade" value={edu.gpa || ''} onChange={v => updateItem('education', i, 'gpa', v)} placeholder="3.8 / 4.0" />
                    </div>
                </ItemCard>
            ))}
            <button className="btn-secondary w-full mt-3" onClick={() => addItem('education', { degree: '', school: '', year: '', gpa: '' })}>
                <Plus size={16} /> Add Education
            </button>
        </Section>
    )
}
