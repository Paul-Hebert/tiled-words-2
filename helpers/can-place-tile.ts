import type { Grid, Point } from '../src/types'

export interface PlacementResult {
  canPlace: boolean
  reason?: 'overlapping' | 'off-grid'
  offGridDetails?: {
    axis: 'x' | 'y'
    direction: 'negative' | 'positive'
    value: number
  }
}

/**
 * Checks if a tile can be placed at the given position without overlapping existing tiles or going outside grid bounds
 * @param tileGrid - The grid of the tile to be placed
 * @param position - The position where the tile should be placed
 * @param gridState - The current state of the board grid
 * @returns PlacementResult with detailed information about placement validity
 */
export function canPlaceTile(tileGrid: Grid, position: Point, gridState: Grid): PlacementResult {
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
      if (boardX < 0) {
        return {
          canPlace: false,
          reason: 'off-grid',
          offGridDetails: {
            axis: 'x',
            direction: 'negative',
            value: boardX,
          },
        }
      }

      if (boardX >= gridSize) {
        return {
          canPlace: false,
          reason: 'off-grid',
          offGridDetails: {
            axis: 'x',
            direction: 'positive',
            value: boardX,
          },
        }
      }

      if (boardY < 0) {
        return {
          canPlace: false,
          reason: 'off-grid',
          offGridDetails: {
            axis: 'y',
            direction: 'negative',
            value: boardY,
          },
        }
      }

      if (boardY >= gridSize) {
        return {
          canPlace: false,
          reason: 'off-grid',
          offGridDetails: {
            axis: 'y',
            direction: 'positive',
            value: boardY,
          },
        }
      }

      // Check if the position overlaps with an existing non-null cell
      if (gridState[boardY][boardX] !== null) {
        return {
          canPlace: false,
          reason: 'overlapping',
        }
      }
    }
  }

  return {
    canPlace: true,
  }
}
