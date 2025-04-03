import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../../common/input"
import TagInput from "../../write/tag/tagInput"
import styled from "styled-components"
import ProjectService from "../../../apis/project"

interface Props {
    show: boolean
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void // 프로젝트 추가 성공 시 실행될 콜백
}

function AddProjectModal({ show, setFunc, onSuccess }: Props) {
    const [skills, setSkills] = useState<string[]>([])
    const [title, setTitle] = useState<string>("")
    const [explain, setExplain] = useState<string>("")
    const [link, setLink] = useState<string>("")

    const handleAddProject = async () => {
        try {
            if (title && skills && explain && link) {
                const projectData = {
                    title,
                    description: explain,
                    link,
                    tech_stack: skills,
                }

                const status = await ProjectService.addProject(projectData)
                if (status === 201 || status == 200) {
                    alert("프로젝트가 성공적으로 추가되었습니다.")
                    setFunc(false)
                    onSuccess && onSuccess()
                } else {
                    alert("프로젝트 추가에 실패했습니다.")
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        label="프로젝트소개"
                        input="textarea"
                        value={explain}
                        onChange={(e) => setExplain(e.target.value)}
                    />
                    <Input
                        label="프로젝트 링크"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <TagInput
                        label="사용 기술"
                        setTags={setSkills}
                        tags={skills}
                    />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setFunc(false)}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleAddProject}>
                    추가하기
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddProjectModal

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
