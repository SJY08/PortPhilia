import styled from "styled-components"
import SideBar from "../components/common/sidebar"
import Page from "../components/view/page"
import { color } from "../styles/colors"
import { useState, useEffect } from "react"
import generatePages from "../utils/view/generatePages"
import exportToPDF from "../utils/savePDF"
import PortfolioService from "../apis/portfolio"
import ProjectsService from "../apis/project"
import { ProjectType } from "../apis/project/type"
import Header from "../components/common/header"

export interface ProfileData {
    image: string | null
    name: string
    birth: string
    phone: string
    email: string
    edu: string
}

function View() {
    const [license, setLicense] = useState<string[]>([])
    const [skill, setSkill] = useState<string[]>([])
    const [pages, setPages] = useState<React.ReactNode[][]>([])
    const [text, setText] = useState<string>("")
    const [intro, setIntro] = useState<string>("")

    const [projects, setProjects] = useState<ProjectType[]>([])

    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const portfolio = await PortfolioService.getPortfolio()
                const project = await ProjectsService.getProjects()
                const newProfileData: ProfileData = {
                    image: portfolio.profile_image_url
                        ? portfolio.profile_image_url.startsWith("http")
                            ? portfolio.profile_image_url
                            : `http://localhost:3000${portfolio.profile_image_url}`
                        : null,
                    name: portfolio.name,
                    birth: portfolio.birth_date || "",
                    phone: portfolio.phone_number || "",
                    email: portfolio.email || "",
                    edu: portfolio.education || "",
                }
                setProfileData(newProfileData)
                setIntro(portfolio.short_intro || "")
                setText(portfolio.bio || "")
                setProjects(project)
                setSkill(portfolio.tech_stack || [])
                setLicense(portfolio.certifications || [])
            } catch (error) {
                console.error("포트폴리오 가져오기 실패", error)
            }
        }
        fetchPortfolio()
    }, [])

    useEffect(() => {
        async function fetchProjects() {
            try {
            } catch (error) {
                console.error("프로젝트 가져오기 실패", error)
            }
        }
        fetchProjects()
    }, [])

    useEffect(() => {
        if (profileData) {
            generatePages({
                skill,
                license,
                setPages,
                datas: projects,
                text,
                profileData,
                intro,
            })
        }
    }, [skill, license, projects, text, profileData, intro])

    return (
        <>
            <Header />
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
