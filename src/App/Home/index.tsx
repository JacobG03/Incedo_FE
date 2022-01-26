import { useEffect } from 'react';
import styled from 'styled-components';
import { Content } from '../../shared/styles';
import Wrapper from '../../shared/Wrapper';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


const Container = styled.div`
	position: relative;
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const WrapperPage = styled(Wrapper)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-x: hidden;
	padding: 100px 1rem;
`


const HomePage = () => {
	useEffect(() => {
		document.title = 'Home | Incedo'
	}, [])


	return (
		<Container>
			<Navbar />
			<WrapperPage width={800}>
				<Content>
					<Outlet />
				</Content>
			</WrapperPage>
		</Container>
	)
}

export default HomePage;
