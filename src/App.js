import React, { useState } from "react";
import styled from "styled-components";
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";
import PdfToText from "./pages/PdfToText";
import ContentPage from "./pages/ContentPage";
import TextPageParameterFilter from "./pages/TextPageParameterFilter";
import TextbookLearningObjectives from "./pages/TextbookLearningObjectives";
import PdfPageFinder from "./pages/PdfPageFinder"; // Import the PdfPageFinder component
import { Document, Page } from '@react-pdf/renderer';

const App = () => {
  const [modalData, setModalData] = useState(null);
  const [activeState, setActiveState] = useState(null);

  const pageContent = {
    filePath: "path_toFile.js",
  };

  const states = {
    ADDING_COURSE: "ADDING_COURSE",
    TEXT_FROM_PDF: "TEXT_FROM_PDF",
    CONTENT_PAGE: "CONTENT_PAGE",
    PAGE_PARAMETERS: "PAGE_PARAMETERS",
    TEXTBOOK_LEARNING_OBJECTIVES: "TEXTBOOK_LEARNING_OBJECTIVES",
    PDF_PAGE_FINDER: "PDF_PAGE_FINDER", // Add new state for PdfPageFinder
  };

  const leftButtons = [
    { text: "New", state: states.ADDING_COURSE },
    { text: "PDF", state: states.TEXT_FROM_PDF },
    { text: "Get Content Page", state: states.CONTENT_PAGE },
    { text: "Page Parameters", state: states.PAGE_PARAMETERS },
    { text: "Textbook Learning Objectives", state: states.TEXTBOOK_LEARNING_OBJECTIVES },
    { text: "Find Page in PDF", state: states.PDF_PAGE_FINDER }, // New button
  ];

  const newCourseData = {
    text: "Creating a course",
    controls: [
      {
        type: "SELECT",
        options: [
          {
            key: "Create a CAPS Course",
            value: "CAPS_COURSE",
          },
          {
            key: "Create a Cambridge Course",
            value: "CAMBRIDGE_COURSE",
          },
        ],
      },
      {
        type: "LIST_BUILDER",
        options: [
          {
            id: "Create a CAPS Course",
            value: "CAPS_COURSE",
          },
          {
            id: "Create a Cambridge Course",
            value: "CAMBRIDGE_COURSE",
          },
        ],
      },
    ],
  };

  const setState = (state) => {
    console.log("State", state);
    setActiveState(state);
    switch (state) {
      case states.ADDING_COURSE:
        setModalData(newCourseData);
        break;
      case states.TEXT_FROM_PDF:
        setModalData(null);
        break;
      case states.CONTENT_PAGE:
        setModalData(null);
        break;
      case states.PAGE_PARAMETERS:
        setModalData(null);
        break;
      case states.TEXTBOOK_LEARNING_OBJECTIVES:
        setModalData(null);
        break;
      case states.PDF_PAGE_FINDER: // Handle PdfPageFinder state
        setModalData(null);
        break;
      default:
        setModalData(null);
        break;
    }
  };

  return (
    // <Document
    //     file="path/to/your/pdf/document.pdf"
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    //     {Array.from(new Array(numPages), (el, index) => (
    //       <Page key={`page_${index + 1}`} pageNumber={index + 1} />
    //     ))}
    //   </Document>
    <Container>
      {modalData ? <Modal data={modalData} /> : null}

      <Toolbar leftButtons={leftButtons} setState={setState} />

      {activeState === states.TEXT_FROM_PDF ? <PdfToText /> : null}
      {activeState === states.CONTENT_PAGE ? <ContentPage /> : null}
      {activeState === states.PAGE_PARAMETERS ? <TextPageParameterFilter /> : null}
      {activeState === states.TEXTBOOK_LEARNING_OBJECTIVES ? <TextbookLearningObjectives /> : null}
      {activeState === states.PDF_PAGE_FINDER ? <PdfPageFinder /> : null} {/* Render the PdfPageFinder component */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  padding-top: 50px;
`

export default App;





// import React, { useState } from 'react';
// import { Document, Page } from '@react-pdf/renderer';

// const PDFViewer = () => {
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       <h1>PDF Viewer</h1>
      
//       <p>Total Pages: {numPages}</p>
//     </div>
//   );
// };

// export default PDFViewer;

