import React from "react"
import styled from "styled-components"
import Button from "./Button"


const ControlSelector = ({controls}) => {
   

    return(
        <Padding>
            {
                controls.map((control, index) =>  {
                    const type = (control && control.type) || null
                    console.log("control", control)
                    
                    switch(type){
                        case 'SELECT':
                            return(
                                <div>dzve</div>
                            )
                        default:
                            return null
                    }
                })
            }
        </Padding>
    )


}

const Modal = ({data}) => {

    const text = data.text

    console.log("data", data)



    const controls = (data && data.controls) || []
    console.log("controls", controls)

    return(
        <Container>
            <ModalContainer>
                <H1>{text}</H1>
                <ControlSelector controls={controls}/>
            </ModalContainer>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalContainer = styled.div`
    width: 100%;
    max-width: 700px;
    background-color: rgba(255,255,255, 0.9);
    border-radius:15px;
`
const H1 = styled.h1`
    margin: 0;
    width: 100%;
    text-align: center;
    font-weight: 300;
`
const Padding = styled.div`
    width: calc(100% - 40px);
    background-color: rgba(0,0,0, .05);
    margin: auto;
    margin-bottom: 10px;
    padding: 10px;
    border-radius:15px;
`
export default Modal