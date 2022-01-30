import LoginForm from "./LoginForm";
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Wrapper from "../../shared/Wrapper";
import Alerts from "../../shared/Alerts";
import SendPassReset from "./SendPassReset";
import { ReactComponent as MailSVG } from '../../assets/svg/send-2.svg';
import { ReactComponent as RegisterSVG } from '../../assets/svg/user-add.svg';
import { FixedContainer, Option, Options } from "../../shared/styles";
import CoverAnimate from "../../shared/CoverAnimate";


const LoginPage = () => {
	const [redirect, setRedirect] = useState(false)
	const [reset, setReset] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Login | Incedo'
	}, [])

	// Provides current redirect value inside on setTimeout
	// This allows user to cancel redirection
	const redirectRef = useRef(redirect);
	redirectRef.current = redirect;

	const handleRedirect = () => {
		setRedirect(!redirect)
		setTimeout(() => {
			if (redirectRef.current) {
				navigate('/register')
			}
		}, 500)
	}

	return (
		<FixedContainer>
			<Wrapper width={480}>
				<AnimatePresence>
					{!redirect && (
						<CoverAnimate>
							<LoginForm />
							<span>or</span>
							<Options >
								{reset
									? <SendPassReset setReset={setReset} />
									: <Option
										onClick={() => setReset(!reset)}
										as={motion.div}
										whileHover={{ cursor: 'pointer' }}
										whileTap={{ scale: 0.9 }}
									>
										<MailSVG width={24} height={24} style={{ minWidth: '24px' }} />
										<span style={{ textAlign: 'center' }}>Reset Password</span>
									</Option>
								}
								<Option
									onClick={() => handleRedirect()}
									as={motion.div}
									whileHover={{ cursor: 'pointer' }}
									whileTap={{ scale: 0.9 }}
								>
									<RegisterSVG width={24} height={24} />
									<span>Register</span>
								</Option>
							</Options>
						</CoverAnimate>
					)}
				</AnimatePresence>
				<Alerts width={480} />
			</Wrapper>
		</FixedContainer>
	)
}

export default LoginPage;
