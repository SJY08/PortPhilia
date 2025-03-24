import styled from "styled-components"
import ProfileImage from "../components/profile/image"
import Inform from "../components/profile/inform"
import Introduce from "../components/profile/introduce"
import TagInput from "../components/tag/tagInput"
import AddProject from "../components/project/add"
import measureElementHeight from "./height"
import Project from "../components/project/project"
import React from "react"

interface props {
    skill: string[]
    setSkill: React.Dispatch<React.SetStateAction<string[]>>
    license: string[]
    setLicense: React.Dispatch<React.SetStateAction<string[]>>
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    setPages: React.Dispatch<React.SetStateAction<React.ReactNode[][]>>
    datas: project[]
}

interface project {
    title: string
    explain: string
    skill: string[]
    i_do: string
}

const generatePages = ({
    skill,
    setSkill,
    license,
    setLicense,
    setShow,
    setPages,
    datas,
}: props) => {
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
            <TagInput label="기술스택" tags={skill} setTags={setSkill} />
        </TagContainer>,
        <TagContainer key="tag-license">
            <TagInput label="자격증" tags={license} setTags={setLicense} />
        </TagContainer>,
        <AddProject onClick={() => setShow(true)} />,
        ...datas.map((project, index) => <Project key={index} {...project} />),
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

export default generatePages

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
