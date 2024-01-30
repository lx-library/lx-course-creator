import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToText = () => {
  const [text, setText] = useState('');
  const [pageKeywords, setPageKeywords] = useState({});

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const extractedText = await extractTextFromPdf(selectedFile);
    setText(extractedText.fullText);
    setPageKeywords(extractedText.pageKeywords);
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
          let pageKeywords = {};
          const desiredKeywords = ['gender', 'example']; // Add more keywords here
          const lowerCaseKeywords = desiredKeywords.map(keyword => keyword.toLowerCase());
          for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const pageText = await page.getTextContent();
            const pageTextArray = pageText.items.map(item => item.str);
            fullText += pageTextArray.join(' ') + '\n';
            pageKeywords[pageNumber] = {};
            lowerCaseKeywords.forEach(keyword => {
              pageKeywords[pageNumber][keyword] = pageTextArray.filter(word => {
                const lowerCaseWord = word.toLowerCase();
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                return regex.test(lowerCaseWord);
              });
            });
          }
          resolve({ fullText, pageKeywords });
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
      {Object.keys(pageKeywords).map(pageNumber => (
        <div key={pageNumber}>
          <h3>Extracted Keywords of page {pageNumber}:</h3>
          {Object.keys(pageKeywords[pageNumber]).map(keyword => (
            <div key={keyword}>
              <h4 style={{ marginLeft: '20px' }}>{keyword}</h4>
              <pre style={{ marginLeft: '40px' }}>{JSON.stringify(pageKeywords[pageNumber][keyword], null, 2)}</pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PdfToText;
