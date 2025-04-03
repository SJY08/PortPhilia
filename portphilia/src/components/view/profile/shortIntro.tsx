import styled from "styled-components"
import { color } from "../../../styles/colors"

interface props {
    text: string
}

function ShortIntro({ text }: props) {
    return (
        <>
            <Intro>{text}</Intro>
        </>
    )
}

export default ShortIntro

const Intro = styled.p`
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 800;
    color: ${color.blue[400]};
`
