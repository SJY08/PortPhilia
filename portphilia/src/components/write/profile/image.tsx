import { useState } from "react"
import styled from "styled-components"
import { color } from "../../../styles/colors"

function ProfileImage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setImagePreview(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <InputWrapper>
                <InputLabel htmlFor="imageUpload">
                    {imagePreview ? (
                        <ImagePreviewWrapper>
                            <ImagePreview
                                src={imagePreview}
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
        </>
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
    background-color: #fff; /* 투명 이미지 대비 흰 배경 */
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* 긴 쪽 기준으로 크기 맞춤 (1:1 비율 유지) */
    background-color: #fff; /* 투명 이미지 대비 흰 배경 */
`
