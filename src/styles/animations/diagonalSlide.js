import { keyframes } from 'styled-components'

const diagonalSlide = keyframes`
  0% {
    transform: translate3d(0, 0, 0)
  }

  100% {
    transform: translate3d(-1000px, 1000px, 0)
  }
`

export { diagonalSlide }
