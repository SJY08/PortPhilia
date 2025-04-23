import styled from "styled-components"
import Profile from "../components/mypage/Profile"
import ButtonContainer from "../components/mypage/ButtonContainer"
import { Button, Modal } from "react-bootstrap"
import { useState } from "react"
import Input from "../components/common/input"
import AuthService from "../apis/auth"
import { useNavigate } from "react-router-dom"

function Mypage() {
    const navigate = useNavigate()
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

    const deleteUser = async () => {
        const reuslt = await AuthService.deleteUser()
        if (reuslt == 200) {
            alert("계정이 삭제되었습니다")
            navigate("/")
        } else {
            alert("계정 삭제를 실패했습니다")
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

                <Wrapper>
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

                    <ButtonContainer
                        title="계정삭제"
                        explain="계정 삭제 시 작성한 모든 정보가 삭제됩니다"
                    >
                        <Button variant="danger" onClick={deleteUser}>
                            계정삭제
                        </Button>
                    </ButtonContainer>
                </Wrapper>
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
    gap: 50px;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
`
