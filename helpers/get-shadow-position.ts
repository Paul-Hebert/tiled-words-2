import type { Point } from '../src/types'

/**
 * Calculates the shadow position for a tile on the board grid
 */
export function getShadowPosition(
  boardElement: SVGSVGElement,
  tileElement: SVGGElement,
  numberOfRowsAndColumns: number,
): Point {
  const boardBoundingClientRect = boardElement.getBoundingClientRect()
  const tileBoundingClientRect = tileElement.getBoundingClientRect()

  const boardPosition = {
    x: tileBoundingClientRect.x - boardBoundingClientRect.x,
    y: tileBoundingClientRect.y - boardBoundingClientRect.y,
  }

  const percentPerCell = 1 / numberOfRowsAndColumns

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

  // Return the cell with the closest centerpoint
  return {
    x: snappedX,
    y: snappedY,
  }
}
