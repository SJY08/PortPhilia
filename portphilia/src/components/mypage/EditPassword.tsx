import styled from "styled-components"
import { color } from "../../styles/colors"
import { Button, Modal } from "react-bootstrap"
import { useState } from "react"
import Input from "../common/input"
import AuthService from "../../apis/auth"

function EditPassword() {
    const [modal, setModal] = useState<boolean>(false)
    const [verifyPwd, setVerifyPwd] = useState<boolean>(true)
    const [password, setPassword] = useState<string>("")

    const verify = async () => {
        const result = await AuthService.verifyPassword(password)
        if (result == 200) {
            setVerifyPwd(false)
            setPassword("")
        } else {
            alert("비밀번호가 틀렸습니다")
        }
    }

    const editPwd = async () => {
        const result = await AuthService.changePassword(password)
        if (result === 200) {
            alert("비밀번호가 성공적으로 변경되었습니다.")
            setModal(false)
        } else {
            alert("비밀번호 변경에 실패했습니다.")
        }
    }

    return (
        <>
            {modal && (
                <>
                    <Modal show={modal} onHide={() => setModal(false)}>
                        {verifyPwd ? (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>비밀번호 인증</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Input
                                        label="비밀번호 인증"
                                        type="password"
                                        value={password}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setPassword(e.target.value)}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setModal(false)}
                                    >
                                        닫기
                                    </Button>
                                    <Button onClick={verify}>인증하기</Button>
                                </Modal.Footer>
                            </>
                        ) : (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>비밀번호 변경</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Input
                                        label="비밀번호 변경"
                                        type="password"
                                        value={password}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setPassword(e.target.value)}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setModal(false)}
                                    >
                                        닫기
                                    </Button>
                                    <Button onClick={editPwd}>변경하기</Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>
                </>
            )}
            <Container>
                <Title>비밀번호</Title>
                <Wrapper>
                    <Explain>비밀번호 변경</Explain>
                    <ButtonWrapper>
                        <Button
                            onClick={() => {
                                setModal(true)
                                setVerifyPwd(true)
                                setPassword("")
                            }}
                        >
                            비밀번호 변경
                        </Button>
                    </ButtonWrapper>
                </Wrapper>
            </Container>
        </>
    )
}

export default EditPassword

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
