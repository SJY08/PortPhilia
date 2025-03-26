import MDEditor from "@uiw/react-md-editor"
import styled from "styled-components"

interface props {
    text?: string
}

function Introduce({ text }: props) {
    return (
        <>
            <Intro>
                <MDEditor.Markdown source={text} />
            </Intro>
        </>
    )
}

export default Introduce

const Intro = styled.div`
    width: 100%;
`
