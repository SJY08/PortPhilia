import styled from "styled-components"
import { color } from "../../styles/colors"
import { FaPen } from "react-icons/fa"
import { FaClock, FaDownload } from "react-icons/fa6"

function List() {
    const data = [
        {
            icon: <FaPen />,
            content: "편리한 작성",
        },
        {
            icon: <FaClock />,
            content: "주어진 양식 사용으로 시간단축",
        },
        {
            icon: <FaDownload />,
            content: "PDF로 다운로드",
        },
    ]

    return (
        <>
            <ListContainer>
                <ListWrapper>
                    {data.map((v, i) => (
                        <Container key={i}>
                            <Icon>{v.icon}</Icon>
                            <Content>{v.content}</Content>
                        </Container>
                    ))}
                </ListWrapper>
            </ListContainer>
        </>
    )
}

export default List

const ListContainer = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ListWrapper = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    font-size: 24px;
    border-radius: 8px;
    background-color: ${color.gray[50]};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${color.blue[600]};
`

const Content = styled.p`
    font-size: 20px;
    font-weight: 500;
    margin: 0;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    margin-right: auto;
`
