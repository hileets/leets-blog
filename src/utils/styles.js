import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after{
  margin:0rem;
  padding:0rem;
  box-sizing: inherit;
}

html {
  font-size:100%;
  box-sizing: border-box;
}

body {
background-color: ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.secondary};
};

p, h1, h2, h3, h4, h5, h6 {
color: ${({ theme }) => theme.secondary}
};

a {
color: ${({ theme }) => theme.secondary}
};
`
