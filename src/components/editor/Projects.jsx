import { Award, Plus } from 'lucide-react'
import { Section, Field, ItemCard } from './SharedComponents'

export default function Projects({ cvData, addItem, removeItem, updateItem }) {
    return (
        <Section title="Projects" icon={Award}>
            {(cvData.projects || []).map((proj, i) => (
                <ItemCard key={i} index={i} onDelete={() => removeItem('projects', i)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Project Name" value={proj.name || ''} onChange={v => updateItem('projects', i, 'name', v)} placeholder="E-Commerce Website" />
                        <Field label="Tech Stack" value={proj.tech || ''} onChange={v => updateItem('projects', i, 'tech', v)} placeholder="React, Node.js, MongoDB" />
                        <Field label="Link" value={proj.link || ''} onChange={v => updateItem('projects', i, 'link', v)} placeholder="github.com/username/project" />
                        <Field label="Year" value={proj.year || ''} onChange={v => updateItem('projects', i, 'year', v)} placeholder="2024" />
                    </div>
                    <textarea
                        className="input-field resize-none mt-3"
                        rows={2}
                        value={proj.description || ''}
                        onChange={e => updateItem('projects', i, 'description', e.target.value)}
                        placeholder="Project description..."
                    />
                </ItemCard>
            ))}
            <button className="btn-secondary w-full mt-3" onClick={() => addItem('projects', { name: '', tech: '', description: '', link: '', year: '' })}>
                <Plus size={16} /> Add Project
            </button>
        </Section>
    )
}
