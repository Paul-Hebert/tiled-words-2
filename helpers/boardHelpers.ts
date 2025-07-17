import type { Point } from '../src/types'

export interface BoardConfig {
  boardViewboxSize: number
  boardGridSize: number
  boardGridScale: number
}

export interface Tile {
  id: string
  position: Point
  grid: {
    rows: (string | null)[][]
  }
}

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

/**
 * Calculates the shadow position for a tile on the board grid
 */
export function getShadowPosition(
  boardPosition: Point,
  boardElement: SVGSVGElement,
  boardGridScale: number,
  boardGridSize: number,
  currentTile: Tile | undefined,
): Point {
  const boardBoundingClientRect = boardElement.getBoundingClientRect()

  // Calculate the grid position (snap to grid)
  const gridPosition = {
    x: Math.floor(boardPosition.x / (boardBoundingClientRect.width / boardGridScale)),
    y: Math.floor(boardPosition.y / (boardBoundingClientRect.height / boardGridScale)),
  }

  const maxX = boardGridSize - (currentTile?.grid.rows[0]?.length ?? 0)
  const maxY = boardGridSize - (currentTile?.grid.rows.length ?? 0)

  // Ensure the position is within valid bounds
  return {
    x: Math.max(0, Math.min(maxX, gridPosition.x)),
    y: Math.max(0, Math.min(maxY, gridPosition.y)),
  }
}
