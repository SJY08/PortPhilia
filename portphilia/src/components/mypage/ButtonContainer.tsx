import styled from "styled-components"
import { color } from "../../styles/colors"

interface props {
    title?: string
    explain?: string
    children?: React.ReactNode
}

function ButtonContainer({ title, explain, children }: props) {
    return (
        <>
            <Container>
                <Title>{title}</Title>
                <Wrapper>
                    <Explain>{explain}</Explain>
                    <ButtonWrapper>{children}</ButtonWrapper>
                </Wrapper>
            </Container>
        </>
    )
}

export default ButtonContainer

const Container = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
`

const Wrapper = styled.div`
    width: 600px;
    height: 70px;
    border-radius: 12px;
    border: 1px solid ${color.gray[500]};
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
`

const Title = styled.p`
    font-size: 20px;
    font-weight: 900;
    margin: 0;
    color: ${color.gray[500]};
`

const Explain = styled.p`
    font-size: 18px;
    margin: 0;
`

const ButtonWrapper = styled.div`
    margin-left: auto;
`
