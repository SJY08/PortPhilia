import styled from "styled-components"
import { color } from "../../styles/colors"
import { IoAddOutline } from "react-icons/io5"

interface props {
    onClick?: () => void
}

function AddProject({ onClick }: props) {
    return (
        <>
            <Container>
                <Title>프로젝트</Title>
                <AddButton onClick={onClick}>
                    <IoAddOutline />
                </AddButton>
            </Container>
        </>
    )
}

export default AddProject

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
    background: ${color.blue[300]};
    color: white;
    width: 120px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`

const AddButton = styled.button`
    width: 35px;
    height: 35px;
    background: ${color.blue[300]};
    border-radius: 6px;
    font-size: 24px;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-left: auto;
`
