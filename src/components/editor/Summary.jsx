import { User } from 'lucide-react'
import { Section } from './SharedComponents'

export default function Summary({ cvData, update }) {
    return (
        <Section title="Professional Summary" icon={User}>
            <label className="text-gray-600 text-xs mb-2 block">Describe yourself in 2-3 lines</label>
            <textarea
                className="input-field resize-none"
                rows={5}
                value={cvData.summary || ''}
                onChange={e => update('summary', e.target.value)}
                placeholder="Passionate software engineer with 3+ years of experience in building scalable web applications..."
            />
        </Section>
    )
}
