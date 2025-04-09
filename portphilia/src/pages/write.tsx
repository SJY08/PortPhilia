// Write.tsx
import { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import Inform from "../components/write/profile/inform"
import ProfileImage from "../components/write/profile/image"
import SideBar from "../components/common/sidebar"
import Introduce from "../components/write/profile/introduce"
import TagInput from "../components/write/tag/tagInput"
import Project from "../components/write/project/project"
import AddProject from "../components/write/project/add"
import AddProjectModal from "../components/write/project/addModal"
import PortfolioService from "../apis/portfolio"
import { Portfolio, UpdatePortfolio } from "../apis/portfolio/type"
import ProjectsService from "../apis/project"
import { ProjectType } from "../apis/project/type"
import { tempCookie } from "../utils/tempCookie"

function Write() {
    // 포트폴리오 관련 상태
    const [name, setName] = useState<string>("")
    const [birth, setBirth] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [edu, setEdu] = useState<string>("")
    const [image, setImage] = useState<string | null>(null)
    const [short, setShort] = useState<string>("")
    const [intro, setIntro] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [license, setLicense] = useState<string[]>([])
    const [add, setAdd] = useState<boolean>(false)

    // 프로젝트 관련 상태
    const [projects, setProjects] = useState<ProjectType[]>([])

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const token = tempCookie.getAccessToken()
                console.log("현재 Access Token:", token)
                const portfolio: Portfolio =
                    await PortfolioService.getPortfolio()
                // 기존에 portfolio.username을 사용하고 있었다면,
                // 실제 사용자 이름이 저장되는 필드는 portfolio.name입니다.
                setName(portfolio.name) // 올바른 필드 사용
                setBirth(portfolio.birth_date || "")
                setPhone(portfolio.phone_number || "")
                setEmail(portfolio.email || "")
                setEdu(portfolio.education || "")
                setShort(portfolio.short_intro || "")
                setIntro(portfolio.bio || "")
                setSkills(portfolio.tech_stack || [])
                setLicense(portfolio.certifications || [])
                if (portfolio.profile_image_url) {
                    setImage(portfolio.profile_image_url)
                }
                console.log(portfolio)
            } catch (error) {
                console.error("포트폴리오 가져오기 실패", error)
            }
        }
        fetchPortfolio()
    }, [])

    useEffect(() => {
        async function fetchProjects() {
            try {
                const projectsData = await ProjectsService.getProjects()
                setProjects(projectsData)
            } catch (error) {
                console.error("프로젝트 가져오기 실패", error)
            }
        }
        fetchProjects()
    }, [])

    const handleKeyDown = useCallback(
        async (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                event.preventDefault()
                // id와 password를 제외한 업데이트 데이터 구성
                const portfolioData: UpdatePortfolio = {
                    // username 필드는 업데이트 대상이 아니라면 생략해도 됩니다.
                    // 만약 username도 업데이트 대상이면 포함하세요.
                    username: name,
                    name: name,
                    birth_date: birth,
                    phone_number: phone,
                    email: email,
                    education: edu,
                    short_intro: short,
                    bio: intro,
                    tech_stack: skills,
                    certifications: license,
                    profile_image_url: image || undefined,
                }
                try {
                    const status = await PortfolioService.updatePortfolio(
                        portfolioData
                    )
                    if (status === 200 || status === 201) {
                        alert("저장되었습니다.")
                    } else {
                        alert("저장에 실패하였습니다.")
                    }
                } catch (error) {
                    console.error("저장 에러", error)
                    alert("저장 중 오류가 발생하였습니다.")
                }
            }
        },
        [name, birth, phone, email, edu, short, intro, skills, license, image]
    )

    // 전역 키 이벤트 리스너 등록
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])

    return (
        <>
            <SideBar />
            {add && <AddProjectModal show={add} setFunc={setAdd} />}
            <Background>
                <Container>
                    <ProfileContainer>
                        <ProfileImage image={image} setImage={setImage} />
                        <Inform
                            name={name}
                            setName={setName}
                            birth={birth}
                            setBirth={setBirth}
                            phone={phone}
                            setPhone={setPhone}
                            email={email}
                            setEmail={setEmail}
                            edu={edu}
                            setEdu={setEdu}
                        />
                    </ProfileContainer>
                    <Introduce
                        short={short}
                        setShort={setShort}
                        intro={intro}
                        setIntro={setIntro}
                    />
                    <TagInput
                        label="사용기술"
                        tags={skills}
                        setTags={setSkills}
                    />
                    <TagInput
                        label="자격증"
                        tags={license}
                        setTags={setLicense}
                    />
                    <AddProject onClick={() => setAdd(true)} />
                    {/* 서버에서 불러온 프로젝트 목록 렌더링 */}
                    {projects.length > 0 &&
                        projects.map((project, index) => (
                            <Project
                                key={project.id || index}
                                title={project.title}
                                explain={project.description}
                                i_do={project.i_do}
                                skill={project.tech_stack}
                            />
                        ))}
                </Container>
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
    background-color: white;
`

const Container = styled.div`
    width: 840px;
    min-height: 100vh;
    background: white;
    box-shadow: 0px 0px 20px #00000020;
    box-sizing: border-box;
    padding: 80px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    page-break-after: always;
    border-radius: 20px;
`

const ProfileContainer = styled.div`
    display: flex;
`
