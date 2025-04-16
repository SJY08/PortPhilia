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
import EditProjectModal from "../components/write/project/editModal"

function Write() {
    const [name, setName] = useState<string>("")
    const [birth, setBirth] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [edu, setEdu] = useState<string>("")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [short, setShort] = useState<string>("")
    const [intro, setIntro] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [license, setLicense] = useState<string[]>([])
    const [add, setAdd] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
        null
    )

    const selectHandler = (project: ProjectType) => {
        setSelectedProject(project)
        console.log(selectedProject)
        setEdit(true)
    }

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const token = tempCookie.getAccessToken()
                console.log("현재 Access Token:", token)
                const portfolio: Portfolio =
                    await PortfolioService.getPortfolio()
                const project = await ProjectsService.getProjects()

                setName(portfolio.name)
                setBirth(portfolio.birth_date || "")
                setPhone(portfolio.phone_number || "")
                setEmail(portfolio.email || "")
                setEdu(portfolio.education || "")
                setShort(portfolio.short_intro || "")
                setIntro(portfolio.bio || "")
                setSkills(portfolio.tech_stack || [])
                setLicense(portfolio.certifications || [])
                setProjects(project)

                if (portfolio.profile_image_url) {
                    const fullUrl = `http://localhost:3000${portfolio.profile_image_url}`
                    setImagePreview(fullUrl)
                }

                console.log("📂 Portfolio:", portfolio)
                console.log(project)
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

    const handleFileChange = (file: File) => {
        setImageFile(file)

        const objectUrl = URL.createObjectURL(file)
        setImagePreview(objectUrl)
    }

    const refresh = async () => {
        const data = await ProjectsService.getProjects()
        setProjects(data)
    }

    useEffect(() => {
        refresh()
    }, [])

    const handleKeyDown = useCallback(
        async (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                event.preventDefault()

                const formData = new FormData()
                formData.append("name", name)
                formData.append("birth_date", birth)
                formData.append("phone_number", phone)
                formData.append("email", email)
                formData.append("education", edu)
                formData.append("short_intro", short)
                formData.append("bio", intro)
                formData.append("tech_stack", JSON.stringify(skills))
                formData.append("certifications", JSON.stringify(license))

                if (imageFile) {
                    formData.append("profile_image", imageFile)
                }

                try {
                    const status = await PortfolioService.updatePortfolio(
                        formData
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
        [
            name,
            birth,
            phone,
            email,
            edu,
            short,
            intro,
            skills,
            license,
            imageFile,
        ]
    )

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
            {edit && selectedProject && (
                <EditProjectModal
                    project_prop={selectedProject}
                    setFunc={setEdit}
                    refresh={refresh}
                />
            )}
            <Background>
                <Container>
                    <ProfileContainer>
                        <ProfileImage
                            preview={imagePreview}
                            onFileChange={handleFileChange}
                        />
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
                    {projects.length > 0 &&
                        projects.map((project, index) => (
                            <Project
                                key={project.id || index}
                                title={project.title}
                                explain={project.description}
                                i_do={project.i_do}
                                skill={project.tech_stack}
                                onClick={() => selectHandler(project)}
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
