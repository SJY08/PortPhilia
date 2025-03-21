import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { color } from "../styles/colors"
import ProfileImage from "../components/profile/image"
import Inform from "../components/profile/inform"
import Introdue from "../components/profile/introduce"
import TagInput from "../components/tag/tagInput"
import AddProject from "../components/project/add"
import ProjectModal from "../components/project/modal"
import Project from "../components/project/project"

function Write() {
    const [license, setLicense] = useState<string[]>([])
    const [skill, setSkill] = useState<string[]>([])
    const [show, setShow] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [pages, setPages] = useState<React.ReactNode[][]>([])

    const dummy = [
        {
            title: "portphilia",
            explain: "it's a service to help writing portfolio for developers",
            skill: ["node.js", "react", "typescript", "figma"],
            i_do: "design, publishing, api linking",
        },
        {
            title: "diaream",
            explain: "it's a sleeping diary",
            skill: ["node.js", "next.js", "typescript", "figma", "axios"],
            i_do: "design, publishing, api linking, server",
        },
    ]

    useEffect(() => {
        const maxHeight = 1188 - 80 * 2 - 30 * 3
        let currentPage: React.ReactNode[] = []
        let currentHeight = 0
        const newPages: React.ReactNode[][] = []

        dummy.forEach((project, index) => {
            const projectElement = <Project key={index} {...project} />
            const estimatedHeight = 200

            if (currentHeight + estimatedHeight > maxHeight) {
                newPages.push(currentPage)
                currentPage = []
                currentHeight = 0
            }

            currentPage.push(projectElement)
            currentHeight += estimatedHeight
        })

        if (currentPage.length) newPages.push(currentPage)
        setPages(newPages)
    }, [])

    return (
        <>
            {show && <ProjectModal setFunc={setShow} show={show} />}

            <Background>
                <Container ref={containerRef}>
                    <ProfileWrapper>
                        <ProfileImage />
                        <Inform />
                    </ProfileWrapper>
                    <Introdue />
                    <TagContainer>
                        <TagInput
                            label="기술스택"
                            tags={skill}
                            setTags={setSkill}
                        />
                        <TagInput
                            label="자격증"
                            tags={license}
                            setTags={setLicense}
                        />
                    </TagContainer>
                    <AddProject onClick={() => setShow(true)} />
                </Container>
                {pages.map((page, index) => (
                    <Container key={index}>{page}</Container>
                ))}
            </Background>
        </>
    )
}

export default Write

const Background = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 40px;
    padding-top: 40px;
    background: ${color.blue[50]};
`

const Container = styled.div`
    width: 840px;
    min-height: 1188px;
    background: white;
    box-shadow: 0px 0px 10px ${color.gray[200]};
    box-sizing: border-box;
    padding: 80px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    page-break-after: always;
`

const ProfileWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TagContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
