import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  :root {
    --shadow: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.40));
    --shadow-inner: inset 0px 4px 8px 5px rgba(0, 0, 0, 0.25);

    --border-radius: 4px;
    --border-radius2: 8px;
  };
  *, *::after, *::before {
    box-sizing: border-box;
  };
  html {
    min-height: -webkit-fill-available;
  };
  body {
    margin: 0;
    padding: 0;
    background: ${props => props.theme.bg};
    color: ${props => props.theme.text};
    font-family: 'Overlock', cursive;
  };
`;

export default GlobalStyle;