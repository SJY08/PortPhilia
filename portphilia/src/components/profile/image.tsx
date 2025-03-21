import styled from "styled-components"
import { color } from "../../styles/colors"

function ProfileImage() {
    return (
        <>
            <Input />
        </>
    )
}

export default ProfileImage

const Input = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 12px;
    background-color: ${color.gray[400]};
`
