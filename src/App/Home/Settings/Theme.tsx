import { m } from "framer-motion"
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
  padding: 1rem;
  outline: ${p => (p.preview.id === p.theme.id ? `1px solid ${p.theme.main}` : null)};

  &:focus {
    outline: 1px solid ${p => p.theme.main};
  }
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
  text-align: center;
`

type Props = {
  data: ITheme
}

const Theme = (props: Props) => {
  const dispatch = useDispatch()

  return (
    <Container
      as={m.button}
      whileHover={{ scale: 1.05, cursor: 'pointer' }}
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
