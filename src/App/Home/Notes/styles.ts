import styled from "styled-components";


export const PreviewContainer = styled.div<({ selected: boolean }) >`
  flex-grow: 1;
  flex-basis: 0;
  height: 240px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  filter: var(--shadow);
  color: ${p => p.theme.text};
  padding: 1rem;
  outline: none;
  border: ${p => p.selected ? `1px solid ${p.theme.main}` : `1px solid ${p.theme.bg}`};
`

export const PreviewTop = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${p => p.theme.sub};
  font-size: 1.1rem;
`

export const PreviewMid = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`

export const PreviewLeft = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.9rem;
`

export const PreviewRight = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: rgba(0,0,0,0.2);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-inner);
`

export const PreviewRow = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const PreviewBottom = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-evenly;
  background-color: rgba(0,0,0,0.2);
  box-shadow: var(--shadow-inner);
  border-radius: var(--border-radius);
  padding: 0.5rem;
`

export const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
  color: ${p => p.theme.sub};
  filter: var(--shadow);
  font-size: 1.2rem;
  
  &:focus {
    outline: 1px solid ${p => p.theme.main};
    color: ${p => p.theme.main};
  };
  &:hover {
    outline: 1px solid ${p => p.theme.main};
    color: ${p => p.theme.main};
  }
`

export const PreviewButton2 = styled(Button)`
  flex-grow: 1;
`
