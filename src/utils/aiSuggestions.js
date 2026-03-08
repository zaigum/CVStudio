// AI-powered content suggestions (mock implementation)
export const getSummarySuggestions = (cvData) => {
    const { personal, experience, skills } = cvData || {}
    const title = personal?.title || 'Professional'
    const years = experience?.length || 0
    const topSkills = skills?.slice(0, 3).join(', ') || 'various technologies'
    
    return [
        `${title} with ${years}+ years of experience in ${topSkills}. Proven track record of delivering high-quality solutions.`,
        `Results-driven ${title} specializing in ${topSkills}. Passionate about creating innovative solutions and driving business growth.`,
        `Experienced ${title} with expertise in ${topSkills}. Strong problem-solving skills and commitment to excellence.`
    ]
}

export const getSkillSuggestions = (currentSkills = []) => {
    const allSkills = {
        'JavaScript': ['React', 'Node.js', 'TypeScript', 'Vue.js', 'Angular'],
        'Python': ['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy'],
        'Java': ['Spring Boot', 'Hibernate', 'Maven', 'JUnit'],
        'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure'],
        'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL']
    }
    
    const suggestions = []
    currentSkills.forEach(skill => {
        Object.entries(allSkills).forEach(([category, related]) => {
            if (related.includes(skill)) {
                related.forEach(s => {
                    if (!currentSkills.includes(s) && !suggestions.includes(s)) {
                        suggestions.push(s)
                    }
                })
            }
        })
    })
    
    return suggestions.slice(0, 5)
}

export const improveDescription = (text) => {
    if (!text) return []
    
    const improvements = []
    
    if (!text.match(/\d+%|\d+x|increased|improved|reduced/i)) {
        improvements.push('Add quantifiable metrics (e.g., "Increased efficiency by 30%")')
    }
    
    if (text.split(' ').length < 10) {
        improvements.push('Expand description with more details about your impact')
    }
    
    if (!text.match(/led|managed|developed|implemented|designed/i)) {
        improvements.push('Start with strong action verbs (Led, Managed, Developed)')
    }
    
    return improvements
}
