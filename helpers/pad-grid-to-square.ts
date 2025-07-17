import type { Grid } from '../src/types'

/**
 * Converts a grid into a square matrix by padding with null values
 * @param grid - The input grid to pad
 * @returns A square grid with the same content padded with null values
 */
export function padGridToSquare(grid: Grid): Grid {
  if (grid.length === 0) {
    return []
  }

  // Find the maximum dimension (width or height)
  const maxWidth = Math.max(...grid.map((row) => row.length))
  const maxHeight = grid.length
  const maxDimension = Math.max(maxWidth, maxHeight)

  // Create a new square grid
  const squareGrid: Grid = []

  for (let y = 0; y < maxDimension; y++) {
    const newRow: (string | null)[] = []

    for (let x = 0; x < maxDimension; x++) {
      // If the original grid has a row at this y position and a value at this x position
      if (y < grid.length && x < grid[y].length) {
        newRow.push(grid[y][x])
      } else {
        newRow.push(null)
      }
    }

    squareGrid.push(newRow)
  }

  return squareGrid
}
