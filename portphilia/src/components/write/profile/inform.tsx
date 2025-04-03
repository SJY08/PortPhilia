import styled from "styled-components"
import Input from "../../common/input"
import React, { SetStateAction } from "react"

interface props {
    name: string
    setName: React.Dispatch<SetStateAction<string>>
    birth: string
    setBirth: React.Dispatch<SetStateAction<string>>
    phone: string
    setPhone: React.Dispatch<SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<SetStateAction<string>>
    edu: string
    setEdu: React.Dispatch<SetStateAction<string>>
}

function Inform({
    name,
    setName,
    birth,
    setBirth,
    phone,
    setPhone,
    email,
    setEmail,
    edu,
    setEdu,
}: props) {
    return (
        <>
            <Container>
                <Input
                    label="이름"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />
                <Input
                    label="생년월일"
                    value={birth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setBirth(e.target.value)
                    }
                />
                <Input
                    label="전화번호"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhone(e.target.value)
                    }
                />
                <Input
                    label="이메일"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />
                <Input
                    label="학력"
                    value={edu}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEdu(e.target.value)
                    }
                />
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
