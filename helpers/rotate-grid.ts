import type { Grid, Direction } from '../src/types'

/**
 * Rotates a square grid matrix in the specified direction
 * @param grid - The square grid to rotate
 * @param direction - The direction to rotate ('cw' for clockwise, 'ccw' for counterclockwise)
 * @returns The rotated grid
 * @throws Error if the grid is not square
 */
export function rotateGrid(grid: Grid, direction: Direction): Grid {
  if (grid.length === 0) {
    return []
  }

  // Check if the grid is square
  const size = grid.length
  for (let i = 0; i < size; i++) {
    if (grid[i].length !== size) {
      throw new Error('Grid must be square to rotate')
    }
  }

  const rotatedGrid: Grid = []

  if (direction === 'cw') {
    // Rotate clockwise: transpose then reverse each row
    for (let col = 0; col < size; col++) {
      const newRow: (string | null)[] = []
      for (let row = size - 1; row >= 0; row--) {
        newRow.push(grid[row][col])
      }
      rotatedGrid.push(newRow)
    }
  } else {
    // Rotate counterclockwise: reverse each row then transpose
    for (let col = size - 1; col >= 0; col--) {
      const newRow: (string | null)[] = []
      for (let row = 0; row < size; row++) {
        newRow.push(grid[row][col])
      }
      rotatedGrid.push(newRow)
    }
  }

  return rotatedGrid
}
