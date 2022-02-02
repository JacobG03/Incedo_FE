import { usePreviews } from "./hooks"
import NotePreview from "./NotePreview"
import SectionPreview from "./SectionPreview"


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
  console.log(previews)

  return (
    <>
      {previews.map((preview, i) => 'body' in preview ?
        <NotePreview note={preview} key={i} />
        : <SectionPreview section={preview} key={i} />
      )}
    </>
  )
}

export default Previews;
