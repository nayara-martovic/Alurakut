import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import AuthService from "../src/Services/AuthService";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    width: 100vw;
`;

export default function Logout () {
    const router = useRouter();

    useEffect(() => {
        AuthService.logout();
        router.push("/login");
    }, []);

    return (
        <Wrapper>
            <h1>Saindo...</h1>
        </Wrapper>
    );
}