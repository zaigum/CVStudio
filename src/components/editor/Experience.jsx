import { Briefcase, Plus } from 'lucide-react'
import { Section, Field, ItemCard } from './SharedComponents'

export default function Experience({ cvData, addItem, removeItem, updateItem }) {
    return (
        <Section title="Work Experience" icon={Briefcase}>
            {(cvData.experience || []).map((exp, i) => (
                <ItemCard key={i} index={i} onDelete={() => removeItem('experience', i)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Job Title" value={exp.title} onChange={v => updateItem('experience', i, 'title', v)} placeholder="Software Engineer" />
                        <Field label="Company" value={exp.company} onChange={v => updateItem('experience', i, 'company', v)} placeholder="Company Name" />
                        <Field label="Duration" value={exp.duration} onChange={v => updateItem('experience', i, 'duration', v)} placeholder="Jan 2022 - Present" />
                        <Field label="Location" value={exp.location || ''} onChange={v => updateItem('experience', i, 'location', v)} placeholder="Lahore, Pakistan" />
                    </div>
                    <label className="text-gray-600 text-xs mt-3 mb-1 block">Description (bullet points, separate with Enter)</label>
                    <textarea
                        className="input-field resize-none mt-1"
                        rows={3}
                        value={exp.description || ''}
                        onChange={e => updateItem('experience', i, 'description', e.target.value)}
                        placeholder="• Developed React applications...&#10;• Led a team of 5 developers..."
                    />
                </ItemCard>
            ))}
            <button className="btn-secondary w-full mt-3" onClick={() => addItem('experience', { title: '', company: '', duration: '', location: '', description: '' })}>
                <Plus size={16} /> Add Experience
            </button>
        </Section>
    )
}
