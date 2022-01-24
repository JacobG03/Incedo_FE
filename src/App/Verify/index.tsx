import axios from '../../services/index'
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Alerts from "../../shared/Alerts";
import { addAlert } from "../../redux/slices/alertsSlice";
import Wrapper from "../../shared/Wrapper";
import VerifyForm from "./VerifyForm";
import { Content, Cover, FixedContainer, Option, Options, Title } from "../../shared/styles";


const VerifyPage = () => {
	const dispatch = useDispatch()
	// change theme/avatar here
	const resendCode = useCallback(() => {
		axios.get('/auth/send_verification')
			.then(res => {
				dispatch(addAlert({ message: res.data.message }))
			})
			.catch(err => {
				dispatch(addAlert({ message: 'Too many attempts. Try again in 24h.' }))
			})
	}, [dispatch])

	useEffect(() => {
		document.title = 'Verify Email | Incedo'
		resendCode()
	}, [resendCode])


	return (
		<FixedContainer>
			<Wrapper width={480}>
				<Content>
					<Cover
						as={motion.div}
						key={'verify-cover'}
						animate={{ y: "-76px", height: '60px', transition: { duration: 0.6 } }}
					>
						<Title>Verify Email</Title>
					</Cover>
					<VerifyForm />
					<Options>
						<Option
							onClick={() => resendCode()}
							as={motion.div}
							whileHover={{ cursor: 'pointer' }}
							whileTap={{ scale: 0.9 }}
						>
							<span>Resend Code</span>
						</Option>
					</Options>
				</Content>
				<Alerts />
			</Wrapper>
		</FixedContainer>
	)
}

export default VerifyPage;
