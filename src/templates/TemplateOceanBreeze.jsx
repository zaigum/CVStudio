// Template 3: Ocean Breeze - Sky/Cyan theme
export default function TemplateOceanBreeze({ data }) {
    const p = data?.personal || {}
    const skills = data?.skills || []
    const experience = data?.experience || []
    const education = data?.education || []
    const projects = data?.projects || []
    const certifications = data?.certifications || []
    const languages = data?.languages || []

    return (
        <div id="cv-preview" style={{
            fontFamily: 'Inter, sans-serif',
            background: '#f0f9ff',
            color: '#0c1b33',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
        }}>
            {/* Left accent column header */}
            <div style={{ display: 'flex', height: '100%' }}>
                {/* Thin left accent */}
                <div style={{ width: '8px', background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)', flexShrink: 0 }} />

                <div style={{ flex: 1 }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0369a1, #0e7490)',
                        padding: '40px 48px 32px',
                        color: 'white'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <h1 style={{ fontSize: '34px', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
                                    {p.name || 'Your Name'}
                                </h1>
                                <p style={{ color: '#bae6fd', fontSize: '14px', fontWeight: 500, margin: '6px 0 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                    {p.title || 'Professional Title'}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '11px', color: '#7dd3fc', lineHeight: '2' }}>
                                {p.email && <div>{p.email}</div>}
                                {p.phone && <div>{p.phone}</div>}
                                {p.location && <div>{p.location}</div>}
                            </div>
                        </div>
                        {p.linkedin || p.website ? (
                            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                                {p.linkedin && <span style={{ color: '#bae6fd', fontSize: '11px' }}>🔗 {p.linkedin}</span>}
                                {p.website && <span style={{ color: '#bae6fd', fontSize: '11px' }}>🌐 {p.website}</span>}
                            </div>
                        ) : null}
                    </div>

                    {/* Body */}
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1, padding: '28px 32px 40px' }}>
                            {data?.summary && (
                                <OceanSection title="Summary">
                                    <p style={{ color: '#334155', fontSize: '12px', lineHeight: '1.8' }}>{data.summary}</p>
                                </OceanSection>
                            )}

                            {experience.length > 0 && (
                                <OceanSection title="Work Experience">
                                    {experience.map((exp, i) => (
                                        <div key={i} style={{ marginBottom: '18px', position: 'relative', paddingLeft: '20px' }}>
                                            <div style={{
                                                position: 'absolute', left: 0, top: '4px',
                                                width: '8px', height: '8px', borderRadius: '50%',
                                                background: '#0ea5e9', border: '2px solid #bae6fd'
                                            }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h3 style={{ color: '#0c1b33', fontWeight: 800, fontSize: '13px', margin: 0 }}>{exp.title}</h3>
                                                <span style={{ color: '#0ea5e9', fontSize: '11px', fontWeight: 600 }}>{exp.duration}</span>
                                            </div>
                                            <p style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '12px', margin: '2px 0 6px' }}>{exp.company}</p>
                                            {exp.description && <p style={{ color: '#475569', fontSize: '11px', lineHeight: '1.6' }}>{exp.description}</p>}
                                        </div>
                                    ))}
                                </OceanSection>
                            )}

                            {projects.length > 0 && (
                                <OceanSection title="Projects">
                                    {projects.map((proj, i) => (
                                        <div key={i} style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: 0, top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h3 style={{ color: '#0c1b33', fontWeight: 700, fontSize: '12px', margin: 0 }}>{proj.name}</h3>
                                                <span style={{ color: '#94a3b8', fontSize: '10px' }}>{proj.year}</span>
                                            </div>
                                            {proj.tech && <p style={{ color: '#0ea5e9', fontSize: '11px', margin: '2px 0', fontWeight: 600 }}>{proj.tech}</p>}
                                            {proj.description && <p style={{ color: '#475569', fontSize: '11px' }}>{proj.description}</p>}
                                        </div>
                                    ))}
                                </OceanSection>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div style={{ width: '210px', background: '#e0f2fe', padding: '28px 24px', borderLeft: '1px solid #bae6fd' }}>
                            {skills.length > 0 && (
                                <OceanSection title="Skills" sidebar>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'flex-start' }}>
                                        {skills.map((skill, i) => (
                                            <span key={i} style={{
                                                background: '#0ea5e9', 
                                                color: 'white',
                                                padding: '5px 10px', 
                                                borderRadius: '12px', 
                                                fontSize: '10px', 
                                                fontWeight: 600,
                                                display: 'inline-block',
                                                lineHeight: '1.2'
                                            }}>{skill}</span>
                                        ))}
                                    </div>
                                </OceanSection>
                            )}

                            {education.length > 0 && (
                                <OceanSection title="Education" sidebar>
                                    {education.map((edu, i) => (
                                        <div key={i} style={{ marginBottom: '14px' }}>
                                            <h3 style={{ color: '#0c1b33', fontWeight: 700, fontSize: '12px', margin: 0 }}>{edu.degree}</h3>
                                            <p style={{ color: '#0369a1', fontSize: '11px', margin: '2px 0' }}>{edu.school}</p>
                                            <p style={{ color: '#64748b', fontSize: '10px' }}>{edu.year}{edu.gpa && ` | ${edu.gpa}`}</p>
                                        </div>
                                    ))}
                                </OceanSection>
                            )}

                            {languages.length > 0 && (
                                <OceanSection title="Languages" sidebar>
                                    {languages.map((lang, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span style={{ color: '#0c1b33', fontSize: '11px', fontWeight: 600 }}>{lang.name}</span>
                                            <span style={{ color: '#0369a1', fontSize: '10px' }}>{lang.level}</span>
                                        </div>
                                    ))}
                                </OceanSection>
                            )}

                            {certifications.length > 0 && (
                                <OceanSection title="Certifications" sidebar>
                                    {certifications.map((cert, i) => (
                                        <div key={i} style={{ marginBottom: '10px' }}>
                                            <p style={{ color: '#0c1b33', fontSize: '11px', fontWeight: 700, margin: 0 }}>{cert.name}</p>
                                            <p style={{ color: '#64748b', fontSize: '10px' }}>{cert.issuer} • {cert.date}</p>
                                        </div>
                                    ))}
                                </OceanSection>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function OceanSection({ title, children, sidebar }) {
    return (
        <div style={{ marginBottom: '22px' }}>
            <div style={{ marginBottom: '10px' }}>
                <h2 style={{
                    color: '#0369a1', fontSize: sidebar ? '10px' : '11px', fontWeight: 900,
                    letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase',
                    paddingBottom: '6px', borderBottom: sidebar ? 'none' : '2px solid #bae6fd'
                }}>{title}</h2>
            </div>
            {children}
        </div>
    )
}
