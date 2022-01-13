import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { IState, IUser } from '../types';


const Home = () => {
	const user = useSelector<IState, IUser>(state => state.user)
	console.log('Home', user)
	

	return (
		<>
			<h1>Home</h1>
		</>
	)
}

export default Home;
