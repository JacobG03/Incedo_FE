import { useEffect } from "react";
import AnimatedPage from "../AnimatePage"
import CreateNote from "./CreateNote";
import { fetchNotes } from "../../../redux/calls/notes_calls";
import { useDispatch, useSelector } from "react-redux";
import { IState, INote } from "../../../types";
import styled from "styled-components";
import { m } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";


const NotesContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const NoteContainer = styled.div`
  flex-grow: 1;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${ p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
  padding: 0.5rem;
`

const Notes = () => {
  const notes = useSelector<IState, INote[]>(state => state.notes.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchNotes(dispatch)
  }, [dispatch])

  return (
    <AnimatedPage>
      <CreateNote />
      <NotesContainer>
        {notes.map(note =>
          <NoteContainer 
            key={note.id}
            as={m.div}
            whileHover={{cursor: 'pointer', scale: 1.05}}
            onClick={() => navigate(`/notes/${note.id}`)}
          >
            <span>{note.title}</span>
          </NoteContainer>)}
      </NotesContainer>
      <Outlet />
    </AnimatedPage>
  )
}

export default Notes;
