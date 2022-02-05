import axios from '../../services/index'
import { m } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Alerts from "../../shared/Alerts";
import { addAlert } from "../../redux/slices/alertsSlice";
import Wrapper from "../../shared/Wrapper";
import VerifyForm from "./VerifyForm";
import { FixedContainer, Option, Options } from "../../shared/styles";
import CoverAnimate from '../../shared/CoverAnimate';


const VerifyPage = () => {
	const dispatch = useDispatch()
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
				<CoverAnimate>
					<VerifyForm />
					<Options>
						<Option
							onClick={() => resendCode()}
							as={m.button}
							whileHover={{ cursor: 'pointer' }}
							whileTap={{ scale: 0.9 }}
						>
							<span>Resend Code</span>
						</Option>
					</Options>
				</CoverAnimate>
				<Alerts width={480} />
			</Wrapper>
		</FixedContainer>
	)
}

export default VerifyPage;
