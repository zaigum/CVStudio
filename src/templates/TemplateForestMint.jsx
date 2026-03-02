// Template 4: Forest Mint - Emerald/Green theme
export default function TemplateForestMint({ data }) {
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
            color: '#1a2e1a',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
            display: 'flex',
        }}>
            {/* Left full sidebar */}
            <div style={{
                width: '220px',
                background: 'linear-gradient(180deg, #064e3b, #065f46)',
                padding: '40px 24px',
                flexShrink: 0,
                color: 'white'
            }}>
                {/* Avatar */}
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '3px solid rgba(255,255,255,0.2)'
                }}>
                    <span style={{ color: '#065f46', fontSize: '32px', fontWeight: 900 }}>
                        {(p.name || 'Y').charAt(0)}
                    </span>
                </div>

                <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
                    {p.name || 'Your Name'}
                </h1>
                <p style={{ color: '#6ee7b7', fontSize: '11px', textAlign: 'center', margin: '6px 0 24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {p.title || 'Professional'}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '20px', marginBottom: '20px' }}>
                    {p.email && <MintContact icon="✉" value={p.email} />}
                    {p.phone && <MintContact icon="✆" value={p.phone} />}
                    {p.location && <MintContact icon="⌖" value={p.location} />}
                    {p.linkedin && <MintContact icon="in" value={p.linkedin} />}
                    {p.website && <MintContact icon="⬡" value={p.website} />}
                </div>

                {skills.length > 0 && (
                    <MintSideSection title="Skills">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'flex-start' }}>
                            {skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(16,185,129,0.2)', 
                                    border: '1px solid rgba(52,211,153,0.4)',
                                    color: '#6ee7b7', 
                                    padding: '5px 10px', 
                                    borderRadius: '12px', 
                                    fontSize: '10px',
                                    display: 'inline-block',
                                    lineHeight: '1.2'
                                }}>{skill}</span>
                            ))}
                        </div>
                    </MintSideSection>
                )}

                {education.length > 0 && (
                    <MintSideSection title="Education">
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <h3 style={{ color: '#ecfdf5', fontWeight: 700, fontSize: '11px', margin: 0 }}>{edu.degree}</h3>
                                <p style={{ color: '#6ee7b7', fontSize: '10px', margin: '2px 0' }}>{edu.school}</p>
                                <p style={{ color: '#a7f3d0', fontSize: '10px' }}>{edu.year}{edu.gpa && ` • ${edu.gpa}`}</p>
                            </div>
                        ))}
                    </MintSideSection>
                )}

                {languages.length > 0 && (
                    <MintSideSection title="Languages">
                        {languages.map((lang, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span style={{ color: '#ecfdf5', fontSize: '11px' }}>{lang.name}</span>
                                <span style={{ color: '#6ee7b7', fontSize: '10px' }}>{lang.level}</span>
                            </div>
                        ))}
                    </MintSideSection>
                )}

                {certifications.length > 0 && (
                    <MintSideSection title="Certifications">
                        {certifications.map((cert, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <p style={{ color: '#ecfdf5', fontSize: '11px', fontWeight: 600, margin: 0 }}>{cert.name}</p>
                                <p style={{ color: '#a7f3d0', fontSize: '10px' }}>{cert.issuer}</p>
                            </div>
                        ))}
                    </MintSideSection>
                )}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: '40px 40px 40px 32px' }}>
                {data?.summary && (
                    <MintSection title="Professional Summary">
                        <p style={{ color: '#374151', fontSize: '12px', lineHeight: '1.8' }}>{data.summary}</p>
                    </MintSection>
                )}

                {experience.length > 0 && (
                    <MintSection title="Work Experience">
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ color: '#064e3b', fontWeight: 800, fontSize: '13px', margin: 0 }}>{exp.title}</h3>
                                    <span style={{
                                        background: '#d1fae5', color: '#065f46', padding: '2px 8px',
                                        borderRadius: '10px', fontSize: '10px', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px'
                                    }}>{exp.duration}</span>
                                </div>
                                <p style={{ color: '#10b981', fontWeight: 700, fontSize: '12px', margin: '3px 0 6px' }}>{exp.company}</p>
                                {exp.description && <p style={{ color: '#4b5563', fontSize: '11px', lineHeight: '1.7' }}>{exp.description}</p>}
                                {i < experience.length - 1 && <div style={{ height: '1px', background: '#d1fae5', marginTop: '14px' }} />}
                            </div>
                        ))}
                    </MintSection>
                )}

                {projects.length > 0 && (
                    <MintSection title="Projects">
                        {projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ color: '#064e3b', fontWeight: 700, fontSize: '12px', margin: 0 }}>{proj.name}</h3>
                                    <span style={{ color: '#94a3b8', fontSize: '10px' }}>{proj.year}</span>
                                </div>
                                {proj.tech && <p style={{ color: '#10b981', fontSize: '11px', margin: '2px 0', fontWeight: 600 }}>{proj.tech}</p>}
                                {proj.description && <p style={{ color: '#4b5563', fontSize: '11px' }}>{proj.description}</p>}
                            </div>
                        ))}
                    </MintSection>
                )}
            </div>
        </div>
    )
}

function MintContact({ icon, value }) {
    return (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#6ee7b7', fontSize: '11px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
            <span style={{ color: '#d1fae5', fontSize: '10px', wordBreak: 'break-all' }}>{value}</span>
        </div>
    )
}

function MintSideSection({ title, children }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#34d399', fontSize: '9px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px', paddingBottom: '6px', borderBottom: '1px solid rgba(52,211,153,0.25)' }}>{title}</h2>
            {children}
        </div>
    )
}

function MintSection({ title, children }) {
    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '4px', height: '18px', background: 'linear-gradient(180deg, #10b981, #34d399)', borderRadius: '2px' }} />
                <h2 style={{ color: '#064e3b', fontSize: '11px', fontWeight: 900, letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase' }}>{title}</h2>
                <div style={{ flex: 1, height: '1px', background: '#d1fae5' }} />
            </div>
            {children}
        </div>
    )
}
