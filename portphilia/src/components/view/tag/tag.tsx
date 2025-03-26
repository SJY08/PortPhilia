import styled from "styled-components"
import { color } from "../../../styles/colors"

interface props {
    tag: string
    index: number
}

function Tag({ tag, index }: props) {
    return (
        <>
            <TaggedContent key={index}>{tag}</TaggedContent>
        </>
    )
}

export default Tag

const TaggedContent = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 8px;
    background-color: ${color.blue[200]};
    color: white;
    font-weight: light;
    font-size: 16px;
    user-select: none;
`
