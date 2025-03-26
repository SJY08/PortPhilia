import styled from "styled-components"
import Tag from "./tag"
import { color } from "../../../styles/colors"

interface props {
    title?: string
    tags?: string[]
}

function TagContainer({ title, tags }: props) {
    return (
        <>
            <Container>
                <Title>{title}</Title>
                <TagsContainer>
                    {tags &&
                        tags.map((tag, index) => (
                            <Tag index={index} key={index} tag={tag} />
                        ))}
                </TagsContainer>
            </Container>
        </>
    )
}

export default TagContainer

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`

const Title = styled.h1`
    width: 100%;
    text-align: start;
    font-size: 20px;
    font-weight: 800;
    color: ${color.blue[500]};
    margin: 0;
`

const TagsContainer = styled.div`
    margin: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    min-height: 40px;
`
