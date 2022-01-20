import 'styled-components';

// Typing support for theme object
declare module 'styled-components' {
  export interface DefaultTheme {
    id: number,
    name: string,
    bg: string,
    main: string,
    sub: string,
    info: string,
    text: string,
    error: string
  }
}
