import styled from "styled-components"
import Profile from "../components/mypage/Profile"
import ButtonContainer from "../components/mypage/ButtonContainer"
import { Button, Modal } from "react-bootstrap"
import { useState } from "react"
import Input from "../components/common/input"
import AuthService from "../apis/auth"

function Mypage() {
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
                <Profile />

                <ButtonContainer title="비밀번호" explain="비밀번호 변경">
                    <Button
                        onClick={() => {
                            setModal(true)
                            setPassword("")
                        }}
                    >
                        비밀번호 변경
                    </Button>
                </ButtonContainer>
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
