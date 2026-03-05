// Template 5: Simple Clean (Minimal Black & White)
export default function TemplateSimpleClean({ data }) {
    const p = data?.personal || {}
    const skills = data?.skills || []
    const experience = data?.experience || []
    const education = data?.education || []
    const projects = data?.projects || []
    const certifications = data?.certifications || []
    const languages = data?.languages || []
    const customSections = data?.customSections || []

    return (
        <div id="cv-preview" style={{
            fontFamily: 'Inter, sans-serif',
            background: '#ffffff',
            color: '#000000',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
            padding: '40px 50px'
        }}>

            {/* Header */}
            <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
                    {p.name || 'Your Name'}
                </h1>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0', fontWeight: 500 }}>
                    {p.title || 'Professional Title'}
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '11px', color: '#666' }}>
                    {p.email && <span>{p.email}</span>}
                    {p.phone && <span>{p.phone}</span>}
                    {p.location && <span>{p.location}</span>}
                    {p.linkedin && <span>{p.linkedin}</span>}
                </div>
            </div>

            {/* Summary */}
            {data?.summary && (
                <Section title="Summary">
                    <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#333', margin: 0, letterSpacing: '0.3px', whiteSpace: 'normal', wordBreak: 'normal' }}>{data.summary}</p>
                </Section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <Section title="Experience">
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, letterSpacing: '0.3px' }}>{exp.title}</h3>
                                <span style={{ fontSize: '11px', color: '#666' }}>{exp.duration}</span>
                            </div>
                            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0', letterSpacing: '0.3px' }}>{exp.company}</p>
                            {exp.location && <p style={{ fontSize: '11px', color: '#999', margin: '2px 0' }}>{exp.location}</p>}
                            {exp.description && (
                                <p style={{ fontSize: '11px', lineHeight: '1.7', color: '#444', margin: '8px 0 0', whiteSpace: 'normal', letterSpacing: '0.3px' }}>
                                    {exp.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <Section title="Education">
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>{edu.degree}</h3>
                                <span style={{ fontSize: '11px', color: '#666' }}>{edu.year}</span>
                            </div>
                            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0' }}>{edu.school}</p>
                            {edu.gpa && <p style={{ fontSize: '11px', color: '#666', margin: '4px 0' }}>GPA: {edu.gpa}</p>}
                        </div>
                    ))}
                </Section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <Section title="Skills">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'flex-start' }}>
                        {skills.map((skill, i) => (
                            <span key={i} style={{
                                padding: '6px 10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '11px',
                                color: '#333',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                lineHeight: 1,
                                minHeight: '24px',
                                boxSizing: 'border-box'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <Section title="Projects">
                    {projects.map((proj, i) => (
                        <div key={i} style={{ marginBottom: '14px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 600, margin: 0, letterSpacing: '0.3px' }}>{proj.name}</h3>
                            {proj.tech && <p style={{ fontSize: '11px', color: '#666', margin: '4px 0' }}>{proj.tech}</p>}
                            {proj.link && <p style={{ fontSize: '10px', color: '#0ea5e9', margin: '2px 0', wordBreak: 'break-all' }}>{proj.link}</p>}
                            {proj.description && (
                                <p style={{ fontSize: '11px', lineHeight: '1.7', color: '#444', margin: '6px 0 0', letterSpacing: '0.3px', whiteSpace: 'normal' }}>
                                    {proj.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <Section title="Certifications">
                    {certifications.map((cert, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>{cert.name}</h3>
                            <p style={{ fontSize: '11px', color: '#666', margin: '4px 0' }}>
                                {cert.issuer} • {cert.date}
                            </p>
                        </div>
                    ))}
                </Section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
                <Section title="Languages">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {languages.map((lang, i) => (
                            <div key={i} style={{ fontSize: '12px' }}>
                                <span style={{ fontWeight: 600 }}>{lang.name}</span>
                                <span style={{ color: '#666', marginLeft: '6px' }}>- {lang.level}</span>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Custom Sections */}
            {customSections.map((section) => (
                section.title && section.items.length > 0 && (
                    <Section key={section.id} title={section.title}>
                        {section.items.map((item, i) => (
                            <div key={item.id} style={{ marginBottom: '14px' }}>
                                {item.title && <h3 style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>{item.title}</h3>}
                                {item.description && (
                                    <p style={{ fontSize: '11px', lineHeight: '1.7', color: '#444', margin: '6px 0 0', whiteSpace: 'pre-wrap' }}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </Section>
                )
            ))}
        </div>
    )
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 12px',
                paddingBottom: '6px',
                lineHeight: 1,
                borderBottom: '1px solid #ddd'
            }}>
                {title}
            </h2>
            {children}
        </div>
    )
}
