"use client"

import type React from "react"

import { useState } from "react"
import styled from "styled-components"
import { color } from "../../../styles/colors"
import Input from "../../common/input"
import Tag from "./tag"

interface Props {
    tags: string[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
    label: string
    disabled?: boolean
}

function TagInput({ tags, setTags, label, disabled = false }: Props) {
    const [text, setText] = useState<string>("")

    const handleTagAdd = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.KeyboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault()

        if (disabled) return // disabled일 때 태그 추가 방지

        if (text.trim() !== "" && tags.length < 10) {
            setTags([...tags, text.trim()])
            setText("")
        }
    }

    const handleTagDelete = (index: number) => {
        if (disabled) return // disabled일 때 태그 삭제 방지
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return // disabled일 때 입력 방지
        if (e.target.value.length > 25) return
        setText(e.target.value)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return // disabled일 때 키보드 입력 방지
        if (e.key === "Enter") {
            e.preventDefault()
            handleTagAdd(e)
        }
    }

    return (
        <>
            <Container>
                <InputContainer>
                    <Title disabled={disabled}>{label}</Title>
                    <Input
                        type="text"
                        value={text}
                        placeholder={
                            disabled
                                ? "비활성화됨"
                                : "태그 입력 (최대 10개, 25자 최대)"
                        }
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        disabled={disabled}
                    />
                </InputContainer>

                <OutputContainer>
                    {tags.map((tag, index) => (
                        <Tag
                            index={index}
                            key={index}
                            tag={tag}
                            handleTagDelete={handleTagDelete}
                            disabled={disabled}
                        />
                    ))}
                </OutputContainer>
            </Container>
        </>
    )
}

export default TagInput

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    min-height: 50px;
    gap: 10px;
`

const OutputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    min-height: 40px;
`

const InputContainer = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 10px;
    max-width: 500px;

    & input {
        padding: 4px 8px;
    }
`

const Title = styled.p<{ disabled?: boolean }>`
    font-size: 16px;
    font-weight: 600;
    background: ${(props) =>
        props.disabled ? color.gray[400] : color.blue[300]};
    color: white;
    width: 120px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`
