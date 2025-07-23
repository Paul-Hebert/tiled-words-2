import type { Grid, Tile } from '../src/types'
import { rotateGrid } from './rotate-grid'
import { logGrid } from './log-grid'

/**
 * Computes the current state of the board grid by overlaying all tiles at their positions
 * @param tiles - Array of tiles with their positions and grids
 * @param gridSize - The size of the board grid (e.g., 10 for a 10x10 board)
 * @returns A 2D matrix representing the current state of the board
 */
export function computeGridState(tiles: Tile[], gridSize: number): Grid {
  // Initialize an empty grid filled with null values
  const boardGrid: Grid = []
  for (let y = 0; y < gridSize; y++) {
    const row: (string | null)[] = []
    for (let x = 0; x < gridSize; x++) {
      row.push(null)
    }
    boardGrid.push(row)
  }

  // Overlay each tile onto the board grid
  for (const tile of tiles) {
    const { position, grid, rotations } = tile

    const rotatedGrid = rotateGrid(grid, rotations)

    // Iterate through each cell in the tile's grid
    for (let tileY = 0; tileY < rotatedGrid.length; tileY++) {
      for (let tileX = 0; tileX < rotatedGrid[tileY].length; tileX++) {
        const cellValue = rotatedGrid[tileY][tileX]

        // Skip null cells in the tile
        if (cellValue === null) {
          continue
        }

        // Calculate the position on the board
        const boardX = position.x + tileX
        const boardY = position.y + tileY

        // Check if the position is within the board bounds
        if (boardX >= 0 && boardX < gridSize && boardY >= 0 && boardY < gridSize) {
          // Place the tile cell onto the board
          boardGrid[boardY][boardX] = cellValue
        }
      }
    }
  }

  // logGrid(boardGrid)

  return boardGrid
}
