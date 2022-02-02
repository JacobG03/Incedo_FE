import AnimatedPage from "../AnimatePage"
import { useDispatch, useSelector } from "react-redux";
import { INote, ISection, IState } from "../../../types";
import { useEffect, useState } from "react";
import { fetchNotes, fetchSections } from "../../../redux/calls/notes_calls";
import { Container } from "../../../shared/styles";
import styled from "styled-components";
import { useNotes, useSections } from "./hooks";
import CreateNote from "./CreateNote";
import NotePreview from "./NotePreview";
import SectionPreview from "./SectionPreview";


const Span = styled.div<({ highlight: boolean }) >`
  color: ${p => p.highlight ? p.theme.sub : null};
`

const Notes = () => {
  const [fav, setFav] = useState(false)
  const [sort, setSort] = useState('timestamp')
  const [reverse, setReverse] = useState(false)

  const [showCreate, setShowCreate] = useState(false)

  const notes = useSelector<IState, INote[]>(state => state.notes.notes)
  const sections = useSelector<IState, ISection[]>(state => state.sections.sections)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchNotes(dispatch)
    fetchSections(dispatch)
  }, [dispatch])

  return (
    <AnimatedPage>
      <Container>
        <Span highlight={showCreate} onClick={() => setShowCreate(!showCreate)}>Create Note</Span>
        <Span highlight={fav} onClick={() => setFav(!fav)}>Favorite</Span>
        <Span highlight={reverse} onClick={() => setReverse(!reverse)}>Reverse</Span>
        <Span
          highlight={sort === 'modified' ? true : false}
          onClick={() => sort === 'modified' ? setSort('timestamp') : setSort('modified')}
        >Modified</Span>
      </Container>
      <>
        <CreateNote display={showCreate} setDisplay={setShowCreate} />
        {useNotes(
          notes.filter(note => note.parent_id === null),
          {
            filters: {
              favorite: fav
            },
            sort_by: sort,
            reverse: reverse
          }
        ).map(note => <NotePreview key={note.id} note={note} />)}
        {useSections(
          sections.filter(section => section.parent_id === null),
          {
            filters: {
              favorite: fav
            },
            sort_by: sort,
            reverse: reverse
          }
        ).map(section => <SectionPreview key={section.id} section={section} />)}
      </>
    </AnimatedPage>
  )
}


export default Notes;
