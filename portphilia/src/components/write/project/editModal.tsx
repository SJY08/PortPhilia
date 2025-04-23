import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../../common/input"
import TagInput from "../../write/tag/tagInput"
import styled from "styled-components"
import { ProjectType } from "../../../apis/project/type"
import ProjectsService from "../../../apis/project"

interface props {
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    project_prop: ProjectType
    refresh: () => void
}

function EditProjectModal({ setFunc, project_prop, refresh }: props) {
    const [project, setProject] = useState<ProjectType>(project_prop)

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
            const result = await ProjectsService.updateProject(
                project_prop.id,
                update
            )
            if (result == 200 || result == 201) {
                refresh()
                setFunc(false)
            }
        } catch (e) {
            alert("수정에 실패했습니다")
            console.log(e)
        }
    }

    const deleteHandler = async () => {
        try {
            const result = await ProjectsService.deleteProject(project_prop.id)
            if (result == 200 || result == 201) {
                refresh()
                setFunc(false)
            }
        } catch (e) {
            alert("삭제에 실패했습니다")
            console.log(e)
        }
    }

    useEffect(() => {
        if (project_prop) {
            setProject({ ...project_prop })
        }
    }, [project_prop])

    return (
        <>
            <Modal
                onHide={() => setFunc(false)}
                show={true}
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
                            value={project.title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                setProject({
                                    ...project,
                                    title: e.target.value,
                                })
                            }
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
                        />
                        <TagInput
                            label="사용 기술"
                            setTags={updateTechStack}
                            tags={project.tech_stack}
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
                        />

                        <Button
                            variant="danger"
                            style={{
                                marginLeft: "auto",
                                marginTop: "20px",
                                width: "100px",
                            }}
                            onClick={deleteHandler}
                        >
                            삭제하기
                        </Button>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFunc(false)}>
                        닫기
                    </Button>

                    <Button variant="primary" onClick={submitHandler}>
                        수정하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProjectModal

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
