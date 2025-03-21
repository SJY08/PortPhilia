import styled from "styled-components"
import { color } from "../../styles/colors"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import MDEditor from "@uiw/react-md-editor"

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
            {input == "input" && (
                <Container>
                    {label && <Label>{label}</Label>}
                    <Wrapper>
                        <StyledInput
                            value={value}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            type={
                                type == "passowrd"
                                    ? show
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            placeholder={placeholder}
                        />

                        {type == "password" && (
                            <Icon onClick={() => setShow(!show)}>
                                {type == "password" &&
                                    (show ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    ))}
                            </Icon>
                        )}
                    </Wrapper>
                </Container>
            )}
            {input == "textarea" && (
                <Container>
                    <Label>{label}</Label>
                    <TextAreaWrapper>
                        <TextArea placeholder={placeholder} />
                    </TextAreaWrapper>
                </Container>
            )}
            {input == "markdown" && (
                <Container>
                    <Label>{label}</Label>
                    <MDEditor
                        height={300}
                        className="w-100"
                        value={value}
                        onChange={(val) => {
                            if (onTextAreaChange) {
                                onTextAreaChange({
                                    target: { value: val || "" },
                                } as React.ChangeEvent<HTMLTextAreaElement>)
                            }
                        }}
                    />
                </Container>
            )}
        </>
    )
}

export default Input

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 4px;
`

const Label = styled.label`
    color: black;
    font-size: 16px;
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

const TextAreaWrapper = styled.div`
    width: 100%;
    height: 150px;
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
    outline: none;
`

const Icon = styled.div`
    width: 30px;
    height: 30px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${color.gray[400]};
`

const TextArea = styled.textarea`
    border: none;
    width: 100%;
    height: 150px;
    background: none;
    color: black;
    font-size: 16px;
    outline: none;
    resize: none;
    margin-top: 15px;
    margin-left: 8px;
    margin-right: 8px;
`
