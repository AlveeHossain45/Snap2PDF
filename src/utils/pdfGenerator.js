// src/utils/pdfGenerator.js

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(contentHTML, options) {
  const { fileName, pageSize, orientation, margin } = options;

  const pdfContainer = document.createElement('div');
  
  pdfContainer.style.position = 'absolute';
  pdfContainer.style.left = '-9999px';
  pdfContainer.style.width = '210mm'; // A4 width
  pdfContainer.style.padding = '20px';
  pdfContainer.style.backgroundColor = 'white';
  pdfContainer.style.color = 'black';
  
  // কন্টেন্টের স্টাইল ঠিক রাখার জন্য prose ক্লাস যোগ করা
  pdfContainer.className = 'prose'; 
  pdfContainer.innerHTML = contentHTML;

  document.body.appendChild(pdfContainer);

  try {
    const canvas = await html2canvas(pdfContainer, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: pageSize,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - margin * 2);

    while (heightLeft > 0) {
      position = -heightLeft + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - margin * 2);
    }
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error in PDF generation process:', error);
    alert('Failed to generate PDF due to a processing error.');
  } finally {
    document.body.removeChild(pdfContainer);
  }
}

export function downloadText(content, fileName) {
  const blob = new Blob([content.replace(/<[^>]*>/g, '')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}