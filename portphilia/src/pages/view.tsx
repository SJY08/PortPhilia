import styled from "styled-components"
import SideBar from "../components/common/sidebar"
import Page from "../components/view/page"
import { color } from "../styles/colors"
import { useState, useEffect } from "react"
import generatePages from "../utils/view/generatePages"
import exportToPDF from "../utils/savePDF"

interface Project {
    title: string
    explain: string
    skill: string[]
    i_do: string
}

interface ProfileData {
    image: string | null
    name: string
    birth: string
    phone: string
    email: string
    edu: string
}

function View() {
    const [license, setLicense] = useState<string[]>(["정보처리기능사"])
    const [skill, setSkill] = useState<string[]>([
        "react",
        "next.js",
        "typescript",
        "react-query",
        "axios",
        "styled-components",
        "tailwindcss",
        "bootstrap",
    ])
    const [pages, setPages] = useState<React.ReactNode[][]>([])
    const [text, setText] =
        useState<string>(`스스로의 성장을 위해 계속 알아나가려 노력하는 **프론트엔드 개발자, 서지유** 입니다.
- 대덕소프트웨어마이스터고등학교에 재학 중이며, 프론트엔드 개발자가 되기 위해 공부 중입니다.
- 실습 활동을 통해 항상 새로운 것에 도전하려 노력합니다.
- 원하는 기능 구현을 위해 자료를 찾아보고, 코드에 대해 이해를 하는 것에 재미를 느낍니다.`)

    const [intro, setIntro] = useState<string>(
        "노력하고 성장하며 공부하는 프론트엔드 개발자입니다."
    )

    const [dummy, setDummy] = useState<Project[]>([
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
    ])

    const profileData: ProfileData = {
        image: null,
        name: "서지유",
        birth: "2000-01-01",
        phone: "010-0000-0000",
        email: "example@example.com",
        edu: "대덕소프트웨어마이스터고등학교",
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            generatePages({
                skill,
                license,
                setPages,
                datas: dummy,
                text,
                profileData,
                intro,
            })
        }, 200)

        return () => clearTimeout(timer)
    }, [skill, license, dummy, text, profileData]) // pages 제거

    return (
        <>
            <SideBar onClick={exportToPDF} />
            <Container>
                {pages.map((page, idx) => (
                    <Page key={idx} className="pdf-page">
                        {page}
                    </Page>
                ))}
            </Container>
        </>
    )
}

export default View

const Container = styled.div`
    padding: 40px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    background-color: ${color.blue[50]};
`
