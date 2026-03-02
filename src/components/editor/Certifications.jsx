import { Award, Plus } from 'lucide-react'
import { Section, Field, ItemCard } from './SharedComponents'

export default function Certifications({ cvData, addItem, removeItem, updateItem }) {
    return (
        <Section title="Certifications" icon={Award}>
            {(cvData.certifications || []).map((cert, i) => (
                <ItemCard key={i} index={i} onDelete={() => removeItem('certifications', i)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Certificate Name" value={cert.name || ''} onChange={v => updateItem('certifications', i, 'name', v)} placeholder="AWS Solutions Architect" />
                        <Field label="Issuer" value={cert.issuer || ''} onChange={v => updateItem('certifications', i, 'issuer', v)} placeholder="Amazon Web Services" />
                        <Field label="Date" value={cert.date || ''} onChange={v => updateItem('certifications', i, 'date', v)} placeholder="2024" />
                        <Field label="Credential ID" value={cert.id || ''} onChange={v => updateItem('certifications', i, 'id', v)} placeholder="ABC123" />
                    </div>
                </ItemCard>
            ))}
            <button className="btn-secondary w-full mt-3" onClick={() => addItem('certifications', { name: '', issuer: '', date: '', id: '' })}>
                <Plus size={16} /> Add Certification
            </button>
        </Section>
    )
}
