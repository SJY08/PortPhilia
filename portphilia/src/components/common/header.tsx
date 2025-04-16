import styled from "styled-components"
import { color } from "../../styles/colors"
import Portphilia from "../../assets/PortPhilia.png"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { tempCookie } from "../../utils/tempCookie"
import { IoPersonSharp } from "react-icons/io5"

function Header() {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(() => {
        const cookie = tempCookie.getAccessToken()

        if (cookie) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    })

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
                        {isLogin ? (
                            <>
                                <Profile>
                                    <IoPersonSharp />
                                </Profile>
                            </>
                        ) : (
                            <>
                                <Signup onClick={() => navigate("/signup")}>
                                    회원가입
                                </Signup>
                                <Button onClick={() => navigate("/login")}>
                                    로그인
                                </Button>
                            </>
                        )}
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

const Profile = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: ${color.gray[50]};
    color: ${color.gray[200]};
    display: flex;
    justify-content: center;
    align-items: center;
`
