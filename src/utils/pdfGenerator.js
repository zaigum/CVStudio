import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const generateHighQualityPDF = async (element, fileName = 'CV.pdf') => {
    try {
        // Store original styles
        const originalWidth = element.style.width
        const originalTransform = element.parentElement?.style.transform || ''
        
        // Optimize for PDF generation
        if (element.parentElement) {
            element.parentElement.style.transform = 'scale(1)'
        }
        element.style.width = '210mm'
        
        // Generate high-quality canvas
        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 794,
            windowHeight: 1123,
        })
        
        // Restore original styles
        element.style.width = originalWidth
        if (element.parentElement) {
            element.parentElement.style.transform = originalTransform
        }

        // Create PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        })

        const pdfWidth = 210
        const pdfHeight = 297
        const imgWidth = pdfWidth
        const imgHeight = (canvas.height * pdfWidth) / canvas.width

        let heightLeft = imgHeight
        let position = 0

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST')
        heightLeft -= pdfHeight

        while (heightLeft > 0) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST')
            heightLeft -= pdfHeight
        }

        pdf.save(fileName)
        return { success: true }
    } catch (error) {
        console.error('PDF generation error:', error)
        return { success: false, error }
    }
}
