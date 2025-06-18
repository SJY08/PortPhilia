import type React from "react"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../../common/input"
import TagInput from "../../write/tag/tagInput"
import styled from "styled-components"
import ProjectsService from "../../../apis/project"
import type { ProjectType } from "../../../apis/project/type"

interface Props {
    show: boolean
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: (newProject: ProjectType) => void
}

function AddProjectModal({ show, setFunc, onSuccess }: Props) {
    const [skills, setSkills] = useState<string[]>([])
    const [title, setTitle] = useState<string>("")
    const [explain, setExplain] = useState<string>("")
    const [iDo, setIDo] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleAddProject = async () => {
        try {
            if (title && skills.length && explain && iDo) {
                setIsLoading(true)

                const projectData = {
                    title,
                    description: explain,
                    tech_stack: skills,
                    i_do: iDo,
                }

                const response = await ProjectsService.addProject(projectData)

                if (
                    (response.status === 201 || response.status === 200) &&
                    response.data
                ) {
                    alert("프로젝트가 성공적으로 추가되었습니다.")

                    // 폼 초기화
                    setTitle("")
                    setExplain("")
                    setIDo("")
                    setSkills([])

                    setFunc(false)
                    onSuccess && onSuccess(response.data)
                } else {
                    alert("프로젝트 추가에 실패했습니다.")
                }
            } else {
                alert("모든 항목을 입력해 주세요.")
            }
        } catch (e) {
            console.error(e)
            alert("프로젝트 추가 중 오류가 발생했습니다.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        // 모달 닫을 때 폼 초기화
        setTitle("")
        setExplain("")
        setIDo("")
        setSkills([])
        setFunc(false)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
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
                        onTextAreaChange={(e) => setExplain(e.target.value)}
                    />
                    <Input
                        label="내 역할"
                        value={iDo}
                        input="textarea"
                        onTextAreaChange={(e) => setIDo(e.target.value)}
                    />
                    <TagInput
                        label="사용 기술"
                        setTags={setSkills}
                        tags={skills}
                    />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={isLoading}
                >
                    닫기
                </Button>
                <Button
                    variant="primary"
                    onClick={handleAddProject}
                    disabled={isLoading}
                >
                    {isLoading ? "추가 중..." : "추가하기"}
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
