import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string,
    main: string,
    sub: string,
    info: string,
    text: string,
    error: string
  }
}
