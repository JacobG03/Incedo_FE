import React from "react";
// import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";


const Container = styled.div`
	position: fixed;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`

const Title = styled.h1`
	color: ${props => props.theme.sub};
`


// interface CustomState {
// 	from: {
// 		pathname: string
// 	}
// }

const Login = () => {
	// let location = useLocation();
	// let state = location.state as CustomState
	// let from = state?.from?.pathname || "/";

	return (
		<Container>
			<Title>Sign In</Title>
			<LoginForm />
		</Container>
	)
}

export default Login;
