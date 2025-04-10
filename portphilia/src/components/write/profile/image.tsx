import React from "react"
import styled from "styled-components"
import { color } from "../../../styles/colors"

interface ProfileImageProps {
    preview: string | null
    onFileChange: (file: File) => void
}

function ProfileImage({ preview, onFileChange }: ProfileImageProps) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        onFileChange(file)
    }

    return (
        <InputWrapper>
            <InputLabel htmlFor="imageUpload">
                {preview ? (
                    <ImagePreviewWrapper>
                        <ImagePreview
                            src={preview}
                            alt="프로필 이미지 미리보기"
                        />
                    </ImagePreviewWrapper>
                ) : (
                    "이미지를 선택하세요"
                )}
            </InputLabel>
            <HiddenInput
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
            />
        </InputWrapper>
    )
}

export default ProfileImage

const InputWrapper = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 12px;
    background-color: ${color.gray[400]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
`

const InputLabel = styled.label`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
`

const HiddenInput = styled.input`
    display: none;
`

const ImagePreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    background-color: #fff;
`
