import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ContentPage = () => {
  const [text, setText] = useState('');
  const [foundPages, setFoundPages] = useState([]);

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const extractedText = await extractTextFromPdf(selectedFile, 1, 500); // Change page range as needed
    setText(extractedText.fullText);
    setFoundPages(extractedText.foundPages);
  };

  const extractTextFromPdf = async (selectedFile, startPage, endPage) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        try {
          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          const numPages = pdf.numPages;
          let fullText = '';
          let foundPages = [];
          const desiredKeywords = ['Foreword', 'Chapter titles', 'Page number where each section begins', 'Index', 'Epilogue', 'Bibliography', 'contents', 'content overview']; // Add more keywords here
          const lowerCaseKeywords = desiredKeywords.map(keyword => keyword.toLowerCase());
          let consecutiveKeywordCount = 0; // Counter to track consecutive keyword occurrences
          for (let pageNumber = startPage; pageNumber <= endPage && pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const pageText = await page.getTextContent();
            const pageTextArray = pageText.items.map(item => item.str);
            const found = lowerCaseKeywords.some(keyword =>
              pageTextArray.some(word => word.toLowerCase().includes(keyword))
            );
            if (found) {
              foundPages.push(pageNumber);
              fullText += pageTextArray.join(' ') + '\n';
              consecutiveKeywordCount++; // Increment the counter for consecutive keyword occurrences
            } else {
              consecutiveKeywordCount = 0; // Reset the counter if keywords are not found on the current page
            }
            if (consecutiveKeywordCount >= 3) break; // Stop extracting after finding 3 consecutive pages with keywords
          }
          resolve({ fullText, foundPages });
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
          <h3>Contents Pages:</h3>
          {foundPages.length > 0 ? (
            <ul>
              {foundPages.map(pageNumber => (
                <li key={pageNumber}>Page {pageNumber}</li>
              ))}
            </ul>
          ) : (
            <p>No relevant content found.</p>
          )}
          <h3>Extracted Text:</h3>
          <pre style={{ overflowWrap: 'break-word' }}>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default ContentPage;