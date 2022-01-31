import AnimatedPage from "../AnimatePage"
import { useSelector } from "react-redux";
import { INote, IState } from "../../../types";
import MainNotes from "./MainNotes";


const Notes = () => {
  const notes = useSelector<IState, INote[]>(state => state.notes.notes)

  return (
    <AnimatedPage>
      <MainNotes notes={notes.filter(note => note.parent_id === null)} />
    </AnimatedPage>
  )
}


export default Notes;
