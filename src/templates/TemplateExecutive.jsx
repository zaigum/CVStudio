// Template 1: Executive - Clean white/slate professional
export default function TemplateExecutive({ data }) {
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
            background: '#ffffff',
            color: '#1e293b',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
        }}>
            {/* Header */}
            <div style={{ background: '#0f172a', padding: '40px 48px 32px', position: 'relative' }}>
                <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '20px' }}>
                    <h1 style={{ fontSize: '34px', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
                        {p.name || 'Your Name'}
                    </h1>
                    <p style={{ color: '#93c5fd', fontSize: '15px', fontWeight: 500, margin: '6px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {p.title || 'Professional Title'}
                    </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
                    {[
                        p.email && `✉ ${p.email}`,
                        p.phone && `✆ ${p.phone}`,
                        p.location && `⌖ ${p.location}`,
                        p.linkedin && `in ${p.linkedin}`,
                        p.website && `⬡ ${p.website}`,
                    ].filter(Boolean).map((item, i) => (
                        <span key={i} style={{ color: '#94a3b8', fontSize: '11px' }}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Body */}
            <div style={{ display: 'flex' }}>
                {/* Main */}
                <div style={{ flex: 1, padding: '32px 32px 40px 48px' }}>
                    {data?.summary && (
                        <ExecSection title="PROFESSIONAL SUMMARY">
                            <p style={{ color: '#475569', fontSize: '12px', lineHeight: '1.8', margin: 0 }}>{data.summary}</p>
                        </ExecSection>
                    )}

                    {experience.length > 0 && (
                        <ExecSection title="EXPERIENCE">
                            {experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '18px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3 style={{ color: '#0f172a', fontWeight: 800, fontSize: '13px', margin: 0 }}>{exp.title}</h3>
                                        <span style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 600 }}>{exp.duration}</span>
                                    </div>
                                    <p style={{ color: '#3b82f6', fontSize: '12px', margin: '2px 0 6px', fontWeight: 600 }}>{exp.company}</p>
                                    {exp.description && <p style={{ color: '#64748b', fontSize: '11px', lineHeight: '1.7' }}>{exp.description}</p>}
                                </div>
                            ))}
                        </ExecSection>
                    )}

                    {projects.length > 0 && (
                        <ExecSection title="PROJECTS">
                            {projects.map((proj, i) => (
                                <div key={i} style={{ marginBottom: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '12px', margin: 0 }}>{proj.name}</h3>
                                        <span style={{ color: '#64748b', fontSize: '11px' }}>{proj.year}</span>
                                    </div>
                                    {proj.tech && <p style={{ color: '#3b82f6', fontSize: '11px', margin: '2px 0' }}>{proj.tech}</p>}
                                    {proj.description && <p style={{ color: '#64748b', fontSize: '11px' }}>{proj.description}</p>}
                                </div>
                            ))}
                        </ExecSection>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ width: '220px', background: '#f8fafc', padding: '32px 24px', borderLeft: '1px solid #e2e8f0' }}>
                    {skills.length > 0 && (
                        <ExecSection title="SKILLS" sidebar>
                            {skills.map((skill, i) => (
                                <div key={i} style={{ marginBottom: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                        <span style={{ color: '#1e293b', fontSize: '11px' }}>{skill}</span>
                                    </div>
                                    <div style={{ height: '3px', background: '#e2e8f0', borderRadius: '2px' }}>
                                        <div style={{ height: '3px', background: '#3b82f6', borderRadius: '2px', width: `${Math.random() * 30 + 70}%` }} />
                                    </div>
                                </div>
                            ))}
                        </ExecSection>
                    )}

                    {education.length > 0 && (
                        <ExecSection title="EDUCATION" sidebar>
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '14px' }}>
                                    <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '11px', margin: 0 }}>{edu.degree}</h3>
                                    <p style={{ color: '#3b82f6', fontSize: '11px', margin: '2px 0' }}>{edu.school}</p>
                                    <p style={{ color: '#94a3b8', fontSize: '10px' }}>{edu.year}</p>
                                </div>
                            ))}
                        </ExecSection>
                    )}

                    {certifications.length > 0 && (
                        <ExecSection title="CERTIFICATIONS" sidebar>
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <p style={{ color: '#0f172a', fontSize: '11px', fontWeight: 600, margin: 0 }}>{cert.name}</p>
                                    <p style={{ color: '#94a3b8', fontSize: '10px' }}>{cert.issuer}</p>
                                </div>
                            ))}
                        </ExecSection>
                    )}

                    {languages.length > 0 && (
                        <ExecSection title="LANGUAGES" sidebar>
                            {languages.map((lang, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ color: '#1e293b', fontSize: '11px' }}>{lang.name}</span>
                                    <span style={{ color: '#3b82f6', fontSize: '10px' }}>{lang.level}</span>
                                </div>
                            ))}
                        </ExecSection>
                    )}
                </div>
            </div>
        </div>
    )
}

function ExecSection({ title, children, sidebar }) {
    return (
        <div style={{ marginBottom: sidebar ? '20px' : '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <h2 style={{
                    color: '#0f172a', fontSize: '9px', fontWeight: 900,
                    letterSpacing: '2px', margin: 0, textTransform: 'uppercase'
                }}>{title}</h2>
                {!sidebar && <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />}
            </div>
            {children}
        </div>
    )
}
