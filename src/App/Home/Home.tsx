import { useEffect } from "react";
import styled from "styled-components";
import {ReactComponent as NotesSVG } from '../../assets/svg/stickynote.svg';
import { motion } from 'framer-motion'
import AnimatedPage from "./AnimatePage";
import { useNavigate } from "react-router-dom";


const Section = styled.section`
  flex-grow: 1;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius2);
  padding: 2rem;
  filter: var(--shadow);
  color: ${p => p.theme.sub};
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
  transition: 400ms ease-in-out color;

  :hover {
    color: ${ p => p.theme.main };
  }
`

const Home = () => {
  useEffect(() => {
    document.title = 'Home | Incedo'
  }, [])

  const navigate = useNavigate()

  return (
    <AnimatedPage >
      <Section
        id='notes'
        as={motion.section}
        whileHover={{cursor: 'pointer', scale: 1.025}}
        onClick={() => navigate('/notes')}
      >
        <NotesSVG width={48} height={48} />
        <span>Notes</span>
      </Section>
    </AnimatedPage>
  )
}

export default Home;
