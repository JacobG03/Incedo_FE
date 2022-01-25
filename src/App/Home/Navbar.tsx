import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { IState, IMeInfo } from "../../types"
import { ReactComponent as SettingsSVG } from '../../assets/svg/setting-2.svg';
import { ReactComponent as NotificationSVG } from '../../assets/svg/notification.svg';
import Alerts from "../../shared/Alerts"


const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 500;
`

const Logo = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p => p.theme.sub};
  font-size: 2.5rem;
  font-weight: 800;
  font-style: italic;
`

const Items = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  gap: 0.5rem;
  background-color: rgba(0,0,0,0.2);
  border-radius: var(--border-radius2);
  box-shadow: var(--shadow-inner);
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border-radius: var(--border-radius);
  background-color: ${p => p.theme.bg};
  filter: var(--shadow);
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius);
`

const Content = styled.div`
  padding: 0 1rem;
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Main = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${p => p.theme.bg};
`

const Navbar = () => {
  const navigate = useNavigate()
  const meInfo = useSelector<IState, IMeInfo | null>(state => state.me.meInfo)
  const theme = useTheme()


  return (
    <Container>
      <Content>
        <Main>
          <Logo
            as={motion.div}
            whileHover={{ scale: 1.1, cursor: 'pointer' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
          >
            <span>Incedo</span>
          </Logo>
          <Items>
            <Item
              as={motion.div}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
              whileTap={{ scale: 0.9 }}
            >
              <NotificationSVG width={32} height={32} color={theme.main} />
            </Item>
            <Item
              as={motion.div}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/settings')}
            >
              <SettingsSVG width={32} height={32} color={theme.main} />
            </Item>
            <Item
              as={motion.div}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/profile')}
            >
              <Avatar src={meInfo?.avatar_url} />
            </Item>
          </Items>
        </Main>
        <Alerts />
      </Content>
    </Container >
  )
}

export default Navbar;
