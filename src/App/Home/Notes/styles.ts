import styled from "styled-components";


export const PreviewContainer = styled.div<({ selected: boolean }) >`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 240px;
  height: 240px;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
  padding: 2rem;
  border: ${p => p.selected ? `1px solid ${p.theme.sub}` : null};
`
