import { useState } from "react"
import styled from "styled-components"
import Inform from "../components/write/profile/inform"
import ProfileImage from "../components/write/profile/image"
import SideBar from "../components/common/sidebar"
import Introduce from "../components/write/profile/introduce"
import TagInput from "../components/write/tag/tagInput"
import Project from "../components/write/project/project"
import AddProject from "../components/write/project/add"
import AddProjectModal from "../components/write/project/addModal"

interface project {
    title: string
    explain: string
    skill: string[]
    i_do: string
}

function Write() {
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

    const [dummy, setDummy] = useState<project[]>([
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
                    {dummy &&
                        dummy.map((v, i) => (
                            <Project
                                key={i}
                                title={v.title}
                                explain={v.explain}
                                i_do={v.i_do}
                                skill={v.skill}
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
