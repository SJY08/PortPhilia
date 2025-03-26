import styled from "styled-components"
import { color } from "../../../styles/colors"

function Profile() {
    return (
        <>
            <Container>
                <Image />

                <InfromContainer>
                    <Name>서지유</Name>
                    <TextContainer>
                        <Text>2008-08-28</Text>
                        <Text>010-4271-0306</Text>
                        <Text>jiyuseo2008@gmail.com</Text>
                        <Text>대덕소프트웨어마이스터고등학교(졸업예정)</Text>
                    </TextContainer>
                </InfromContainer>
            </Container>
        </>
    )
}

export default Profile

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 12px;
    background-color: ${color.gray[400]};
`

const InfromContainer = styled.div`
    height: 250px;
    margin-left: auto;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px;
`

const Name = styled.h1`
    font-size: 36px;
    font-weight: bolder;
    margin-bottom: auto;
    color: ${color.blue[400]};
`

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
`

const Text = styled.p`
    font-size: 16px;
    font-weight: 800;
    color: ${color.gray[300]};
`
