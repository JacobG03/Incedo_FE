import { useSelector } from "react-redux"
import { INote, ISection, IState } from "../../../types"


interface Options {
  favorite: boolean,
  sort: string,
  reverse: boolean
}

// "Preview" meaning INote | ISection

export const usePreviews = (parent_id: number | null, options: Options) => {
  const all_notes = useSelector<IState, INote[]>(state => state.notes.notes)
  const all_sections = useSelector<IState, ISection[]>(state => state.sections.sections)

  const notes = all_notes.filter(note => note.parent_id === parent_id)
  const sections = all_sections.filter(section => section.parent_id === parent_id)

  let previews = [...notes, ...sections]
  
  if (options.favorite) {
    previews = previews.filter(preview => preview.favorite === true)
  }
  switch (options.sort) {
    case 'timestamp':
      previews = previews.sort((a, b) => a.timestamp - b.timestamp)
      break;
    case 'modified':
      previews = previews.sort((a, b) => b.modified - a.modified)
      break;
  }
  if (options.reverse) {
    previews = previews.reverse()
  }

  return previews
}
