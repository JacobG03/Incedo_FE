import { useEffect } from "react";
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

  return (
    <AnimatedPage>
      <Create parent_id={null} />
      <Dashboard>
        <Previews />
      </Dashboard>
    </AnimatedPage>
  )
}

export default Notes;
