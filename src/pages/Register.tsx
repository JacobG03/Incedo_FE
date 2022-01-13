import React from "react";
import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";


const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`

const Title = styled.h1`
	color: ${props => props.theme.sub};
`

const Register = () => {

	return (
		<Container>
			<Title>Sign up</Title>
			<RegisterForm />
		</Container>
	)
}

export default Register;
