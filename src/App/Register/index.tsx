import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RegisterForm from "./RegisterForm";
import Wrapper from "../../shared/Wrapper";
import Alerts from "../../shared/Alerts";
import { ReactComponent as LoginSVG } from '../../assets/svg/key-square.svg';
import { FixedContainer, Option, Options } from "../../shared/styles";
import CoverAnimate from '../../shared/CoverAnimate';


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
						<CoverAnimate>
							<RegisterForm />
							<span>or</span>
							<Options>
								<Option
									onClick={() => handleRedirect()}
									as={motion.button}
									whileHover={{ cursor: 'pointer' }}
									whileTap={{ scale: 0.9 }}
									name='Login Page'
								>
									<LoginSVG width={24} height={24} />
									<span>Login</span>
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

export default RegisterPage;
