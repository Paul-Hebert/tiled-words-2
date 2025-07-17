import type { Grid, Point } from '../src/types'

export interface Tile {
  id: string
  position: Point
  grid: Grid
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
    y: Math.floor(boardPosition.y / (boardBoundingClientRect.height / boardGridScale) + 1),
  }

  const maxX = boardGridSize - (currentTile?.grid[0]?.length ?? 0)
  const maxY = boardGridSize - (currentTile?.grid.length ?? 0)

  // Ensure the position is within valid bounds
  return {
    x: Math.max(0, Math.min(maxX, gridPosition.x)),
    y: Math.max(0, Math.min(maxY, gridPosition.y)),
  }
}
