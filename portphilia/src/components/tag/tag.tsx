import styled from "styled-components"
import { color } from "../../styles/colors"
import { FiX } from "react-icons/fi"

interface props {
    tag: string
    index: number
    handleTagDelete: (index: number) => void
}

function Tag({ tag, index, handleTagDelete }: props) {
    return (
        <>
            <TaggedContent key={index}>
                {tag}
                <DeleteButton onClick={() => handleTagDelete(index)}>
                    <FiX />
                </DeleteButton>
            </TaggedContent>
        </>
    )
}

export default Tag

const TaggedContent = styled.div`
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 8px;
    background-color: ${color.gray[100]};
    color: ${color.gray[500]};
    font-weight: light;
    font-size: 20px;
    user-select: none;
`

const DeleteButton = styled.button`
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 16px;
`
