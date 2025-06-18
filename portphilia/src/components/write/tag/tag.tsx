"use client"

import styled from "styled-components"
import { color } from "../../../styles/colors"
import { FiX } from "react-icons/fi"

interface Props {
    tag: string
    index: number
    handleTagDelete: (index: number) => void
    disabled?: boolean
}

function Tag({ tag, index, handleTagDelete, disabled = false }: Props) {
    const handleDelete = () => {
        if (disabled) return
        handleTagDelete(index)
    }

    return (
        <>
            <TaggedContent key={index} disabled={disabled}>
                {tag}
                <DeleteButton onClick={handleDelete} disabled={disabled}>
                    <FiX />
                </DeleteButton>
            </TaggedContent>
        </>
    )
}

export default Tag

const TaggedContent = styled.div<{ disabled?: boolean }>`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 8px;
    background-color: ${(props) =>
        props.disabled ? color.gray[200] : color.gray[100]};
    color: ${(props) => (props.disabled ? color.gray[400] : color.gray[500])};
    font-weight: 300;
    font-size: 16px;
    line-height: 16px;
    white-space: nowrap;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`

const DeleteButton = styled.div<{ disabled?: boolean }>`
    width: 14px;
    height: 14px;
    margin-left: 5px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background: none;
    border: none;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.disabled ? color.gray[300] : "inherit")};

    &:hover {
        color: ${(props) =>
            props.disabled ? color.gray[300] : color.gray[700]};
    }
`
