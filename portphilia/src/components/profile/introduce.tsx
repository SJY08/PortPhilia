import styled from "styled-components"
import Input from "../common/input"
import { useState } from "react"

function Introduce() {
    const [intro, setIntro] = useState<string>("")

    return (
        <>
            <Container>
                <Input label="한줄 자기 소개" />
                <Input
                    input="markdown"
                    label="소개"
                    value={intro}
                    onTextAreaChange={(e) => setIntro(e.target.value)}
                />
            </Container>
        </>
    )
}

export default Introduce

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`
