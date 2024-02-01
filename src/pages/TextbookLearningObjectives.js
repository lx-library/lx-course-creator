import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TextbookLearningObjectives = () => {
  const [text, setText] = useState(null);
  const [startPage, setStartPage] = useState(1); 

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const keyword = "In this chapter, you will learn about";
    try {
      const extractedText = await extractTextFromPdf(selectedFile, keyword, startPage);
      setText(extractedText);
    } catch (error) {
      console.error('Error extracting text from PDF', error);
    }
  };

  const extractTextFromPdf = async (selectedFile, keyword, startPage) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        try {
          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          const numPages = pdf.numPages;
          let targetPage = -1;
          for (let pageNumber = startPage; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const pageText = await page.getTextContent();
            const pageTextArray = pageText.items.map(item => item.str);
            const pageTextStr = pageTextArray.join(' ');
            if (pageTextStr.includes(keyword)) {
              targetPage = pageNumber;
              break;
            }
          }
          if (targetPage === -1) {
            reject('Keyword not found in the document.');
            return;
          }
          // Get content of the target page and the following one
          const targetPageContent = await getPageContent(pdf, targetPage);
          const nextPageContent = await getPageContent(pdf, targetPage + 1);
          resolve({ targetPageContent, nextPageContent });
        } catch (error) {
          reject(error);
        }
      };
    });
  };

  const getPageContent = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const pageText = await page.getTextContent();
    const pageTextArray = pageText.items.map(item => item.str);
    return pageTextArray.join(' ');
  };

  const handlePageInputChange = (e) => {
    const pageNumber = parseInt(e.target.value);
    setStartPage(pageNumber);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <div>
        <label>Start Page:</label>
        <input type="number" value={startPage} onChange={handlePageInputChange} />
      </div>
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <pre style={{ overflowWrap: 'break-word' }}>{text.targetPageContent}</pre>
          <pre style={{ overflowWrap: 'break-word' }}>{text.nextPageContent}</pre>
        </div>
      )}
    </div>
  );
};

export default TextbookLearningObjectives;
