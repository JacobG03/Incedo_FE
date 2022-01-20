import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RegisterForm from "./RegisterForm";
import Wrapper from "../../shared/Wrapper";
import Alerts from "../../shared/Alerts";
import { ReactComponent as LoginSVG } from '../../assets/svg/key-square.svg';
import { Content, Cover, FixedContainer, Option, Options, Title } from "../../shared/styles";
import styled from 'styled-components';


const Content2 = styled(Content)`
	gap: 0.5rem;
`


const RegisterPage = () => {
	const [redirect, setRedirect] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Register | Incedo'
	}, [])

	const redirectRef = useRef(redirect);
	redirectRef.current = redirect;

	const handleRedirect = () => {
		setRedirect(!redirect)
		setTimeout(() => {
			if (redirectRef.current) {
				navigate('/login')
			}
		}, 500)
	}

	return (
		<FixedContainer>
			<Wrapper width={480}>
				<AnimatePresence>
					{!redirect && (
						<Content2>
							<Cover
								as={motion.div}
								key={'register-cover'}
								transition= {{ duration: 0.5 }}
								animate={{ y: "-76px", height: '60px' }}
								exit={{ y: "0px", height: '100%' }}
							>
								<Title>Incedo</Title>
							</Cover>
							<RegisterForm />
							<span>or</span>
							<Options>
								<Option
									onClick={() => handleRedirect()}
									as={motion.div}
									whileHover={{ cursor: 'pointer' }}
									whileTap={{ scale: 0.9 }}
								>
									<LoginSVG width={24} height={24} />
									<span>Login</span>
								</Option>
							</Options>
						</Content2>
					)}
				</AnimatePresence>
				<Alerts />
			</Wrapper>
		</FixedContainer>
	)
}

export default RegisterPage;
