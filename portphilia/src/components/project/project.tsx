import styled from "styled-components"
import { color } from "../../styles/colors"

interface props {
    title: string
    explain: string
    skill: string[]
    i_do: string
}

function Project({ title, explain, skill, i_do }: props) {
    return (
        <>
            <Container>
                <SetButton>수정</SetButton>
                <Title>{title}</Title>
                <TextTitle>사용 기술</TextTitle>
                <SkillsWrapper>
                    {skill.map((v, i) => (
                        <Skill key={i}>{v}</Skill>
                    ))}
                </SkillsWrapper>
                <Hr />
                <TextTitle>프로젝트 소개</TextTitle>
                <Explain>{explain}</Explain>
                <Hr />
                <TextTitle>내가 한 일</TextTitle>
                <Explain>{i_do}</Explain>
            </Container>
        </>
    )
}

export default Project

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 12px;
    background-color: white;
    border: 1px solid ${color.gray[400]};
    padding: 10px;
    box-shadow: 0 0 5px #00000040;
    position: relative;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: bolder;
`

const Explain = styled.p`
    font-size: 18px;
`

const SkillsWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
`

const Skill = styled.p`
    font-size: 14px;
    padding: 2px 4px;
    background-color: ${color.gray[100]};
    border-radius: 8px;
`

const TextTitle = styled.h2`
    font-size: 16px;
    font-weight: bold;
`

const Hr = styled.hr`
    margin: 0 0 10px 0;
    padding: 0;
    width: 100%;
`

const SetButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 2px 8px;
    border: none;
    border-radius: 4px;
    background-color: ${color.gray[200]};
`
