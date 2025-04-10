// generatePages.tsx
import measureElementHeight from "./height"
import React from "react"
import Profile from "../../components/view/profile/profile"
import ShortIntro from "../../components/view/profile/shortIntro"
import Introduce from "../../components/view/profile/Intorduce"
import TagContainer from "../../components/view/tag/tagContainer"
import styled from "styled-components"
import Project from "../../components/view/project/project"
import { color } from "../../styles/colors"

// 프로필 데이터 인터페이스
export interface ProfileData {
    image: string | null
    name: string
    birth: string
    phone: string
    email: string
    edu: string
}

export interface ProjectType {
    id?: number
    title: string
    description: string
    link: string
    tech_stack: string[]
    i_do: string
}

interface Props {
    skill: string[]
    license: string[]
    setPages: React.Dispatch<React.SetStateAction<React.ReactNode[][]>>
    datas: ProjectType[]
    text: string
    profileData: ProfileData
    intro: string
}

const generatePages = ({
    skill,
    license,
    setPages,
    datas,
    text,
    profileData,
    intro,
}: Props) => {
    let currentPage: React.ReactNode[] = []
    let newPages: React.ReactNode[][] = []
    let currentHeight = 0
    const maxPageHeight = 1100 - 160

    // 렌더링할 요소들을 미리 생성합니다.
    const elements = [
        <Profile
            key="profile"
            image={profileData.image}
            name={profileData.name}
            birth={profileData.birth}
            phone={profileData.phone}
            email={profileData.email}
            edu={profileData.edu}
        />,
        <ShortIntro text={intro} key="shortIntro" />,
        <Introduce key="introduce" text={text} />,
        <TagContainer key="tag1" title="사용기술" tags={skill} />,
        <TagContainer key="tag2" title="자격증" tags={license} />,
        ...datas.map((v, i) => (
            <Wrapper key={i}>
                <Project
                    title={v.title}
                    skills={v.skill}
                    explain={v.explain}
                    i_do={v.i_do}
                />
            </Wrapper>
        )),
    ]

    // 각 요소의 높이를 측정하고 페이지 분할 로직 실행
    elements.forEach((element) => {
        const elementHeight = measureElementHeight(element) || 250
        const wrapperHeight = maxPageHeight - 40

        if (elementHeight > wrapperHeight) {
            newPages.push([...currentPage])
            newPages.push([element])
            currentPage = []
            currentHeight = 0
        } else if (currentHeight + elementHeight > wrapperHeight) {
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
    overflow: hidden;
`
