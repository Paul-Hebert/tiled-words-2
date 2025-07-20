import type { Point } from '../src/types'

/**
 * Calculates the shadow position for a tile on the board grid
 */
export function getShadowPosition(
  boardPosition: Point,
  boardElement: SVGSVGElement,
  boardGridScale: number,
): Point {
  const boardBoundingClientRect = boardElement.getBoundingClientRect()

  // Calculate cell dimensions
  const cellWidth = boardBoundingClientRect.width / boardGridScale
  const cellHeight = boardBoundingClientRect.height / boardGridScale

  // Calculate the position within the current cell (0 to 1)
  const cellRelativeX = (boardPosition.x % cellWidth) / cellWidth
  const cellRelativeY = (boardPosition.y % cellHeight) / cellHeight

  // Snap to the nearest corner (0, 0.5, or 1 for each axis)
  const snappedX = cellRelativeX < 0.5 ? 0 : 1
  const snappedY = cellRelativeY < 0.5 ? 0 : 1

  // Calculate the base grid position
  const baseGridX = Math.floor(boardPosition.x / cellWidth)
  const baseGridY = Math.floor(boardPosition.y / cellHeight)

  // Return the corner position
  return {
    x: baseGridX + snappedX,
    y: baseGridY + snappedY,
  }
}
