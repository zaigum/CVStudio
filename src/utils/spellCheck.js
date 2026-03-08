// Simple spell checker using common typos
const commonTypos = {
    'recieve': 'receive', 'occured': 'occurred', 'seperate': 'separate',
    'definately': 'definitely', 'accomodate': 'accommodate', 'acheive': 'achieve',
    'beleive': 'believe', 'calender': 'calendar', 'collegue': 'colleague',
    'concious': 'conscious', 'enviroment': 'environment', 'goverment': 'government',
    'independant': 'independent', 'maintainance': 'maintenance', 'occassion': 'occasion',
    'recomend': 'recommend', 'succesful': 'successful', 'untill': 'until'
}

export const checkSpelling = (text) => {
    if (!text) return { errors: [], suggestions: [] }
    
    const words = text.toLowerCase().split(/\s+/)
    const errors = []
    
    words.forEach((word, index) => {
        const cleanWord = word.replace(/[.,!?;:]/g, '')
        if (commonTypos[cleanWord]) {
            errors.push({
                word: cleanWord,
                suggestion: commonTypos[cleanWord],
                position: index
            })
        }
    })
    
    return { errors, hasErrors: errors.length > 0 }
}

export const autoCorrect = (text) => {
    if (!text) return text
    
    let corrected = text
    Object.entries(commonTypos).forEach(([typo, correct]) => {
        const regex = new RegExp(`\\b${typo}\\b`, 'gi')
        corrected = corrected.replace(regex, correct)
    })
    
    return corrected
}
