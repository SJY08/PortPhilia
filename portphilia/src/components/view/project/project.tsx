import styled from "styled-components"
import { color } from "../../../styles/colors"
import TagContainer from "../tag/tagContainer"

interface props {
    title?: string
    skills?: string[]
    explain?: string
    i_do?: string
}

function Project({ title, skills, explain, i_do }: props) {
    return (
        <>
            <Container>
                <Title>{title}</Title>

                <Wrapper>
                    <SubTitle>사용 기술</SubTitle>
                    <Skill>
                        <TagContainer tags={skills} />
                    </Skill>
                </Wrapper>

                <Wrapper>
                    <SubTitle>프로젝트 소개</SubTitle>
                    <Intro>{explain}</Intro>
                </Wrapper>

                <Wrapper>
                    <SubTitle>내가 한 일</SubTitle>
                    <Intro>{i_do}</Intro>
                </Wrapper>
            </Container>
        </>
    )
}

export default Project

const Container = styled.div`
    width: 100%;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 800;
    color: ${color.blue[500]};
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 800;
    color: ${color.blue[400]};
    margin: 0;
`

const Skill = styled.div`
    display: flex;
    justify-content: center;
`

const Intro = styled.p`
    color: ${color.gray[400]};
    font-size: 16px;
`
