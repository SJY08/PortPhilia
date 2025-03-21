import styled from "styled-components"
import { color } from "../../styles/colors"
import React from "react"

interface props {
    children?: React.ReactNode
    onClick?: () => void
}

function Button({ children, onClick }: props) {
    return <Container onClick={onClick}>{children}</Container>
}

export default Button

const Container = styled.button`
    width: 100%;
    height: 35px;
    background-color: ${color.blue[400]};
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 16px;
    font-weight: 500;
`
