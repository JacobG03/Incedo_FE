import styled from "styled-components"
import { usePreviews, useSelect } from "./hooks"
import NotePreview from "./NotePreview"
import SectionPreview from "./SectionPreview"


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-radius: var(--border-radius);
`

interface Options {
  favorite: boolean,
  sort: string,
  reverse: boolean
}

interface Props {
  options?: Options,
  parent_id?: number | null
}

const Previews = (props: Props) => {
  const previews = usePreviews(props.parent_id!, props.options!)
  const selected = useSelect(previews.length)

  return (
    <Container>
      {previews.map((preview, i) => 'body' in preview ?
        <NotePreview note={preview} key={(i * Math.random())} selected={selected === i ? true : false} />
        : <SectionPreview section={preview} key={(i * Math.random())} selected={selected === i ? true : false} />
      )}
    </Container>
  )
}

export default Previews;
