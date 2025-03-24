import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ProjectModal from "../components/project/modal"
import generatePages from "../utils/generatePages"

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

    useEffect(() => {
        const timer = setTimeout(() => {
            generatePages({
                skill,
                setSkill,
                license,
                setLicense,
                setShow,
                setPages,
                datas: dummy,
            })
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
