import axios from '../../../../services/index'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchNotes } from "../../../../redux/calls/notes_calls";
import { fetchSections } from "../../../../redux/calls/sections_calls";
import { ISection } from "../../../../types";
import AnimatedPage from "../../AnimatePage";
import Create from "../Create";
import Dashboard from "../Dashboard";
import Previews from "../Previews";


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

  useEffect(() => {
    const handleKeys = (e: any) => {
      if (e.keyCode === 27) {
        if (section?.parent_id) {
          navigate(`/sections/${section?.parent_id}`)
        } else {
          navigate('/notes')
        }
      }
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [navigate, section])

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
