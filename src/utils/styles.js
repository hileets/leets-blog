import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.backgroundColor}
    };
    p, h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.textColor}
    };
    a {
        color: ${({ theme }) => theme.linkColor}
    };
`
