// Template 0: Midnight Pro (Purple/Indigo Dark)
export default function TemplateMidnightPro({ data }) {
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
            padding: 0,
            position: 'relative',
            overflow: 'hidden',
            wordBreak: 'normal',
            whiteSpace: 'normal'
        }}>


            {/* Header */}
            <div style={{ padding: '40px 48px 32px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px', fontFamily: 'Space Grotesk, sans-serif' }}>
                            {p.name || 'Your Name'}
                        </h1>
                        <p style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500, margin: '4px 0 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                            {p.title || 'Professional Title'}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748b', lineHeight: '1.8' }}>
                        {p.email && <div>📧 {p.email}</div>}
                        {p.phone && <div>📞 {p.phone}</div>}
                        {p.location && <div>📍 {p.location}</div>}
                        {p.linkedin && <div>🔗 {p.linkedin}</div>}
                        {p.website && <div>🌐 {p.website}</div>}
                    </div>
                </div>
                <div style={{ height: '2px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, transparent)', marginTop: '24px', borderRadius: '1px' }} />
            </div>

            <div style={{ display: 'flex', gap: 0 }}>
                {/* Left column */}
                <div style={{ width: '62%', padding: '0 24px 40px 48px', borderRight: '1px solid rgba(99,102,241,0.15)' }}>

                    {data?.summary && (
                        <CVSection title="SUMMARY" color="#6366f1">
                            <p style={{ color: '#475569', fontSize: '12px', lineHeight: '1.8', margin: 0, wordSpacing: '3px', letterSpacing: '0.4px', whiteSpace: 'pre-wrap' }}>{data.summary}</p>
                        </CVSection>
                    )}

                    {experience.length > 0 && (
                        <CVSection title="EXPERIENCE" color="#6366f1">
                            {experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '14px' }}>
                                    <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '13px', margin: 0, marginBottom: '3px', letterSpacing: '0.4px', lineHeight: '1.4' }}>{exp.title}</h3>
                                    <p style={{ color: '#6366f1', fontSize: '11px', margin: 0, marginBottom: '2px', letterSpacing: '0.4px' }}>{exp.company}</p>
                                    <span style={{ color: '#64748b', fontSize: '10px', display: 'block', letterSpacing: '0.4px' }}>{exp.duration}</span>
                                    {i < experience.length - 1 && <div style={{ height: '1px', background: 'rgba(99,102,241,0.1)', marginTop: '10px' }} />}
                                </div>
                            ))}
                        </CVSection>
                    )}

                    {projects.length > 0 && (
                        <CVSection title="PROJECTS" color="#6366f1">
                            {projects.map((proj, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '12px', margin: 0, marginBottom: '3px', letterSpacing: '0.4px', lineHeight: '1.4' }}>{proj.name}</h3>
                                    {proj.tech && <p style={{ color: '#6366f1', fontSize: '10px', margin: 0, marginBottom: '2px', letterSpacing: '0.4px' }}>{proj.tech}</p>}
                                    {proj.description && <p style={{ color: '#64748b', fontSize: '10px', lineHeight: '1.7', margin: 0, wordSpacing: '3px', letterSpacing: '0.4px', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
                                </div>
                            ))}
                        </CVSection>
                    )}
                </div>

                {/* Right column */}
                <div style={{ width: '38%', padding: '0 48px 40px 24px' }}>

                    {skills.length > 0 && (
                        <CVSection title="SKILLS" color="#8b5cf6">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {skills.map((skill, i) => (
                                    <span key={i} style={{
                                        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                                        color: '#6366f1', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 500
                                    }}>{skill}</span>
                                ))}
                            </div>
                        </CVSection>
                    )}

                    {education.length > 0 && (
                        <CVSection title="EDUCATION" color="#8b5cf6">
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '12px', margin: 0 }}>{edu.degree}</h3>
                                    <p style={{ color: '#6366f1', fontSize: '11px', margin: '2px 0' }}>{edu.school}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#64748b', fontSize: '11px' }}>{edu.year}</span>
                                        {edu.gpa && <span style={{ color: '#64748b', fontSize: '11px' }}>GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </CVSection>
                    )}

                    {certifications.length > 0 && (
                        <CVSection title="CERTIFICATIONS" color="#8b5cf6">
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <h3 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 700, margin: 0 }}>{cert.name}</h3>
                                    <p style={{ color: '#64748b', fontSize: '11px', margin: '2px 0' }}>{cert.issuer} • {cert.date}</p>
                                </div>
                            ))}
                        </CVSection>
                    )}

                    {languages.length > 0 && (
                        <CVSection title="LANGUAGES" color="#8b5cf6">
                            {languages.map((lang, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#0f172a', fontSize: '12px' }}>{lang.name}</span>
                                    <span style={{ color: '#6366f1', fontSize: '11px', fontWeight: 600 }}>{lang.level}</span>
                                </div>
                            ))}
                        </CVSection>
                    )}
                </div>
            </div>
        </div>
    )
}

function CVSection({ title, color, children }) {
    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '3px', height: '14px', background: color, borderRadius: '2px', display: 'inline-block' }} />
                <h2 style={{ color: color, fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase' }}>{title}</h2>
            </div>
            {children}
        </div>
    )
}
