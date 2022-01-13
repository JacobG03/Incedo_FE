import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }

  html {
    min-height: -webkit-fill-available;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${props => props.theme.bg};
    color: ${props => props.theme.text};
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export const DefaultTheme = {
  bg: '#212135',
  main: '#be3c88',
  sub: '#19b3b8',
  info: '#78c729',
  text: '#838686',
  error: '#ca4754'
};

export default GlobalStyle;
