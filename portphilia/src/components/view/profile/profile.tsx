import styled from "styled-components"
import { color } from "../../../styles/colors"

interface ProfileProps {
    image: string | null
    name: string
    birth: string
    phone: string
    email: string
    edu: string
}

function Profile({ image, name, birth, phone, email, edu }: ProfileProps) {
    return (
        <Container>
            {image ? (
                <Image image={image} src={image} alt="프로필 이미지" />
            ) : (
                <Image
                    image={null}
                    src="/default-profile.png"
                    alt="기본 프로필 이미지"
                />
            )}

            <InfromContainer>
                <Name>{name}</Name>
                <TextContainer>
                    <Text>{birth}</Text>
                    <Text>{phone}</Text>
                    <Text>{email}</Text>
                    <Text>{edu}</Text>
                </TextContainer>
            </InfromContainer>
        </Container>
    )
}

export default Profile

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface ImageProps {
    image: string | null
}

const Image = styled.img<ImageProps>`
    max-width: 250px;
    max-height: 250px;
    width: auto;
    height: auto;
    border-radius: 12px;
    background-color: ${color.gray[400]};
    object-fit: contain;
    object-position: center;
`

const InfromContainer = styled.div`
    height: 250px;
    margin-left: auto;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px;
`

const Name = styled.h1`
    font-size: 36px;
    font-weight: bolder;
    margin-bottom: auto;
    color: ${color.blue[400]};
`

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
`

const Text = styled.p`
    font-size: 16px;
    font-weight: 800;
    color: ${color.gray[300]};
`
