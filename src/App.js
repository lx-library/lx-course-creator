import React, { useState } from "react"
import styled from "styled-components"
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";

const App = () => {

  const [modalData, setModalData] = useState(null)

  const states = {
    ADDING_COURSE: "ADDING_COURSE"
  }

  const leftButtons = [
    {text: "New", state: states.ADDING_COURSE }
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
      }
    ]
  }
  
  


  const setState = (state) => {
    console.log("State", state)
    switch(state){
      case states.ADDING_COURSE:
        setModalData(newCourseData)

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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
`

export default App;
