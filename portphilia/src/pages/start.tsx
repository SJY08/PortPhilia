import styled from "styled-components"
import Header from "../components/common/header"
import Banner from "../components/start/banner"
import List from "../components/start/list"
import Content from "../components/start/content"

function Start() {
    return (
        <>
            <Container>
                <Header />
                <Banner />
                <List />
                <Content />
            </Container>
        </>
    )
}

export default Start

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`
