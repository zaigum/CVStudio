// Template 2: Creative Bloom - Pink/Rose gradient
export default function TemplateCreativeBloom({ data }) {
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
            background: '#fff5f7',
            color: '#2d1b2e',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
            position: 'relative',
        }}>
            {/* Decorative top */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '8px',
                background: 'linear-gradient(90deg, #ec4899, #f43f5e, #fb923c)'
            }} />

            {/* Header - centered elegant */}
            <div style={{ padding: '48px 48px 32px', textAlign: 'center', borderBottom: '1px solid #fce7f3' }}>
                <div style={{
                    width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto 16px',
                    background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <span style={{ color: 'white', fontSize: '28px', fontWeight: 800 }}>
                        {(p.name || 'Y').charAt(0)}
                    </span>
                </div>
                <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1a1a2e', margin: 0, letterSpacing: '-0.5px' }}>
                    {p.name || 'Your Name'}
                </h1>
                <p style={{ color: '#ec4899', fontSize: '14px', fontWeight: 600, margin: '6px 0 16px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {p.title || 'Creative Professional'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    {[
                        p.email && p.email,
                        p.phone && p.phone,
                        p.location && p.location,
                        p.linkedin && p.linkedin,
                    ].filter(Boolean).map((item, i) => (
                        <span key={i} style={{
                            background: '#fce7f3', color: '#be185d', padding: '4px 12px',
                            borderRadius: '20px', fontSize: '11px', fontWeight: 500
                        }}>{item}</span>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                {/* Left main */}
                <div style={{ flex: 1, padding: '28px 24px 40px 48px' }}>
                    {data?.summary && (
                        <BloomSection title="About Me">
                            <p style={{ color: '#4a2040', fontSize: '12px', lineHeight: '1.8' }}>{data.summary}</p>
                        </BloomSection>
                    )}

                    {experience.length > 0 && (
                        <BloomSection title="Experience">
                            {experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '16px', paddingLeft: '16px', borderLeft: '2px solid #fce7f3' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h3 style={{ color: '#1a1a2e', fontWeight: 800, fontSize: '13px', margin: 0 }}>{exp.title}</h3>
                                        <span style={{
                                            background: '#fce7f3', color: '#be185d', padding: '2px 8px',
                                            borderRadius: '10px', fontSize: '10px', whiteSpace: 'nowrap', marginLeft: '8px'
                                        }}>{exp.duration}</span>
                                    </div>
                                    <p style={{ color: '#ec4899', fontWeight: 600, fontSize: '12px', margin: '2px 0 4px' }}>{exp.company}</p>
                                    {exp.description && <p style={{ color: '#6b4f7a', fontSize: '11px', lineHeight: '1.6' }}>{exp.description}</p>}
                                </div>
                            ))}
                        </BloomSection>
                    )}

                    {projects.length > 0 && (
                        <BloomSection title="Projects">
                            {projects.map((proj, i) => (
                                <div key={i} style={{ marginBottom: '14px', paddingLeft: '16px', borderLeft: '2px solid #fce7f3' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '13px', margin: 0 }}>{proj.name}</h3>
                                        <span style={{ color: '#94a3b8', fontSize: '11px' }}>{proj.year}</span>
                                    </div>
                                    {proj.tech && <p style={{ color: '#ec4899', fontSize: '11px', margin: '2px 0', fontWeight: 600 }}>{proj.tech}</p>}
                                    {proj.description && <p style={{ color: '#6b4f7a', fontSize: '11px', lineHeight: '1.6' }}>{proj.description}</p>}
                                </div>
                            ))}
                        </BloomSection>
                    )}
                </div>

                {/* Right sidebar */}
                <div style={{ width: '220px', background: '#fdf2f8', padding: '28px 32px 40px 20px', borderLeft: '1px solid #fce7f3' }}>
                    {skills.length > 0 && (
                        <BloomSection title="Skills" accent="#f43f5e">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'flex-start' }}>
                                {skills.map((skill, i) => (
                                    <span key={i} style={{
                                        background: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,63,94,0.12))',
                                        border: '1px solid rgba(236,72,153,0.3)',
                                        color: '#be185d', 
                                        padding: '5px 10px', 
                                        borderRadius: '15px', 
                                        fontSize: '10px', 
                                        fontWeight: 500,
                                        display: 'inline-block',
                                        lineHeight: '1.2'
                                    }}>{skill}</span>
                                ))}
                            </div>
                        </BloomSection>
                    )}

                    {education.length > 0 && (
                        <BloomSection title="Education" accent="#f43f5e">
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <h3 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '12px', margin: 0 }}>{edu.degree}</h3>
                                    <p style={{ color: '#ec4899', fontSize: '11px', margin: '2px 0' }}>{edu.school}</p>
                                    <p style={{ color: '#94a3b8', fontSize: '10px' }}>{edu.year}{edu.gpa && ` • ${edu.gpa}`}</p>
                                </div>
                            ))}
                        </BloomSection>
                    )}

                    {languages.length > 0 && (
                        <BloomSection title="Languages" accent="#f43f5e">
                            {languages.map((lang, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ color: '#1a1a2e', fontSize: '11px', fontWeight: 600 }}>{lang.name}</span>
                                    <span style={{ color: '#ec4899', fontSize: '10px' }}>{lang.level}</span>
                                </div>
                            ))}
                        </BloomSection>
                    )}

                    {certifications.length > 0 && (
                        <BloomSection title="Certifications" accent="#f43f5e">
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <p style={{ color: '#1a1a2e', fontSize: '11px', fontWeight: 700, margin: 0 }}>{cert.name}</p>
                                    <p style={{ color: '#94a3b8', fontSize: '10px', margin: '1px 0' }}>{cert.issuer} • {cert.date}</p>
                                </div>
                            ))}
                        </BloomSection>
                    )}
                </div>
            </div>
        </div>
    )
}

function BloomSection({ title, children, accent = '#ec4899' }) {
    return (
        <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ color: accent, fontSize: '16px', fontWeight: 900 }}>✦</span>
                <h2 style={{ color: '#1a1a2e', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px', margin: 0, textTransform: 'uppercase' }}>{title}</h2>
            </div>
            {children}
        </div>
    )
}
