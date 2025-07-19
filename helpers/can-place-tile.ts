import type { Grid, Point } from '../src/types'

/**
 * Checks if a tile can be placed at the given position without overlapping existing tiles or going outside grid bounds
 * @param tileGrid - The grid of the tile to be placed
 * @param position - The position where the tile should be placed
 * @param gridState - The current state of the board grid
 * @returns true if the tile can be placed, false otherwise
 */
export function canPlaceTile(tileGrid: Grid, position: Point, gridState: Grid): boolean {
  const gridSize = gridState.length

  // Iterate through each cell in the tile's grid
  for (let tileY = 0; tileY < tileGrid.length; tileY++) {
    for (let tileX = 0; tileX < tileGrid[tileY].length; tileX++) {
      const cellValue = tileGrid[tileY][tileX]

      // Skip null cells in the tile
      if (cellValue === null) {
        continue
      }

      // Calculate the position on the board
      const boardX = position.x + tileX
      const boardY = position.y + tileY

      // Check if the position is outside the grid bounds
      if (boardX < 0 || boardX >= gridSize || boardY < 0 || boardY >= gridSize) {
        return false
      }

      // Check if the position overlaps with an existing non-null cell
      if (gridState[boardY][boardX] !== null) {
        return false
      }
    }
  }

  return true
}
