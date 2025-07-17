import type { Point } from '../src/types'

/**
 * Calculates the scaled delta for drag adjustments based on board scale
 */
export function getBoardScaledDelta(
  position: Point,
  startingDragPoint: Point,
  boardElement: SVGSVGElement,
  boardViewboxSize: number,
): Point {
  const delta = {
    x: position.x - startingDragPoint.x,
    y: position.y - startingDragPoint.y,
  }

  const boardBoundingClientRect = boardElement.getBoundingClientRect()
  const boardScale = boardBoundingClientRect.width / boardViewboxSize

  return {
    x: delta.x / boardScale,
    y: delta.y / boardScale,
  }
}
