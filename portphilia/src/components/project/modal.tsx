import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../common/input"
import TagInput from "../tag/tagInput"
import styled from "styled-components"

interface props {
    show: boolean
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
}

function ProjectModal({ show, setFunc }: props) {
    const [skill, setSkill] = useState<string[]>([])

    return (
        <>
            <Modal
                show={show}
                onHide={() => setFunc(false)}
                backdrop="static"
                keyboard={false}
                centered // 모달을 화면 중앙에 배치
            >
                <Modal.Header closeButton>
                    <Modal.Title>프로젝트</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Input label="프로젝트명" />
                        <Input label="프로젝트소개" input="textarea" />
                        <TagInput
                            label="사용 기술"
                            setTags={setSkill}
                            tags={skill}
                        />
                        <Input label="내가 한 일" input="textarea" />
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFunc(false)}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectModal

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
