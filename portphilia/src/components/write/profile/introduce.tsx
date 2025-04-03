import styled from "styled-components"
import Input from "../../common/input"
import { SetStateAction } from "react"

interface props {
    short: string
    setShort: React.Dispatch<SetStateAction<string>>
    intro: string
    setIntro: React.Dispatch<SetStateAction<string>>
}

function Introduce({ short, setShort, intro, setIntro }: props) {
    return (
        <>
            <Container>
                <Input
                    label="한줄 자기 소개"
                    value={short}
                    onChange={(e) => setShort(e.target.value)}
                />
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
