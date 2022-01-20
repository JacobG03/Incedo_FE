import { useEffect } from 'react';
import Alerts from '../../shared/Alerts';
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
`


const HomePage = () => {
	useEffect(() => {
		document.title = 'Home | Incedo'
	}, [])


	return (
		<Container>
			<WrapperPage width={800}>
				<Navbar />
				<div>
					<Alerts />
					<Content>
						<Outlet />
					</Content>
				</div>
			</WrapperPage>
		</Container>
	)
}

export default HomePage;
