import type { Grid, Direction } from '../src/types'
import { toRaw } from 'vue'

/**
 * Rotates a square grid matrix in the specified direction
 * @param grid - The square grid to rotate
 * @param direction - The direction to rotate ('cw' for clockwise, 'ccw' for counterclockwise)
 * @returns The rotated grid
 * @throws Error if the grid is not square
 */
export function rotateGrid(grid: Grid, rotations: number): Grid {
  if (grid.length === 0) {
    return []
  }

  let rotatedGrid = structuredClone(toRaw(grid)) as Grid
  for (let i = 0; i < rotations; i++) {
    rotatedGrid = rotateGridOnce(rotatedGrid)
  }

  return rotatedGrid
}

function rotateGridOnce(grid: Grid) {
  const rotatedGrid: Grid = []

  // Check if the grid is square
  const size = grid.length
  for (let i = 0; i < size; i++) {
    if (grid[i].length !== size) {
      throw new Error('Grid must be square to rotate')
    }
  }

  // Rotate clockwise: transpose then reverse each row
  for (let col = 0; col < size; col++) {
    const newRow: (string | null)[] = []
    for (let row = size - 1; row >= 0; row--) {
      newRow.push(grid[row][col])
    }
    rotatedGrid.push(newRow)
  }
  return rotatedGrid
}
