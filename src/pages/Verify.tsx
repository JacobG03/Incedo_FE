import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import VerifyForm from "../components/VerifyForm";
import { IState, IUserInfo } from "../types";


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

const Verify = () => {
	const user = useSelector<IState, IUserInfo | null>(state => state.user.userInfo)

	if (user?.verified) {
		return <Navigate to='/' />
	}

	return (
		<Container>
			<Title>Verify</Title>
			<VerifyForm />
		</Container>
	)
}

export default Verify;
