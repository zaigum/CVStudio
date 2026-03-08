import { User } from 'lucide-react'
import { Section, Field } from './SharedComponents'

export default function PersonalInfo({ cvData, update }) {
    if (!cvData) return null
    
    return (
        <Section title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name" value={cvData.personal?.name || ''} onChange={v => update('personal.name', v)} placeholder="e.g. Ahmed Ali" />
                <Field label="Professional Title" value={cvData.personal?.title || ''} onChange={v => update('personal.title', v)} placeholder="e.g. Software Engineer" />
                <Field label="Email" value={cvData.personal?.email || ''} onChange={v => update('personal.email', v)} placeholder="ahmed@email.com" type="email" />
                <Field label="Phone" value={cvData.personal?.phone || ''} onChange={v => update('personal.phone', v)} placeholder="+92 300 1234567" />
                <Field label="Location" value={cvData.personal?.location || ''} onChange={v => update('personal.location', v)} placeholder="Lahore, Pakistan" />
                <Field label="LinkedIn" value={cvData.personal?.linkedin || ''} onChange={v => update('personal.linkedin', v)} placeholder="linkedin.com/in/ahmed" />
                <Field label="Website / Portfolio" value={cvData.personal?.website || ''} onChange={v => update('personal.website', v)} placeholder="ahmed.dev" className="md:col-span-2" />
            </div>
        </Section>
    )
}
