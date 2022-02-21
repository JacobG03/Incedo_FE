import axios from '../../../../services/index'
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchNotes } from "../../../../redux/calls/notes_calls";
import { fetchSections } from "../../../../redux/calls/sections_calls";
import { ISection } from "../../../../types";
import { ReactComponent as BackSVG } from '../../../../assets/svg/arrow-left.svg';
import AnimatedPage from "../../AnimatePage";
import Create from "../Create";
import Dashboard from "../Dashboard";
import Previews from "../Previews";
import styled from 'styled-components';
import { Button } from '../styles';
import { motion } from 'framer-motion';


const Top = styled.div`
  width: 100%;
  height: fit-content;
`

const Section = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchNotes(dispatch)
    fetchSections(dispatch)
  })

  const id = location.pathname.split('/').at(-1)!
  const section = useSection(id)

  const handleBack = useCallback(() => {
    if (section?.parent_id) {
      navigate(`/sections/${section?.parent_id}`)
    } else {
      navigate('/notes')
    }
  }, [navigate, section])

  useEffect(() => {
    const handleKeys = (e: any) => {
      if (e.keyCode === 27) {
        handleBack()
      }
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [navigate, section, handleBack])


  useEffect(() => {
    const handleKeys = (e: any) => {
      if (selected !== null) {
        if (e.keyCode === 38) {
          e.preventDefault()
          if (selected > 0) {
            setSelected(selected - 1)
          } else {
            setSelected(null)
            e.target.blur()
          }
        }
        else if (e.keyCode === 40) {
          e.preventDefault()
          if (selected < 2) {
            setSelected(selected + 1)
          } else {
            setSelected(null)
          }
        }
      } else if (e.keyCode === 40) {
        e.preventDefault()
        setSelected(0)
      } else if (e.keyCode === 38) {
        e.preventDefault()
        setSelected(2)
      }
    }

    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [selected])

  if (!section) {
    return null
  }

  return (
    <AnimatedPage>
      <Top>
        <Button
          as={motion.button}
          whileHover={{scale: 1.01, cursor: 'pointer'}}
          whileTap={{scale: 0.95}}
          onClick={() => handleBack()}
        >
          <BackSVG />
        </Button>
      </Top>
      <Create parent_id={section.id} selected={selected === 0 ? true : false} />
      <Dashboard selected={selected === 1 ? true : false} parent_id={section.id}>
        <Previews selected={selected === 2 ? true : false} parent_id={section.id} setSelected={setSelected} />
      </Dashboard>
    </AnimatedPage>
  )
}

const useSection = (id: string) => {
  const [section, setSection] = useState<ISection | null>(null)

  useEffect(() => {
    axios.get(`/sections/${id}`)
      .then(res => setSection(res.data))
      .catch(error => console.log(error.response))
  }, [id])

  return section
}

export default Section;
