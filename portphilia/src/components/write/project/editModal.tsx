import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Input from "../../common/input"
import TagInput from "../../write/tag/tagInput"
import styled from "styled-components"

interface project {
    title: string
    explain: string
    skill: string[]
    i_do: string
}

interface props {
    show: boolean
    setFunc: React.Dispatch<
        React.SetStateAction<{
            show: boolean
            data: project | null
        }>
    >
    title: string
    explain: string
    skill: string[]
    i_do: string
    onClick?: (updatedData: project) => void
}

function EditProjectModal({
    show,
    setFunc,
    title,
    explain,
    skill,
    i_do,
    onClick,
}: props) {
    const [skills, setSkills] = useState<string[]>(skill)
    const [title1, setTitle] = useState<string>(title)
    const [explain1, setExplain] = useState<string>(explain)
    const [iDo, setIDo] = useState<string>(i_do)

    useEffect(() => {
        if (show) {
            setData(skill, title, explain, i_do)
        }
        console.log(skills, title1, explain1, iDo)
    }, [show])

    function setData(
        skill: string[] = [],
        title: string = "",
        explain: string = "",
        i_do: string = ""
    ) {
        setSkills(skill || [])
        setTitle(title || "")
        setExplain(explain || "")
        setIDo(i_do || "")
    }

    const handleSave = () => {
        const updatedData: project = {
            title: title1,
            explain: explain1,
            skill: skills,
            i_do: iDo,
        }
        if (onClick) {
            onClick(updatedData)
        }
        setFunc({ show: false, data: updatedData })
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => setFunc({ show: false, data: null })}
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
                    <Button
                        variant="secondary"
                        onClick={() => setFunc({ show: false, data: null })}
                    >
                        닫기
                    </Button>

                    <Button variant="primary" onClick={handleSave}>
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
