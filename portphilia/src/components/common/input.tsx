"use client"

import type React from "react"

import styled from "styled-components"
import { color } from "../../styles/colors"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import ReactMarkdown from "react-markdown"

interface Props {
    label?: string
    placeholder?: string
    type?: string
    input?: string
    value?: string
    disabled?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function Input({
    label,
    placeholder,
    type = "text",
    input = "input",
    value,
    disabled = false,
    onChange,
    onTextAreaChange,
    onKeyDown,
}: Props) {
    const [show, setShow] = useState<boolean>(false)

    return (
        <>
            {input === "input" && (
                <Container>
                    {label && <Label disabled={disabled}>{label}</Label>}
                    <Wrapper disabled={disabled}>
                        <StyledInput
                            value={value}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            disabled={disabled}
                            type={
                                type === "password"
                                    ? show
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            placeholder={placeholder}
                        />
                        {type === "password" && (
                            <Icon
                                onClick={() => !disabled && setShow(!show)}
                                disabled={disabled}
                            >
                                {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </Icon>
                        )}
                    </Wrapper>
                </Container>
            )}
            {input === "textarea" && (
                <Container>
                    {label && <Label disabled={disabled}>{label}</Label>}
                    <TextAreaWrapper disabled={disabled}>
                        <TextArea
                            value={value}
                            onChange={onTextAreaChange}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                    </TextAreaWrapper>
                </Container>
            )}
            {input === "markdown" && (
                <Container>
                    {label && <Label disabled={disabled}>{label}</Label>}
                    <MarkdownContainer>
                        <TextAreaContainer>
                            <Text>작성</Text>
                            <StyledTextArea
                                value={value}
                                onChange={onTextAreaChange}
                                placeholder={placeholder}
                                disabled={disabled}
                            />
                        </TextAreaContainer>

                        <TextAreaContainer>
                            <Text>미리보기</Text>
                            <PreviewWrapper>
                                <ReactMarkdown>{value || ""}</ReactMarkdown>
                            </PreviewWrapper>
                        </TextAreaContainer>
                    </MarkdownContainer>
                </Container>
            )}
        </>
    )
}

export default Input

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Label = styled.label<{ disabled?: boolean }>`
    color: ${(props) => (props.disabled ? color.gray[400] : "black")};
    font-size: 16px;
    font-family: "Pretendard", sans-serif;
`

const Wrapper = styled.div<{ disabled?: boolean }>`
    width: 100%;
    height: 35px;
    border: 1px solid
        ${(props) => (props.disabled ? color.gray[300] : color.gray[400])};
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: ${(props) =>
        props.disabled ? color.gray[100] : "transparent"};
`

const StyledInput = styled.input`
    border: none;
    width: 100%;
    height: 35px;
    background: none;
    color: black;
    font-size: 16px;
    font-family: "Pretendard", sans-serif;
    outline: none;

    &:disabled {
        color: ${color.gray[500]};
        cursor: not-allowed;
    }
`

const Icon = styled.div<{ disabled?: boolean }>`
    width: 30px;
    height: 30px;
    background: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    color: ${(props) => (props.disabled ? color.gray[300] : color.gray[400])};
`

const TextAreaWrapper = styled.div<{ disabled?: boolean }>`
    width: 100%;
    height: 150px;
    border: 1px solid
        ${(props) => (props.disabled ? color.gray[300] : color.gray[400])};
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: ${(props) =>
        props.disabled ? color.gray[100] : "transparent"};
`

const TextArea = styled.textarea`
    border: none;
    width: 100%;
    height: 150px;
    background: none;
    color: black;
    font-size: 16px;
    font-family: "Pretendard", sans-serif;
    outline: none;
    resize: none;
    margin: 15px 8px 0 8px;

    &:disabled {
        color: ${color.gray[500]};
        cursor: not-allowed;
    }
`

const MarkdownContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
`

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 300px;
    border: 1px solid ${color.gray[400]};
    border-radius: 6px;
    padding: 8px;
    font-size: 16px;
    line-height: 1.5;
    font-family: "Pretendard", sans-serif;
    outline: none;
    resize: none;

    &:disabled {
        background-color: ${color.gray[100]};
        color: ${color.gray[500]};
        cursor: not-allowed;
        border-color: ${color.gray[300]};
    }
`

const TextAreaContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
`

const Text = styled.p`
    font-size: 16px;
    font-weight: light;
    margin: 0;
`

const PreviewWrapper = styled.div`
    width: 100%;
    height: 300px;
    border: 1px solid ${color.gray[400]};
    border-radius: 6px;
    padding: 8px;
    font-size: 16px;
    line-height: 1.5;
    font-family: "Pretendard", sans-serif;
    background: #f9f9f9;
    overflow-y: auto;
    white-space: pre-wrap;
`
