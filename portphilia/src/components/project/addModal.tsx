import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../common/input"
import TagInput from "../tag/tagInput"
import styled from "styled-components"

interface props {
    show: boolean
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    onClick?: () => void
}

function AddProjectModal({ show, setFunc, onClick }: props) {
    const [skills, setSkills] = useState<string[]>([])
    const [title1, setTitle] = useState<string>("")
    const [explain1, setExplain] = useState<string>("")
    const [iDo, setIDo] = useState<string>("")

    return (
        <>
            <Modal
                show={show}
                onHide={() => setFunc(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>프로젝트</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Input
                            label="프로젝트명"
                            value={title1}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                            label="프로젝트소개"
                            input="textarea"
                            value={explain1}
                            onChange={(e) => setExplain(e.target.value)}
                        />
                        <TagInput
                            label="사용 기술"
                            setTags={setSkills}
                            tags={skills}
                        />
                        <Input
                            label="내가 한 일"
                            input="textarea"
                            value={iDo}
                            onChange={(e) => setIDo(e.target.value)}
                        />
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFunc(false)}>
                        닫기
                    </Button>

                    <Button variant="primary" onClick={onClick}>
                        추가하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProjectModal

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
