import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// PDF 저장 함수
const exportToPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4") // A4 사이즈 PDF
    const pages = document.querySelectorAll(".pdf-page") // 모든 페이지 가져오기

    for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i] as HTMLElement, { scale: 2 }) // 고해상도 캡처
        const imgData = canvas.toDataURL("image/png") // 이미지 데이터 변환

        const imgWidth = 210 // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width // 비율에 맞게 이미지 크기 조정

        if (i > 0) pdf.addPage() // 첫 페이지 이후에는 새 페이지 추가
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight) // 이미지 추가
    }

    pdf.save("portfolio.pdf") // PDF 저장
}

export default exportToPDF
