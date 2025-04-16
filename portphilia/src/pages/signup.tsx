import styled from "styled-components"
import { color } from "../styles/colors"
import Form from "../components/common/form"
import Input from "../components/common/input"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import AuthService from "../apis/auth"

function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassowrd] = useState<string>("")

    const submitHandler = async () => {
        try {
            if (name && username && password) {
                const result = await AuthService.register({
                    name,
                    username,
                    password,
                })
                console.log(result)
                if (result == 200 || result == 201) navigate("/login")
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Background>
                <Form>
                    <Title>회원가입</Title>
                    <InputWrapper>
                        <Input
                            label="이름"
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                        />
                        <Input
                            label="아이디"
                            value={username}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                        />
                        <Input
                            label="비밀번호"
                            value={password}
                            type="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassowrd(e.target.value)}
                        />
                    </InputWrapper>
                    <ButtonWrapper>
                        <Button
                            variant="primary"
                            onClick={submitHandler}
                            className="w-100"
                        >
                            회원가입
                        </Button>
                        <Explain>
                            회원이 이신가요?{" "}
                            <Accent onClick={() => navigate("/login")}>
                                로그인
                            </Accent>
                        </Explain>
                    </ButtonWrapper>
                </Form>
            </Background>
        </>
    )
}

export default Signup

const Title = styled.h1`
    font-size: 30px;
    font-weight: 800;
    color: ${color.blue[500]};
    width: 100%;
    text-align: center;
`

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 40px;
    align-items: center;
    background: linear-gradient(white, ${color.blue[50]});
`

const ButtonWrapper = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
`

const Explain = styled.p`
    color: ${color.gray[400]};
    font-size: 14px;
`

const Accent = styled.span`
    color: ${color.blue[500]};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`
