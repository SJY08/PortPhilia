import styled from "styled-components"
import { color } from "../../styles/colors"
import PortfolioService from "../../apis/portfolio"
import { useEffect, useState } from "react"

function Profile() {
    const [username, setUsername] = useState<string>("")
    const [img, setImg] = useState<string | undefined>(undefined)
    const [intro, setIntro] = useState<string | undefined>(undefined)

    const getData = async () => {
        const data = await PortfolioService.getPortfolio()
        setUsername(data.name)
        setImg(data.profile_image_url)
        setIntro(data.short_intro)
    }

    useEffect(() => {
        getData()
    }, [username, img, intro])

    return (
        <>
            <Container>
                {img ? (
                    <ImgPreview src={`http://localhost:3000${img}`} />
                ) : (
                    <ProfileImg></ProfileImg>
                )}
                <UserName>{username}</UserName>
                <IntroContainer>{intro}</IntroContainer>
            </Container>
        </>
    )
}

export default Profile

const Container = styled.div`
    width: 400px;
    height: 350px;
    padding: 40px;
    border-radius: 12px;
    border: 1px solid ${color.blue[500]};
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`

const ProfileImg = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${color.gray[400]};
`

const ImgPreview = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: contain;
    background-color: #fff;
`

const UserName = styled.p`
    font-size: 30px;
    font-weight: 900;
    color: ${color.blue[500]};
`

const IntroContainer = styled.p`
    font-size: 16px;
    text-align: center;
    word-break: keep-all;
`
