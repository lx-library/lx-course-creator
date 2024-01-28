import React from "react"
import styled from "styled-components"

const Button = ({children, onClick}) => {
    const text = (children) || ""
    return(
        <Btn onClick={onClick}>{children}</Btn>
    )
}

const Btn = styled.button`
`
export default Button