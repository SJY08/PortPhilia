import type React from "react"
import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../../common/input"
import TagInput from "../../write/tag/tagInput"
import styled from "styled-components"
import type { ProjectType } from "../../../apis/project/type"
import ProjectsService from "../../../apis/project"

interface Props {
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    project_prop: ProjectType
    refresh?: () => void
    onSuccess?: (updatedProject: ProjectType) => void
    onDelete?: (deletedProjectId: string | number) => void
}

function EditProjectModal({
    setFunc,
    project_prop,
    refresh,
    onSuccess,
    onDelete,
}: Props) {
    const [project, setProject] = useState<ProjectType>(project_prop)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const updateTechStack: React.Dispatch<React.SetStateAction<string[]>> = (
        action
    ) => {
        setProject((prevProject) => ({
            ...prevProject,
            tech_stack:
                typeof action === "function"
                    ? action(prevProject.tech_stack)
                    : action,
        }))
    }

    const submitHandler = async () => {
        const update = {
            title: project.title,
            description: project.description,
            tech_stack: project.tech_stack,
            i_do: project.i_do,
        }

        try {
            setIsLoading(true)
            const result = await ProjectsService.updateProject(
                project_prop.id,
                update
            )

            if (
                (result.status === 200 || result.status === 201) &&
                result.data
            ) {
                alert("프로젝트가 성공적으로 수정되었습니다.")
                setFunc(false)

                if (onSuccess) {
                    onSuccess(result.data)
                } else if (refresh) {
                    refresh()
                }
            } else {
                alert("수정에 실패했습니다.")
            }
        } catch (e) {
            alert("수정에 실패했습니다")
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteHandler = async () => {
        const confirmDelete = window.confirm(
            "정말로 이 프로젝트를 삭제하시겠습니까?"
        )
        if (!confirmDelete) return

        try {
            setIsDeleting(true)
            const result = await ProjectsService.deleteProject(project_prop.id)

            if (result === 200 || result === 201) {
                alert("프로젝트가 성공적으로 삭제되었습니다.")
                setFunc(false)

                if (onDelete) {
                    onDelete(project_prop.id)
                } else if (refresh) {
                    refresh()
                }
            } else {
                alert("삭제에 실패했습니다.")
            }
        } catch (e) {
            alert("삭제에 실패했습니다")
            console.log(e)
        } finally {
            setIsDeleting(false)
        }
    }

    useEffect(() => {
        if (project_prop) {
            setProject({ ...project_prop })
        }
    }, [project_prop])

    const handleClose = () => {
        if (isLoading || isDeleting) return
        setFunc(false)
    }

    const isDisabled = isLoading || isDeleting

    return (
        <Modal
            onHide={handleClose}
            show={true}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>프로젝트 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Input
                        label="프로젝트명"
                        value={project.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProject({
                                ...project,
                                title: e.target.value,
                            })
                        }
                        disabled={isDisabled}
                    />
                    <Input
                        label="프로젝트소개"
                        input="textarea"
                        value={project.description}
                        onTextAreaChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) =>
                            setProject({
                                ...project,
                                description: e.target.value,
                            })
                        }
                        disabled={isDisabled}
                    />
                    <TagInput
                        label="사용 기술"
                        setTags={updateTechStack}
                        tags={project.tech_stack}
                        disabled={isDisabled}
                    />
                    <Input
                        label="내가 한 일"
                        input="textarea"
                        value={project.i_do}
                        onTextAreaChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) =>
                            setProject({
                                ...project,
                                i_do: e.target.value,
                            })
                        }
                        disabled={isDisabled}
                    />

                    <Button
                        variant="danger"
                        style={{
                            marginLeft: "auto",
                            marginTop: "20px",
                            width: "100px",
                        }}
                        onClick={deleteHandler}
                        disabled={isDisabled}
                    >
                        {isDeleting ? "삭제 중..." : "삭제하기"}
                    </Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={isDisabled}
                >
                    닫기
                </Button>

                <Button
                    variant="primary"
                    onClick={submitHandler}
                    disabled={isDisabled}
                >
                    {isLoading ? "수정 중..." : "수정하기"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProjectModal

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
