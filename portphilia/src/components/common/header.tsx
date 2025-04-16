import styled from "styled-components"
import { color } from "../../styles/colors"
import Portphilia from "../../assets/PortPhilia.png"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()

    return (
        <>
            <Background>
                <Container>
                    <img
                        src={Portphilia}
                        alt="로고"
                        height={20}
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                    />

                    <Wrapper>
                        <Signup onClick={() => navigate("/signup")}>
                            회원가입
                        </Signup>
                        <Button onClick={() => navigate("/login")}>
                            로그인
                        </Button>
                    </Wrapper>
                </Container>
            </Background>
        </>
    )
}

export default Header

const Background = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid ${color.gray[100]};
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    height: 50px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    margin-left: auto;
    display: flex;
    gap: 20px;
`

const Signup = styled.div`
    padding: 8px 16px;
    font-size: 16px;
    color: ${color.blue[500]};
    cursor: pointer;
`
