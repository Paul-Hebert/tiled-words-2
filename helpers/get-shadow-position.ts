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

  // Calculate the grid position (snap to grid)
  return {
    x: Math.floor(boardPosition.x / (boardBoundingClientRect.width / boardGridScale)),
    y: Math.floor(boardPosition.y / (boardBoundingClientRect.height / boardGridScale) + 1),
  }
}
