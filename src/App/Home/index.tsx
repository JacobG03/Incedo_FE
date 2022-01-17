import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Alerts from '../../shared/Alerts';
import { getMe } from '../../redux/calls/me_calls';
import { addAlert } from '../../redux/slices/alertsReducer';


const Home = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		document.title = 'Home | Incedo'
	}, [])

	const Logout = () => {
		axios.delete('/auth/logout')
			.then(res => {
				dispatch(addAlert({ message: res.data.message }))
				getMe(dispatch)
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			<Alerts />
			<h1>Home</h1>
			<span onClick={() => Logout()}>Logout</span>
		</>
	)
}

export default Home;
