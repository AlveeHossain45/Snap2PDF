// src/utils/pdfGenerator.js

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(contentHTML, options) {
  const { fileName, pageSize, orientation, margin } = options;

  // ধাপ ১: একটি অদৃশ্য কন্টেইনার তৈরি করুন যা A4 কাগজের প্রস্থের মতো হবে
  const pdfContainer = document.createElement('div');
  
  // স্টাইলিং
  pdfContainer.style.position = 'absolute';
  pdfContainer.style.left = '-9999px'; // স্ক্রিনের বাইরে রাখুন
  pdfContainer.style.width = '210mm'; // A4 কাগজের আদর্শ প্রস্থ
  pdfContainer.style.padding = '20px'; // ভেতরের কন্টেন্টের জন্য প্যাডিং
  pdfContainer.style.backgroundColor = 'white';
  pdfContainer.style.color = 'black';
  pdfContainer.innerHTML = contentHTML;

  // এটিকে DOM-এ যোগ করুন যাতে html2canvas এটিকে রেন্ডার করতে পারে
  document.body.appendChild(pdfContainer);

  try {
    // ধাপ ২: এই পারফেক্ট আকারের কন্টেইনারটির ক্যানভাস তৈরি করুন
    const canvas = await html2canvas(pdfContainer, {
      scale: 2, // উন্নত রেজোলিউশনের জন্য
      useCORS: true,
      logging: false,
    });

    // ধাপ ৩: ক্যানভাস থেকে ইমেজ ডেটা নিন
    const imgData = canvas.toDataURL('image/png');

    // ধাপ ৪: jsPDF ডকুমেন্ট তৈরি করুন
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: pageSize,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // মার্জিন বাদ দিয়ে ইমেজের প্রস্থ গণনা করুন
    const imgWidth = pdfWidth - margin * 2;
    // ক্যানভাসের অনুপাত অনুযায়ী ইমেজের উচ্চতা গণনা করুন
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // প্রথম পৃষ্ঠায় ইমেজ যোগ করুন
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - margin * 2);

    // যদি কন্টেন্ট এক পৃষ্ঠার চেয়ে বড় হয়, তাহলে নতুন পৃষ্ঠা যোগ করুন
    while (heightLeft > 0) {
      position = -heightLeft + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - margin * 2);
    }

    // ধাপ ৫: PDF ফাইলটি সেভ করুন
    pdf.save(`${fileName}.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    // ধাপ ৬: কাজ শেষে অদৃশ্য কন্টেইনারটি DOM থেকে মুছে ফেলুন
    document.body.removeChild(pdfContainer);
  }
}

export function downloadText(content, fileName) {
  // এই ফাংশনটি অপরিবর্তিত থাকবে
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