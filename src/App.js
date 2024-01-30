import React, { useState } from "react"
import styled from "styled-components"
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";
import PdfToText from "./pages/PdfToText";

const App = () => {

  const [modalData, setModalData] = useState(null)

  const [content, setContent] = useState(null)


  const pageContent = {
    filePath: 'path_toFile.js',
  }

  const states = {
    ADDING_COURSE: "ADDING_COURSE",
    TEXT_FROM_PDF: "TEXT_FROM_PDF",
  }

  const leftButtons = [
    {text: "New", state: states.ADDING_COURSE },
    {text: "PDF", state: states.TEXT_FROM_PDF }

  ]

  const newCourseData = {
    text: "Creating a course",
    controls: [
      {
        type: 'SELECT',
        options: [
          {
            key: "Create a CAPS Course",
            value: "CAPS_COURSE"
          },
          {
            key: "Create a Cambridge Course",
            value: "CAMBRIDGE_COURSE"
          }
        ]
      },
      {
        type: 'LIST_BUILDER',
        options: [
          {
            id: "Create a CAPS Course",
            value: "CAPS_COURSE"
          },
          {
            id: "Create a Cambridge Course",
            value: "CAMBRIDGE_COURSE"
          }
        ]
      }
    ]
  }
  
  


  const setState = (state) => {
    console.log("State", state)
    switch(state){
      case states.ADDING_COURSE:
        setModalData(newCourseData)
      case states.TEXT_FROM_PDF:
        setContent(pageContent)
        debugger

      default:
        return null

    }
  }
  return (
    <Container>
      {
        modalData?
        <Modal data={modalData}/>
        :null
      }
      
      <Toolbar leftButtons={leftButtons} setState={setState}/>

      <PdfToText/>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
`

export default App;
