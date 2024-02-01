import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPageFinder = () => {
  const [pageNumber, setPageNumber] = useState(null);

  useEffect(() => {
    const onFileChange = async (e) => {
      const selectedFile = e.target.files[0];
      if (!selectedFile) return;
      const extractTextFromPdf = async (selectedFile) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        return new Promise((resolve, reject) => {
          reader.onload = async () => {
            const pdfData = new Uint8Array(reader.result);
            try {
              const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
              const numPages = pdf.numPages;
              for (let page = 1; page <= numPages; page++) {
                const pdfPage = await pdf.getPage(page);
                const pageText = await pdfPage.getTextContent();
                const pageTextArray = pageText.items.map(item => item.str);
                const joinedPageText = pageTextArray.join(' ');
                if (joinedPageText.toLowerCase().includes("programming uses its own terminology")) {
                  setPageNumber(page);
                  return resolve();
                }
              }
              resolve();
            } catch (error) {
              reject('Error extracting text from PDF', error);
            }
          };
        });
      };
      extractTextFromPdf(selectedFile);
    };

    document.getElementById('fileInput').addEventListener('change', onFileChange);

    return () => {
      document.getElementById('fileInput').removeEventListener('change', onFileChange);
    };
  }, []);

  return (
    <div>
      <input id="fileInput" type="file" />
      {pageNumber !== null && (
        <div>
          <h3>Keyword found on page:</h3>
          <p>{pageNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PdfPageFinder;
