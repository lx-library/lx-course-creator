import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToText = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState('');

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    extractTextFromPdf(selectedFile);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    extractTextFromPdf(file);
  };

  const extractTextFromPdf = async (selectedFile) => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const pdfData = new Uint8Array(reader.result);
      let fullText = '';
      try {
        const pdf = await pdfjs.getDocument({ data: pdfData });
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const pageText = await page.getTextContent();
          fullText += pageText.items.map(item => item.str).join(' ') + '\n';
        }
        console.log("dave", fullText);
        setText(fullText);
      } catch (error) {
        console.error('Error extracting text from PDF', error);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {file && (
        <div>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ),
            )}
          </Document>
          <div>
            <h3>Extracted Text:</h3>
            <pre>{text}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfToText;
