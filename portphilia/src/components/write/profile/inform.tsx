import styled from "styled-components"
import Input from "../../common/input"

function Inform() {
    return (
        <>
            <Container>
                <Input label="이름" />
                <Input label="생년월일" />
                <Input label="전화번호" />
                <Input label="이메일" />
                <Input label="학력" />
            </Container>
        </>
    )
}

export default Inform

const Container = styled.div`
    width: 250px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: auto;
    gap: 7px;
`
