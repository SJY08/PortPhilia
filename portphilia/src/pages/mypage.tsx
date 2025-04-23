import styled from "styled-components"
import Profile from "../components/mypage/Profile"
import EditPassword from "../components/mypage/EditPassword"

function Mypage() {
    return (
        <>
            <Container>
                <Profile />

                <EditPassword />
            </Container>
        </>
    )
}

export default Mypage

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
`
