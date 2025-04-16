import styled, { keyframes } from "styled-components"
import { color } from "../../styles/colors"
import { useNavigate } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io"
import Logo from "../../assets/PortPhilia.png"
import laptop1 from "../../assets/laptop1.png"

function Banner() {
    const navigate = useNavigate()

    return (
        <BannerContainer>
            <BannerWrapper>
                <TitleContainer>
                    <SubTitle>개발자 포트폴리오 작성</SubTitle>
                    <img src={Logo} width={250} />
                    <GetStarted onClick={() => navigate("/login")}>
                        시작하기 <IoIosArrowForward />
                    </GetStarted>
                </TitleContainer>

                <LapTopImg>
                    <img src={laptop1} height={450} />
                </LapTopImg>
            </BannerWrapper>
        </BannerContainer>
    )
}

export default Banner

const FadeIn = keyframes`
0%{
    opacity:0;
}100%{
    opacity:1;
}
`

const FadeInSlide = keyframes`
    0%{
        opacity:0;
        transform:translateY(50px);
    } 100%{
        opacity:1;
        transform:translateY(0);
    }
`

const BannerContainer = styled.div`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${color.blue[50]};
    overflow: hidden;
`

const BannerWrapper = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TitleContainer = styled.div`
    animation: ${FadeIn} 3s;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
`

const SubTitle = styled.p`
    font-size: 20px;
    font-weight: 800;
    margin: 0;
`

const GetStarted = styled.p`
    font-size: 20px;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;
`

const LapTopImg = styled.div`
    margin-left: auto;
    margin-top: auto;
    animation: ${FadeInSlide} 2s;
`
