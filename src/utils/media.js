import { css } from 'styled-components'

const sizes = {
    largest: 1400,
    extraLarge: 1200,
    large: 992,
    medium: 768,
    small: 576,
}
export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
    return acc
}, {})