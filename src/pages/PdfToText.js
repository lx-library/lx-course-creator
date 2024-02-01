import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToText = (setSelectedfFile) => {
  const [text, setText] = useState('');

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedfFile(selectedFile)
    if (!selectedFile) return;
    const extractedText = await extractTextFromPdf(selectedFile);
    setText(extractedText);
  };

  const extractTextFromPdf = async (selectedFile) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        try {
          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          const numPages = pdf.numPages;
          let fullText = '';
          for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const pageText = await page.getTextContent();
            const pageTextArray = pageText.items.map(item => item.str);
            fullText += pageTextArray.join(' ') + '\n';
          }
          resolve(fullText);
        } catch (error) {
          reject('Error extracting text from PDF', error);
        }
      };
    });
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <pre style={{ overflowWrap: 'break-word' }}>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfToText;