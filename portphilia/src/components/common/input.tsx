import styled from "styled-components"
import { color } from "../../styles/colors"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import ReactMarkdown from "react-markdown"

interface props {
    label?: string
    placeholder?: string
    type?: string
    input?: string
    value?: string
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
    onChange,
    onTextAreaChange,
    onKeyDown,
}: props) {
    const [show, setShow] = useState<boolean>(false)

    return (
        <>
            {input === "input" && (
                <Container>
                    {label && <Label>{label}</Label>}
                    <Wrapper>
                        <StyledInput
                            value={value}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
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
                            <Icon onClick={() => setShow(!show)}>
                                {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </Icon>
                        )}
                    </Wrapper>
                </Container>
            )}
            {input === "textarea" && (
                <Container>
                    {label && <Label>{label}</Label>}
                    <TextAreaWrapper>
                        <TextArea
                            value={value}
                            onChange={onTextAreaChange}
                            placeholder={placeholder}
                        />
                    </TextAreaWrapper>
                </Container>
            )}
            {input === "markdown" && (
                <Container>
                    {label && <Label>{label}</Label>}
                    <MarkdownContainer>
                        <TextAreaContainer>
                            <Text>작성</Text>
                            <StyledTextArea
                                value={value}
                                onChange={onTextAreaChange}
                                placeholder={placeholder}
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

const Label = styled.label`
    color: black;
    font-size: 16px;
    font-family: "Pretendard", sans-serif;
`

const Wrapper = styled.div`
    width: 100%;
    height: 35px;
    border: 1px solid ${color.gray[400]};
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
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
`

const Icon = styled.div`
    width: 30px;
    height: 30px;
    background: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${color.gray[400]};
`

const TextAreaWrapper = styled.div`
    width: 100%;
    height: 150px;
    border: 1px solid ${color.gray[400]};
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
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
