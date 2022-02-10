import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { usePreviews } from "./hooks"
import NotePreview from "./NotePreview"
import SectionPreview from "./SectionPreview"


const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-radius: var(--border-radius);
  outline: none;
  background-color: rgba(0,0,0,0.2);
  padding: 0.5rem;
`

const Container2 = styled(Container)`
  align-items: center;
  justify-content: center;
  color: ${ p => p.theme.text};
`

interface Options {
  favorite: boolean,
  sort: string,
  reverse: boolean
}

interface Props {
  selected: boolean,
  setSelected: (selected: number | null) => void,
  options?: Options,
  parent_id?: number | null
}

const Previews = (props: Props) => {
  const previews = usePreviews(props.parent_id!, props.options!)
  const [selected, setSelected] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    const handleKeys = (e: any) => {
      if (props.selected) {
        if (selected !== null) {
          if (e.keyCode === 37) {
            if (selected > 0) {
              setSelected(selected - 1)
            }
          }
          else if (e.keyCode === 39) {
            if (selected < previews.length - 1) {
              setSelected(selected + 1)
            } else {
              setSelected(0)
            }
          }
          else if (e.keyCode === 38 || e.keyCode === 40) {
            setSelected(null)
          }
        }
      }
    }
    
    containerRef.current?.addEventListener('keydown', handleKeys)
    return () => containerRef.current?.removeEventListener('keydown', handleKeys)
    
  }, [props.selected, previews, selected, containerRef])
  
  useEffect(() => {
    if (previews.length === 0 && props.selected) {
      props.setSelected(0)
    }
    if (props.selected && containerRef.current) {
      containerRef.current.tabIndex = -1
      setSelected(0)
    } 
  }, [containerRef, props, previews.length])
  
  if (previews.length === 0 ) {
    return (
      <Container2>
        <h1 style={{cursor: 'default'}}>Nothing here</h1>
      </Container2>
    )
  }
  
  return (
    <Container ref={containerRef}>
      {previews.map((preview, i) => 'body' in preview ?
        <NotePreview note={preview} key={((i + 1) * Math.random())} selected={selected === i ? true : false} />
        : <SectionPreview section={preview} key={((i + 1) * Math.random())} selected={selected === i ? true : false} />
        )}
    </Container>
  )
}

export default Previews;
