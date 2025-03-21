import React, { useState, useEffect, ReactNode, ReactElement } from "react"
import styled from "styled-components"
import ReactDOMServer from "react-dom/server"
import { color } from "../styles/colors"
import ProfileImage from "../components/profile/image"
import Inform from "../components/profile/inform"
import Introduce from "../components/profile/introduce"
import TagInput from "../components/tag/tagInput"
import AddProject from "../components/project/add"
import ProjectModal from "../components/project/modal"
import Project from "../components/project/project"

function Write() {
    const [license, setLicense] = useState<string[]>([])
    const [skill, setSkill] = useState<string[]>([])
    const [show, setShow] = useState<boolean>(false)
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
        {
            title: "project3",
            explain: "another project",
            skill: ["react", "express"],
            i_do: "backend",
        },
        {
            title: "project4",
            explain: "awesome work",
            skill: ["angular", "firebase"],
            i_do: "frontend",
        },
        {
            title: "project5",
            explain: "new startup",
            skill: ["vue", "node.js"],
            i_do: "fullstack",
        },
    ]

    const measureElementHeight = (element: ReactNode): number => {
        const tempContainer = document.createElement("div")
        document.body.appendChild(tempContainer)

        Object.assign(tempContainer.style, {
            width: "680px", // 🔥 padding 제외한 실제 콘텐츠 영역 기준
            position: "absolute",
            visibility: "hidden",
            display: "block",
        })

        const wrapper = document.createElement("div")
        tempContainer.appendChild(wrapper)

        if (React.isValidElement(element)) {
            const reactElement = element as ReactElement<any>
            wrapper.innerHTML = ReactDOMServer.renderToString(reactElement)
        }

        const height = wrapper.scrollHeight || 200
        document.body.removeChild(tempContainer)
        return height
    }

    useEffect(() => {
        const generatePages = () => {
            let currentPage: React.ReactNode[] = []
            let newPages: React.ReactNode[][] = []
            let currentHeight = 0
            const maxPageHeight = 1100 - 160 // 🔥 padding 제외한 실제 콘텐츠 영역 높이

            const elements = [
                <>
                    <ProfileWrapper>
                        <ProfileImage />
                        <Inform />
                    </ProfileWrapper>
                    <Introduce />
                </>,
                <TagContainer key="tag-skill">
                    <TagInput
                        label="기술스택"
                        tags={skill}
                        setTags={setSkill}
                    />
                </TagContainer>,
                <TagContainer key="tag-license">
                    <TagInput
                        label="자격증"
                        tags={license}
                        setTags={setLicense}
                    />
                </TagContainer>,
                <AddProject onClick={() => setShow(true)} />,
                ...dummy.map((project, index) => (
                    <Project key={index} {...project} />
                )),
            ]

            elements.forEach((element) => {
                const elementHeight = measureElementHeight(element) || 250

                if (elementHeight > maxPageHeight) {
                    newPages.push([...currentPage])
                    newPages.push([element])
                    currentPage = []
                    currentHeight = 0
                } else if (currentHeight + elementHeight > maxPageHeight) {
                    newPages.push([...currentPage])
                    currentPage = [element]
                    currentHeight = elementHeight
                } else {
                    currentPage.push(element)
                    currentHeight += elementHeight
                }
            })

            if (currentPage.length > 0) {
                newPages.push(currentPage)
            }

            setPages(newPages)
        }

        const timer = setTimeout(() => {
            generatePages()
        }, 200)

        return () => clearTimeout(timer)
    }, [dummy, skill, license])

    return (
        <>
            {show && <ProjectModal setFunc={setShow} show={show} />}
            <Background>
                {pages.map((page, index) => (
                    <Container key={index}>{page}</Container>
                ))}
            </Background>
        </>
    )
}

export default Write

// 스타일 컴포넌트
const Background = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 40px;
    padding-top: 40px;
`

const Container = styled.div`
    width: 840px;
    height: 1188px;
    background: white;
    box-shadow: 0px 0px 20px #00000020;
    box-sizing: border-box;
    padding: 80px; // 🔥 padding을 포함한 전체 높이
    display: flex;
    flex-direction: column;
    gap: 30px;
    page-break-after: always;
    border-radius: 20px;
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
