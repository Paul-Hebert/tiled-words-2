import { toRaw } from 'vue'
import type { Grid } from '../src/types'

/**
 * Converts a grid into a square matrix by padding with null values, centering the content
 * @param grid - The input grid to pad
 * @returns A square grid with the same content centered and padded with null values
 */
export function padGridToSquare(grid: Grid): Grid {
  if (grid.length === 0) {
    return []
  }

  let currentGrid = structuredClone(toRaw(grid)) as Grid
  let addAtStart = false

  // Keep adding rows/columns until the grid is square
  while (currentGrid.length !== Math.max(...currentGrid.map((row) => row.length))) {
    const maxWidth = Math.max(...currentGrid.map((row) => row.length))
    const maxHeight = currentGrid.length
    const maxDimension = Math.max(maxWidth, maxHeight)

    if (maxHeight < maxDimension) {
      // Need to add rows
      const newRow = new Array(maxWidth).fill(null)
      if (addAtStart) {
        currentGrid.unshift(newRow)
      } else {
        currentGrid.push(newRow)
      }
      addAtStart = !addAtStart
    } else if (maxWidth < maxDimension) {
      // Need to add columns
      if (addAtStart) {
        // Add column at the start
        currentGrid = currentGrid.map((row) => [null, ...row])
      } else {
        // Add column at the end
        currentGrid = currentGrid.map((row) => [...row, null])
      }
      addAtStart = !addAtStart
    }
  }

  return currentGrid
}
