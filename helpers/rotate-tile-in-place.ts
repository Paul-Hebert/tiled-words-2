import type { Tile, Grid, Point } from '../src/types'
import { rotateGrid } from './rotate-grid'
import { canPlaceTile } from './can-place-tile'

/**
 * Rotates a tile in place and finds a valid position if the current position becomes invalid
 * @param tile - The tile to rotate
 * @param gridState - The current state of the board grid
 * @returns The new position if a valid placement is found, false otherwise
 */
export function rotateTileInPlace(tile: Tile, gridState: Grid): Point | false {
  let rotatedGrid = rotateGrid(tile.grid, tile.rotations + 1)

  // Check if the rotated tile can still be placed at the current position
  const currentPositionResult = canPlaceTile(rotatedGrid, tile.position, gridState)
  if (currentPositionResult.canPlace) {
    return tile.position
  }

  // If not, search for a new valid position
  const originalPosition = { ...tile.position }

  // If no position found in the specified order, try increasing distances
  let distance = 1
  const maxDistance = gridState.length

  while (distance <= maxDistance) {
    // Generate positions at current distance
    const positionsAtDistance = generatePositionsAtDistance(originalPosition, distance)

    for (const position of positionsAtDistance) {
      const positionResult = canPlaceTile(rotatedGrid, position, gridState)
      if (positionResult.canPlace) {
        tile.position = position
        return position
      }
    }

    distance++
  }

  // If no valid position found, don't update the tile and return false
  return false
}

/**
 * Generates positions at a given distance from a center point
 * @param center - The center point
 * @param distance - The distance from the center
 * @returns Array of positions at the specified distance
 */
function generatePositionsAtDistance(center: Point, distance: number): Point[] {
  const positions: Point[] = []

  // Generate positions in a square pattern around the center
  for (let dx = -distance; dx <= distance; dx++) {
    for (let dy = -distance; dy <= distance; dy++) {
      // Only include positions that are exactly at the specified distance
      if (Math.abs(dx) === distance || Math.abs(dy) === distance) {
        positions.push({
          x: center.x + dx,
          y: center.y + dy,
        })
      }
    }
  }

  return positions
}
