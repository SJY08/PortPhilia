import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const exportToPDF = async () => {
    try {
        const pages = document.querySelectorAll(".pdf-page")
        if (!pages.length) {
            console.error("PDF 페이지 요소(.pdf-page)를 찾을 수 없습니다.")
            return
        }
        const pdf = new jsPDF("p", "mm", "a4")
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement
            const canvas = await html2canvas(page, {
                scale: 2,
                backgroundColor: null,
                useCORS: true,
            })
            const imgData = canvas.toDataURL("image/png")
            const imgWidth = 210 // A4 폭 (mm)
            const imgHeight = (canvas.height * imgWidth) / canvas.width
            if (i > 0) {
                pdf.addPage()
            }
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        }
        pdf.save("portfolio.pdf")
        console.log("PDF 다운로드 성공")
    } catch (error) {
        console.error("PDF export error:", error)
    }
}

export default exportToPDF
