import styled from "styled-components"
import { color } from "../../styles/colors"
import { useNavigate } from "react-router-dom"

function Dropdown() {
    const navigate = useNavigate()

    const data = [
        {
            title: "내 포트폴리오",
            onClick: () => navigate("/write"),
        },
        {
            title: "마이페이지",
            onClick: () => navigate("/mypage"),
        },
        {
            title: "로그아웃",
            onClick: () => navigate("/"),
        },
    ]

    return (
        <Container>
            {data.map((v, i) => (
                <div key={i}>
                    <Content onClick={v.onClick}>{v.title}</Content>
                    {i !== data.length - 1 && <Hr />}
                </div>
            ))}
        </Container>
    )
}

export default Dropdown

const Container = styled.div`
    width: 150px;
    padding: 5px;
    box-sizing: border-box;
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    border-radius: 12px;
    border: 1px solid ${color.gray[100]};
    z-index: 999;
    overflow: hidden;
`

const Content = styled.div`
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: black;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
`

const Hr = styled.hr`
    width: 100%;
    margin: 0;
    height: 0;
    border-color: ${color.gray[300]};
`
