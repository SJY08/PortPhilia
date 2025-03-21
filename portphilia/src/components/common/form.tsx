import React from "react"
import styled from "styled-components"
import { color } from "../../styles/colors"

interface props {
    children?: React.ReactNode
}

function Form({ children }: props) {
    return <Container>{children}</Container>
}

export default Form

const Container = styled.div`
    width: 400px;
    min-height: 400px;
    padding: 40px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 5px ${color.gray[100]};
    position: relative;
`
