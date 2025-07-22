import { type Grid } from '../src/types'

export const logGrid = (grid: Grid) => {
  console.log(...grid.map((row) => row.map((cell) => cell || '.').join(' ')).join('\n'))
}
