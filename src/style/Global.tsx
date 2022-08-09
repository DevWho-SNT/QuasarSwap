import { createGlobalStyle } from 'styled-components'
import { QuasarTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends QuasarTheme {}
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Azonix";
    src: url("https://quasarswap-app.herokuapp.com/Azonix.otf") format("opentype");
  }

  @font-face {
    font-family: "Elegance";
    src: url("https://novanetwork.io/download/Rounded_Elegance.ttf") format("truetype");
  }

  * {
    font-family: 'Elegance', sans-serif;
  }
  body {
    overflow-x: hidden !important;
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
