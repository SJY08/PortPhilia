import React from "react"
import styled from "styled-components"

interface props {
    children?: React.ReactNode
    className?: string // className 추가
}

function Page({ children, className }: props) {
    return <Container className={className}>{children}</Container>
}

export default Page

const Container = styled.div`
    width: 840px;
    height: 1188px;
    background: white;
    box-sizing: border-box;
    padding: 80px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    page-break-after: always;
`
