import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removeAlert } from "../redux/slices/alertsSlice";
import { IState, IAlert } from "../types";


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  gap: 0.5rem;
  padding: 0.5rem 0;
`

const Alerts = () => {
  const alerts = useSelector<IState, IAlert[]>(state => state.alerts.alerts)

  return (
    <Container>
      <AnimatePresence>
        {alerts.map((alert, i) => <Alert data={alert} key={i} />)}
      </AnimatePresence>
    </Container>
  )
}

const AlertContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  padding: 0.5rem 3rem;
  color: ${p => p.theme.info};
  filter: var(--shadow);
`

const Message = styled.span`
  color: ${p => p.theme.info};
  text-align: center;
`

const Loader = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: ${p => p.theme.info};
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
`

const Alert = ({ data }: { data: IAlert }) => {
  const [deleted, setDelete] = useState(false)
  const dispatch = useDispatch()

  async function handleDragEnd(event: any, info: any) {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity < -500) {
      setDelete(true)
      dispatch(removeAlert(data))
    }
  }

  const deletedRef = useRef(deleted);
  deletedRef.current = deleted;

  useEffect(() => {
    let auto_remove = setTimeout(() => {
      if (!deletedRef.current) {
        dispatch(removeAlert(data))
      }
    }, 4000)
    return () => {
      clearTimeout(auto_remove)
    }
  }, [data, dispatch])

  return (
    <AlertContainer
      as={motion.div}
      transition={{ duration: 0.4 }}
      initial={{ x: -600, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 600, opacity: 0 }}

      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <Message>{data.message}</Message>
      <Loader
        as={motion.div}
        transition={{ duration: 4, ease: 'linear' }}
        animate={{ width: '99.9%' }}
      />
    </AlertContainer>
  )
}

export default Alerts;
