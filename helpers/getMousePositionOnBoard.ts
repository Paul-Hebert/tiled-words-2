import type { Point } from '../src/types'

/**
 * Converts screen coordinates to board coordinates
 */
export function getMousePositionOnBoard(
  position: Point,
  startingDragOffset: Point,
  boardElement: SVGSVGElement,
): Point {
  // Calculate the adjusted mouse position by subtracting the drag offset
  const adjustedMousePosition = {
    x: position.x - startingDragOffset.x,
    y: position.y - startingDragOffset.y,
  }

  const boardBoundingClientRect = boardElement.getBoundingClientRect()

  // Convert screen coordinates to board coordinates
  return {
    x: adjustedMousePosition.x - boardBoundingClientRect.left,
    y: adjustedMousePosition.y - boardBoundingClientRect.top,
  }
}
