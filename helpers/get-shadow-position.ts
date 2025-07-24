import type { Point, Grid, Tile } from '../src/types'
import { canPlaceTile } from './can-place-tile'
import { rotateGrid } from './rotate-grid'

/**
 * Calculates the shadow position for a tile on the board grid
 * If the initial position is invalid, finds the closest valid adjacent or diagonal position
 * If the position is off-grid, moves it until it's on grid
 */
export function getShadowPosition(
  boardElement: SVGSVGElement,
  tileElement: SVGGElement,
  numberOfRowsAndColumns: number,
  selectedTile: Tile,
  gridState: Grid,
): Point {
  const boardBoundingClientRect = boardElement.getBoundingClientRect()
  const tileBoundingClientRect = tileElement.getBoundingClientRect()

  const boardPosition = {
    x: tileBoundingClientRect.x - boardBoundingClientRect.x,
    y: tileBoundingClientRect.y - boardBoundingClientRect.y,
  }

  const percentPositionOnBoard = {
    x: boardPosition.x / boardBoundingClientRect.width,
    y: boardPosition.y / boardBoundingClientRect.height,
  }

  // Calculate the base grid position
  const baseGridX = Math.floor(percentPositionOnBoard.x * numberOfRowsAndColumns)
  const baseGridY = Math.floor(percentPositionOnBoard.y * numberOfRowsAndColumns)

  // Calculate the position within the current cell (0 to 1)
  const cellRelativeX = (percentPositionOnBoard.x * numberOfRowsAndColumns) % 1
  const cellRelativeY = (percentPositionOnBoard.y * numberOfRowsAndColumns) % 1

  // Determine which cell has the closest centerpoint
  const snappedX = cellRelativeX < 0.5 ? baseGridX : baseGridX + 1
  const snappedY = cellRelativeY < 0.5 ? baseGridY : baseGridY + 1

  // Get the rotated grid
  const rotatedGrid = rotateGrid(selectedTile.grid, selectedTile.rotations)

  let initialPosition: Point = {
    x: snappedX,
    y: snappedY,
  }

  // Check if the initial position is valid
  let placementResult = canPlaceTile(rotatedGrid, initialPosition, gridState)

  // If it's off-grid, move it until it's on grid
  if (
    !placementResult.canPlace &&
    placementResult.reason === 'off-grid' &&
    placementResult.offGridDetails
  ) {
    // Move cell by cell until the tile is on the grid
    while (
      !placementResult.canPlace &&
      placementResult.reason === 'off-grid' &&
      placementResult.offGridDetails
    ) {
      const { axis, direction } = placementResult.offGridDetails

      if (axis === 'x') {
        if (direction === 'negative') {
          // Tile is off the left edge, move it right
          initialPosition.x++
        } else {
          // Tile is off the right edge, move it left
          initialPosition.x--
        }
      } else if (axis === 'y') {
        if (direction === 'negative') {
          // Tile is off the top edge, move it down
          initialPosition.y++
        } else {
          // Tile is off the bottom edge, move it up
          initialPosition.y--
        }
      }

      // Check if the adjusted position is now valid
      placementResult = canPlaceTile(rotatedGrid, initialPosition, gridState)
    }
  }

  // If the position is now valid, return it
  if (placementResult.canPlace) {
    return initialPosition
  }

  // If still invalid, find the closest valid position among adjacent and diagonal cells
  const candidatePositions: Array<{ position: Point; distance: number }> = []

  // Generate all adjacent and diagonal positions
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue // Skip the original position

      const candidatePosition: Point = {
        x: initialPosition.x + dx,
        y: initialPosition.y + dy,
      }

      // Check if this position is valid
      const candidatePlacementResult = canPlaceTile(rotatedGrid, candidatePosition, gridState)
      if (candidatePlacementResult.canPlace) {
        // Calculate distance from the original position
        const distance = Math.sqrt(dx * dx + dy * dy)
        candidatePositions.push({ position: candidatePosition, distance })
      }
    }
  }

  // Sort by distance (closest first)
  candidatePositions.sort((a, b) => a.distance - b.distance)

  // Return the closest valid position, or the original position if none found
  return candidatePositions.length > 0 ? candidatePositions[0].position : initialPosition
}
