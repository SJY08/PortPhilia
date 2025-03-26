import measureElementHeight from "./height"
import React from "react"
import Profile from "../../components/view/profile/profile"
import ShortIntro from "../../components/view/profile/shortIntro"
import Introduce from "../../components/view/profile/Intorduce"
import TagContainer from "../../components/view/tag/tagContainer"
import styled from "styled-components"
import Project from "../../components/view/project/project"
import { color } from "../../styles/colors"

interface Props {
    skill: string[]
    license: string[]
    setPages: React.Dispatch<React.SetStateAction<React.ReactNode[][]>>
    datas: Project[]
    text: string
}

interface Project {
    title: string
    explain: string
    skill: string[]
    i_do: string
}

const generatePages = async ({
    skill,
    license,
    setPages,
    datas,
    text,
}: Props) => {
    let currentPage: React.ReactNode[] = []
    let newPages: React.ReactNode[][] = []
    let currentHeight = 0
    const maxPageHeight = 1100 - 160

    const elements = [
        <Profile />,
        <ShortIntro />,
        <Introduce text={text} />,
        <TagContainer title="사용기술" tags={skill} />,
        <TagContainer title="자격증" tags={license} />,
        ...datas.map((v, i) => (
            <Wrapper>
                <Project
                    key={i}
                    title={v.title}
                    skills={v.skill}
                    explain={v.explain}
                    i_do={v.i_do}
                />
            </Wrapper>
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

export default generatePages

const Wrapper = styled.div`
    background-color: ${color.blue[50]};
    border-radius: 24px;
    box-sizing: border-box;
    padding: 20px;
`
