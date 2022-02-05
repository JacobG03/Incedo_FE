import styled from "styled-components"


export const FixedContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${p => p.theme.bg};
  filter: var(--shadow);
  border-radius: var(--border-radius);
`

export const Content = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	gap: 1rem;
	background-color: rgba(0,0,0,0.2);
	border-radius: var(--border-radius2);
	box-shadow: var(--shadow-inner);
`

export const Cover = styled.div`
	left: 0px;
	top: 0px;
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.bg};
	z-index: 2;
`

export const Title = styled.h1`
	font-size: 3rem;
	font-weight: 900;
	font-style: italic;
	color: ${props => props.theme.sub};
	margin: 0;
`

export const Options = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	gap: 0.5rem;
	align-items: stretch;
`

export const Option = styled.button`
	flex-grow: 1;
	flex-basis: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.1rem;
	font-weight: 600;
	gap: 0.5rem;
	padding: 0.5rem;
	background-color: ${p => p.theme.bg};
	border-radius: var(--border-radius);
	filter: var(--shadow);
	color: ${p => p.theme.sub};

	&:focus {
		outline: 1px solid ${p => p.theme.main};
	}
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.theme.bg};
  filter: var(--shadow);
  overflow: hidden;
`

export const FormInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.25rem;
  background-color: rgba(0,0,0,0.2);
  box-shadow: var(--shadow-inner);
  padding: 0.75rem;
  border-radius: var(--border-radius);
  color: ${props => props.theme.text};
  transition: 100ms ease-in-out;
`

export const FormSubmit = styled.button`
  padding: 0.5rem 1rem;
  width: fit-content;
	display: flex;
	align-items: center;
	gap: 0.5rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.theme.main};
  outline: none;
  border: none;
  color: ${props => props.theme.bg};
  font-size: 1.25rem;
  filter: var(--shadow);
  cursor: pointer;

  &:focus {
    border: 2px solid ${p => p.theme.sub};
  }
`

export const Button = styled.button`
	border: none;
	outline: none;
	padding: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${p => p.theme.bg};
	background-color: ${p => p.theme.main};
	border-radius: var(--border-radius);
	filter: var(--shadow);

	&:focus {
		outline: 1px solid ${p => p.theme.sub};
	}
`
