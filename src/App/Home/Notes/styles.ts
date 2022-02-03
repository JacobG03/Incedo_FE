import styled from "styled-components";


export const PreviewContainer = styled.div<({ selected: boolean })>`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 330px;
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
  color: ${p => p.theme.text};
  padding: 1rem;
  outline: none;
  border: ${p => p.selected ? `2px solid ${p.theme.main}` : `2px solid ${p.theme.bg}`};
`
