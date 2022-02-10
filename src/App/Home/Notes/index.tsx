import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes } from "../../../redux/calls/notes_calls";
import { fetchSections } from "../../../redux/calls/sections_calls";
import AnimatedPage from "../AnimatePage"
import Dashboard from "./Dashboard";
import { useEscape } from "../hooks";
import Previews from "./Previews";
import Create from "./Create";


const Notes = () => {
  const dispatch = useDispatch()
  useEscape('/')

  useEffect(() => {
    fetchNotes(dispatch)
    fetchSections(dispatch)
  }, [dispatch])

  const [selected, setSelected] = useState<number | null>(null)

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

  return (
    <AnimatedPage>
      <Create parent_id={null} selected={selected === 0 ? true : false} />
      <Dashboard selected={selected === 1 ? true : false}>
        <Previews selected={selected === 2 ? true: false} setSelected={setSelected} />
      </Dashboard>
    </AnimatedPage>
  )
}

export default Notes;
