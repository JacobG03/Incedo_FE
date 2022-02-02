import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes } from "../../../redux/calls/notes_calls";
import { fetchSections } from "../../../redux/calls/sections_calls";
import AnimatedPage from "../AnimatePage"
import Dashboard from "./Dashboard";
import Previews from "./Previews";


const Notes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchNotes(dispatch)
    fetchSections(dispatch)
  }, [dispatch])

  return (
    <AnimatedPage>
      <Dashboard parent_id={null}>
        <Previews />
      </Dashboard>
    </AnimatedPage>
  )
}

export default Notes;
