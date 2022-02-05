import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as NotesSVG } from '../../assets/svg/stickynote.svg';
import { motion } from 'framer-motion'
import AnimatedPage from "./AnimatePage";
import { useNavigate } from "react-router-dom";


const Section = styled.section<({ selected: boolean }) >`
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
  outline: ${p => p.selected ? `2px solid ${p.theme.main}` : 'none'};

  :hover {
    color: ${p => p.theme.main};
  }
`

const Home = () => {
  useEffect(() => {
    document.title = 'Home | Incedo'
  }, [])

  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    const handleKeys = (e: any) => {
      if (selected !== null) {
        if (e.keyCode === 38) {
          if (selected > 0) {
            setSelected(selected - 1)
          } else {
            setSelected(null)
          }
        }
        else if (e.keyCode === 40) {
          if (selected < 1) {
            setSelected(selected + 1)
          } else {
            setSelected(0)
          }
        }
      } else if (e.keyCode === 40) {
        setSelected(0)
      } else if (e.keyCode === 38) {
        setSelected(1)
      }
    }

    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [selected])

  return (
    <AnimatedPage >
      <NoteNavigate selected={selected === 0 ? true: false} />
    </AnimatedPage>
  )
}

const NoteNavigate = ({ selected }: { selected: boolean }) => {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handleKeys = (e: any) => {
      if (selected) {
        console.log(e.keyCode)
        if (e.keyCode === 13) {
          navigate('/notes')
        }
      }
    }
    if (selected && sectionRef.current) {
      sectionRef.current.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
    }

    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [selected, sectionRef, navigate])

  return (
    <Section
      selected={selected}
      as={motion.section}
      whileHover={{ cursor: 'pointer', scale: 1.025 }}
      onClick={() => navigate('/notes')}
    >
      <NotesSVG width={48} height={48} />
      <span>Notes</span>
    </Section>
  )
}

export default Home;
