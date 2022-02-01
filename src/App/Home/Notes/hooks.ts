import { INote, ISection } from "../../../types"


interface Options {
  filters?: {
    favorite?: boolean
  },
  sort_by?: string,
  reverse?: boolean,
}

/* 
  Takes in a list of notes and options
  Returns a filtered, sorted list of notes (based on options provided)
*/
export const useNotes = (notes: INote[], options?: Options) => {
  let new_notes = notes.slice()
  if (options) {
    if (options.filters) {
      if (options.filters.favorite) {
        new_notes = new_notes.filter(note => note.favorite === true)
      }
    }
    if (options.sort_by) {
      switch (options.sort_by) {
        case 'timestamp':
          new_notes = new_notes.sort((a, b) => a.timestamp - b.timestamp)
          break;
        case 'modified':
          new_notes = new_notes.sort((a, b) => b.modified - a.modified)
          break;
      }
    }
    if (options.reverse) {
      new_notes = new_notes.reverse()
    }
  }

  return new_notes
}

/* 
  Takes in a list of notes and options
  Returns a filtered, sorted list of notes (based on options provided)
*/

export const useSections = (sections: ISection[], options?: Options) => {
  let new_sections = sections.slice()
  if (options) {
    if (options.filters) {
      if (options.filters.favorite) {
        new_sections = new_sections.filter(section => section.favorite === true)
      }
    }
    if (options.sort_by) {
      switch (options.sort_by) {
        case 'timestamp':
          new_sections = new_sections.sort((a, b) => a.timestamp - b.timestamp)
          break;
        case 'modified':
          new_sections = new_sections.sort((a, b) => b.modified - a.modified)
          break;
      }
    }
    if (options.reverse) {
      new_sections = new_sections.reverse()
    }
  }

  return new_sections
}