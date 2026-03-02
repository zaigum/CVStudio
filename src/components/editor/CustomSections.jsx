import { FileText, Plus, Trash2 } from 'lucide-react'
import { Section, Field, ItemCard } from './SharedComponents'

export default function CustomSections({ cvData, setCvData }) {
    const customSections = cvData?.customSections || []

    const addSection = () => {
        setCvData(prev => ({
            ...prev,
            customSections: [...(prev.customSections || []), {
                id: Date.now(),
                title: '',
                items: []
            }]
        }))
    }

    const removeSection = (sectionId) => {
        setCvData(prev => ({
            ...prev,
            customSections: prev.customSections.filter(s => s.id !== sectionId)
        }))
    }

    const updateSectionTitle = (sectionId, title) => {
        setCvData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId ? { ...s, title } : s
            )
        }))
    }

    const addItem = (sectionId) => {
        setCvData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: [...s.items, { id: Date.now(), title: '', description: '' }]
                } : s
            )
        }))
    }

    const removeItem = (sectionId, itemId) => {
        setCvData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.filter(i => i.id !== itemId)
                } : s
            )
        }))
    }

    const updateItem = (sectionId, itemId, field, value) => {
        setCvData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId ? {
                    ...s,
                    items: s.items.map(i =>
                        i.id === itemId ? { ...i, [field]: value } : i
                    )
                } : s
            )
        }))
    }

    return (
        <Section title="Custom Sections" icon={FileText}>
            {customSections.map((section) => (
                <div key={section.id} className="mb-6 p-4 rounded-xl bg-white" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <input
                            className="input-field flex-1 font-semibold"
                            value={section.title}
                            onChange={e => updateSectionTitle(section.id, e.target.value)}
                            placeholder="Section Title (e.g. Achievements, Hobbies)"
                        />
                        <button
                            onClick={() => removeSection(section.id)}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    {section.items.map((item) => (
                        <ItemCard key={item.id} onDelete={() => removeItem(section.id, item.id)}>
                            <Field
                                label="Title"
                                value={item.title}
                                onChange={v => updateItem(section.id, item.id, 'title', v)}
                                placeholder="Item title"
                            />
                            <label className="text-gray-600 text-xs mt-3 mb-1 block">Description</label>
                            <textarea
                                className="input-field resize-none mt-1"
                                rows={3}
                                value={item.description || ''}
                                onChange={e => updateItem(section.id, item.id, 'description', e.target.value)}
                                placeholder="Description..."
                            />
                        </ItemCard>
                    ))}

                    <button
                        className="btn-secondary w-full mt-2 text-sm"
                        onClick={() => addItem(section.id)}
                    >
                        <Plus size={14} /> Add Item
                    </button>
                </div>
            ))}

            <button className="btn-primary w-full mt-3" onClick={addSection}>
                <Plus size={16} /> Add New Section
            </button>

            {customSections.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-8">
                    No custom sections. Add your own sections like Achievements, Hobbies, etc.
                </p>
            )}
        </Section>
    )
}
