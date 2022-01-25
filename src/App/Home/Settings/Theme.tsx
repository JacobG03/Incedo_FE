import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { updateTheme } from "../../../redux/calls/theme_calls"
import { ITheme } from "../../../types"


const Container = styled.div<({ preview: ITheme }) >`
  grid-column: auto;
  grid-row: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  border: ${p => (p.preview.id === p.theme.id ? `2px solid ${p.theme.sub}` : null)};
  padding: 1rem;
  filter: var(--shadow);
`

const Preview = styled.div<{ preview: ITheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 2rem;
  background-color: ${p => p.preview.bg};
  color: ${p => p.preview.text};
`

type Props = {
  data: ITheme
}

const Theme = (props: Props) => {
  const dispatch = useDispatch()

  return (
    <Container
      as={motion.div}
      whileHover={{ scale: 1.1, cursor: 'pointer' }}
      whileTap={{ scale: 0.9 }}
      onClick={() => updateTheme(dispatch, { id: props.data.id })}
      preview={props.data}
    >
      <Preview preview={props.data}>
        <span>{props.data.name}</span>
      </Preview>
    </Container>
  )
}

export default Theme;
