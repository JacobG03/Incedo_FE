import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IGetStatus, IState } from "../../../types";


interface Props {
  children: JSX.Element
  parent_id: number | null
}

const Dashboard = (props: Props) => {
  const [favorite, setFavorite] = useState(false)
  const [sort, setSort] = useState('timestamp')
  const [reverse, setReverse] = useState(false)

  const notes_status = useSelector<IState, IGetStatus>(state => state.notes.fetchNotes)
  const sections_status = useSelector<IState, IGetStatus>(state => state.sections.fetchSections)

  const options = {
    favorite: favorite,
    sort: sort,
    reverse: reverse
  }

  if (!notes_status.finished || !sections_status.finished) {
    return <h1>Loading</h1>
  }
  return (
    <>
      <span onClick={() => setFavorite(!favorite)}>Favorite: {`${favorite}`}</span>
      <span>Sort method: {sort}</span>
      <span onClick={() => setSort('timestamp')}>Timestamp</span>
      <span onClick={() => setSort('modified')}>Modified</span>
      <span onClick={() => setReverse(!reverse)}>Reverse: {`${reverse}`}</span>
      {React.cloneElement(props.children, { 
        options: options,
        parent_id: props.parent_id
      })}
    </>
  )
}

export default Dashboard;
