import axios from '../../../services/index'
import { useDispatch } from "react-redux"
import { getMe } from "../../../redux/calls/me_calls"
import { addAlert } from "../../../redux/slices/alertsReducer"


const Settings = () => {
  const dispatch = useDispatch()
  const logout = () => {
    axios.delete('/auth/logout')
      .then(res => {
        dispatch(addAlert({ message: res.data.message }))
        getMe(dispatch)
      })
      .catch(err => console.log(err))
  }

  return (
    <span onClick={() => logout()}>Logout</span>
  )
}

export default Settings;
