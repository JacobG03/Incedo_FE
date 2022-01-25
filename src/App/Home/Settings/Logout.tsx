import { useDispatch } from "react-redux"
import { getMe } from "../../../redux/calls/me_calls"
import { addAlert } from "../../../redux/slices/alertsSlice"
import axios from '../../../services/index'
import { ReactComponent as LogoutSVG } from '../../../assets/svg/logout-1.svg'
import { m } from "framer-motion"
import styled from "styled-components"


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${p => p.theme.bg};
  color: ${p => p.theme.main};
  filter: var(--shadow);
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: 1.25rem;
`


const Logout = () => {
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
    <Container
      as={m.div}
      whileHover={{ scale: 1.05, cursor: 'pointer' }}
      whileTap={{ scale: 0.9 }}
      onClick={() => logout()}
    >
      <LogoutSVG width={32} height={32} />
      <span>Logout</span>
    </Container>
  )
}

export default Logout;
