import styled from "styled-components"
import { color } from "../../styles/colors"
import laptop2 from "../../assets/laptop2.png"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Content() {
    const navigate = useNavigate()

    const inform = [
        {
            title: "프로필 이미지",
            content:
                "나만의 개성을 표현할 수 있는 사진이나 이미지를 업로드하여 시각적 인상을 강화합니다.",
        },
        {
            title: "이름 & 생년월일",
            content:
                "여러분의 신원과 경력에 대한 첫 인상으로, 이름과 생년월일을 입력하여 신뢰도를 높입니다.",
        },
        {
            title: "학력, 전화번호, 이메일",
            content:
                "학력 및 연락처 정보를 입력해 지원하는 회사나 고객이 여러분에 대해 빠르게 파악할 수 있도록 합니다.",
        },
    ]

    const introduce = [
        {
            title: "자기소개",
            content:
                "간결하면서도 인상 깊은 문구로 자신을 소개하고, 개발자로서의 경험과 목표를 서술합니다.",
        },
        {
            title: "경력 요약",
            content:
                "이전 프로젝트나 업무 경력, 그리고 그동안 쌓아온 기술 스택에 대해 구체적으로 기술하여 전문성을 강조합니다.",
        },
    ]

    const major = {
        title: "기술 스택",
        inform: [
            {
                subtitle: "프로그래밍 언어",
                content:
                    "JavaScript, Python, Java 등 자신이 능숙하게 다루는 언어들을 나열합니다.",
            },
            {
                subtitle: "프레임워크/라이브러리",
                content:
                    "React, Vue, Django 등 프로젝트에 사용된 주요 프레임워크와 라이브러리를 기재합니다.",
            },
            {
                subtitle: "도구 및 툴",
                content:
                    "Git, Docker, VSCode 등 개발에 활용하는 도구들을 포함하여 기술적 역량을 강조합니다.",
            },
        ],
    }

    return (
        <>
            <Container>
                <Text>
                    <strong>포트필리아</strong>는 본인이 보유한 다양한 기술과
                    작업 샘플, 경력을 한눈에 정리하여 잠재 고객과 고용주에게
                    어필할 수 있는 맞춤형 포트폴리오를 만드는 플랫폼입니다.
                    <br /> <br /> 별도의 웹사이트 구축이나 고급 그래픽 디자인을
                    배우지 않아도, 제공된 양식에 따라 마크다운을 활용하여
                    자유롭게 내용을 편집할 수 있습니다. 또한, 작업한 모든 정보는
                    A4 사이즈 PDF로 저장할 수 있어 오프라인 인쇄 및 공유가
                    용이합니다.
                </Text>

                <BannerContainer>
                    <BannerWrapper>
                        <div>
                            <img src={laptop2} height={400} />
                        </div>

                        <TitleContainer>
                            <SubTitle>
                                포트폴리오의 첫인상은 기본 정보에서 시작됩니다.
                            </SubTitle>
                            <Ul gap={50}>
                                {inform.map((v, i) => (
                                    <li key={i}>
                                        <strong>{v.title}</strong>: {v.content}
                                    </li>
                                ))}
                            </Ul>
                        </TitleContainer>
                    </BannerWrapper>
                </BannerContainer>

                <TextContainer>
                    <Title>자기소개 및 경력 요약</Title>
                    <Text>
                        여러분의 전문성을 한눈에 보여줄 수 있는 핵심 섹션입니다.
                        <Ul>
                            {introduce.map((v, i) => (
                                <li key={i}>
                                    <strong>{v.title}</strong>: {v.content}
                                </li>
                            ))}
                        </Ul>
                    </Text>
                </TextContainer>

                <TextContainer>
                    <Title>기술, 자격증 및 프로젝트</Title>
                    <Text>
                        여러분의 전문성을 한번에 보여줄 수 있는 섹션입니다.
                    </Text>

                    <Text style={{ marginTop: "10px" }}>
                        <strong>{major.title}</strong>
                        <Ul>
                            {major.inform.map((v, i) => (
                                <li key={i}>
                                    <strong>{v.subtitle}</strong>: {v.content}
                                </li>
                            ))}
                        </Ul>
                    </Text>

                    <Text>
                        <strong style={{ marginTop: "20px" }}>자격증</strong>
                        <Ul>
                            <li>
                                정보처리기사, AWS Certified Developer 등
                                여러분의 실력을 증명할 수 있는 자격증 정보를
                                추가합니다.
                            </li>
                            <li>
                                자격증은 전문성과 신뢰도를 높여주는 중요한
                                요소로, 경력 및 기술과 함께 소개하면 좋습니다.
                            </li>
                        </Ul>
                    </Text>

                    <Text style={{ marginTop: "20px" }}>
                        <strong>프로젝트</strong>
                        <Ul>
                            <li>
                                작품 전시: 웹사이트, 일러스트, 디자인 목업,
                                동영상 등 다양한 작업 샘플을 전시합니다.
                            </li>
                            <li>
                                프로젝트 설명: 각 프로젝트마다 상세한 설명을
                                추가해 여러분이 맡은 역할, 사용한 기술,
                                프로젝트의 목표와 성과를 기록합니다
                            </li>
                        </Ul>
                    </Text>
                </TextContainer>

                <Button onClick={() => navigate("/login")}>
                    포트폴리오 작성 시작하기
                </Button>
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
    width: 50%;
    font-size: 20px;
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
    gap: 10px;
    margin-left: auto;
`

const SubTitle = styled.p`
    font-size: 20px;
`

interface getGap {
    gap?: number
}

const Ul = styled.ul<getGap>`
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    gap: ${({ gap }) => `${gap}px`};
`

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Title = styled.p`
    width: 50%;
    font-size: 30px;
    font-weight: 800;
`
