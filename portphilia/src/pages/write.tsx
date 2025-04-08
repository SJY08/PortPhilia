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
import { Portfolio } from "../apis/portfolio/type"
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

    // 컴포넌트 마운트 시 포트폴리오 데이터를 API로부터 가져와 상태 업데이트
    useEffect(() => {
        async function fetchPortfolio() {
            try {
                // Access Token 존재 여부 확인 (로그인 상태일 경우)
                const token = tempCookie.getAccessToken()
                console.log("현재 Access Token:", token)

                // PortfolioService를 통해 포트폴리오 정보 가져오기
                const portfolio: Portfolio =
                    await PortfolioService.getPortfolio()

                // 가져온 데이터를 각 상태에 매핑
                setName(portfolio.username) // 필요에 따라 포트폴리오의 필드명을 변경하세요.
                setEdu(portfolio.education || "")
                setShort(portfolio.short_intro || "")
                setIntro(portfolio.bio || "")
                setSkills(portfolio.tech_stack || [])
                setLicense(portfolio.certifications || [])
                if (portfolio.profile_image_url) {
                    setImage(portfolio.profile_image_url)
                }
            } catch (error) {
                console.error("포트폴리오 가져오기 실패", error)
            }
        }
        fetchPortfolio()
    }, [])

    // 컴포넌트 마운트 시 프로젝트 목록을 API로부터 가져와 상태 업데이트
    useEffect(() => {
        async function fetchProjects() {
            try {
                // ProjectsService를 통해 프로젝트 목록 가져오기
                const projectsData = await ProjectsService.getProjects()
                setProjects(projectsData)
            } catch (error) {
                console.error("프로젝트 가져오기 실패", error)
            }
        }
        fetchProjects()
    }, [])

    // ctrl + s 이벤트 핸들러: 포트폴리오 업데이트
    const handleKeyDown = useCallback(
        async (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                event.preventDefault() // 기본 저장 동작 방지
                const portfolioData: Portfolio = {
                    id: 0, // 서버에서 id 처리는 다르게 이루어질 수 있으므로 필요에 따라 수정하세요.
                    username: name,
                    password: "", // 비밀번호 업데이트는 별도 고려
                    name: name,
                    birth_date: birth ? new Date(birth) : undefined,
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
