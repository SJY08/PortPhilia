import Nav from "react-bootstrap/Nav"
import styled from "styled-components"
import { useLocation, Link } from "react-router-dom" // react-router-dom 추가

interface props {
    onClick?: () => void
}

function SideBar({ onClick }: props) {
    const location = useLocation()

    return (
        <Container>
            <Nav variant="pills" className="flex-column gap-2">
                <Nav.Item>
                    <Nav.Link
                        as={Link}
                        to="/write"
                        active={location.pathname === "/write"}
                    >
                        작성하기
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        as={Link}
                        to="/view"
                        active={location.pathname === "/view"}
                    >
                        미리보기
                    </Nav.Link>
                </Nav.Item>
                {location.pathname == "/view" && (
                    <StyledNavLink onClick={onClick}>다운로드</StyledNavLink>
                )}
            </Nav>
        </Container>
    )
}

export default SideBar

const Container = styled.div`
    position: fixed;
    top: 100px;
    right: 40px;
    width: 200px;
`

const StyledNavLink = styled.button`
    background: transparent;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 8px 16px;
    text-align: left;
    outline: none;
    color: #007bff;

    &:hover {
        background-color: #007bff;
        color: white;
        transition: 300ms;
    }

    &:active {
        background-color: #007bff;
        color: white;
        transition: 300ms;
    }
`
