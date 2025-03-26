import styled from "styled-components"
import { color } from "../../../styles/colors"

function ShortIntro() {
    return (
        <>
            <Intro>노력하고 성장하며 공부하는 프론트엔드 개발자입니다.</Intro>
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
