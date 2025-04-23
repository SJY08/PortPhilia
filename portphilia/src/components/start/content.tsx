import styled from "styled-components"
import { color } from "../../styles/colors"
import laptop2 from "../../assets/laptop2.png"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Inform from "../../assets/inform.png"
import Introduce from "../../assets/introduce.png"
import Tags from "../../assets/tags.png"
import Logo from "../../assets/PortPhilia.png"

function Content() {
    const navigate = useNavigate()

    return (
        <>
            <Container>
                <Text style={{ width: "50%", textAlign: "left" }}>
                    <strong>포트필리아</strong>는 개발자 포트폴리오 작성을
                    도와주는 양식 사이트입니다.
                    <br /> <br />
                    제공된 양식에 따라 마크다운을 활용하여 자유롭게 내용을
                    편집할 수 있습니다. 또한, 작업한 모든 정보는 오프라인 인쇄
                    및 공유가 용이하도록 A4사이즈의 PDF로 다운로드 받을 수 있게
                    제공 중입니다.
                </Text>

                <ImageWrapper>
                    <ImageContainer>
                        <Image src={Inform} />
                        <TextContainer>
                            <Title>기본정보 입력</Title>
                            <Text>
                                여러분의 이미지와 가지고 있는 기본 정보를
                                입력하는 섹션입니다.
                            </Text>
                        </TextContainer>
                    </ImageContainer>

                    <ImageContainer>
                        <TextContainer>
                            <Title>자기소개</Title>
                            <Text>
                                여러분이 어떤 사람인지 직접 소개할 수 있는
                                섹션입니다
                            </Text>
                        </TextContainer>
                        <Image src={Introduce} />
                    </ImageContainer>

                    <ImageContainer>
                        <Image src={Tags} />
                        <TextContainer>
                            <Title>기술 스택과 자격증</Title>
                            <Text>
                                여러분이 사용하고 있는 기술스택과 취득한
                                자격증을
                                <br />
                                태그형식으로 입력하는 섹션입니다.
                            </Text>
                        </TextContainer>
                    </ImageContainer>
                </ImageWrapper>

                <BannerContainer>
                    <BannerWrapper>
                        <div>
                            <img src={laptop2} height={400} />
                        </div>

                        <TitleContainer>
                            <TextContainer style={{ alignItems: "start" }}>
                                <SubTitle>손쉽게 작성하는 포트폴리오</SubTitle>
                                <img src={Logo} width={300} />
                            </TextContainer>
                            <Button onClick={() => navigate("/login")}>
                                포트폴리오 작성하기
                            </Button>
                        </TitleContainer>
                    </BannerWrapper>
                </BannerContainer>
            </Container>
        </>
    )
}

export default Content

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    margin: 50px 0;
`

const Text = styled.div`
    font-size: 20px;
    text-align: center;
`

const BannerContainer = styled.div`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${color.gray[50]};
    overflow: hidden;
`

const BannerWrapper = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TitleContainer = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 50px;
    margin-left: auto;
`

const SubTitle = styled.p`
    font-size: 20px;
    font-weight: bolder;
    margin: 0;
`

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Title = styled.p`
    font-size: 30px;
    font-weight: 800;
`

const Image = styled.img`
    max-height: 600px;
    max-width: 550px;
    border-radius: 12px;
    padding: 10px;
    border: 5px solid ${color.blue[200]};
    box-shadow: 0 0 20px ${color.blue[100]};
`

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 200px;
`
