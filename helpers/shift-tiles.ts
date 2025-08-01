import type { Tile, Grid } from '../src/types'
import { canPlaceTile } from './can-place-tile'
import { computeGridState } from './compute-grid-state'
import { rotateGrid } from './rotate-grid'

export type ShiftDirection = 'up' | 'down' | 'left' | 'right'

/**
 * Shifts all tiles in the specified direction by one square
 * @param tiles - Array of tiles to shift (will be modified in place)
 * @param direction - Direction to shift tiles (up, down, left, right)
 * @param gridSize - Size of the board grid
 */
export function shiftTiles(tiles: Tile[], direction: ShiftDirection, gridSize: number): void {
  if (tiles.length === 0) {
    return
  }

  const movedTiles = new Set<string>()
  let iterations = 0
  const maxIterations = 20

  while (movedTiles.size < tiles.length && iterations < maxIterations) {
    let tilesMovedThisIteration = 0

    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i]

      // Skip tiles that have already moved
      if (movedTiles.has(tile.id)) {
        continue
      }

      // Calculate new position based on direction
      const newPosition = { ...tile.position }
      switch (direction) {
        case 'up':
          newPosition.y -= 1
          break
        case 'down':
          newPosition.y += 1
          break
        case 'left':
          newPosition.x -= 1
          break
        case 'right':
          newPosition.x += 1
          break
      }

      // Create a temporary tiles array with the proposed move
      const tempTiles = tiles.map((t, index) => (index === i ? { ...t, position: newPosition } : t))

      // Compute grid state excluding the current tile
      const otherTiles = tempTiles.filter((_, index) => index !== i)
      const gridState = computeGridState(otherTiles, gridSize)

      // Check if the tile can be placed at the new position
      const rotatedGrid = rotateGrid(tile.grid, tile.rotations)
      const canPlace = canPlaceTile(rotatedGrid, newPosition, gridState)

      if (canPlace.canPlace) {
        tiles[i] = { ...tile, position: newPosition }
        movedTiles.add(tile.id)
        tilesMovedThisIteration++
      }
    }

    // If no tiles moved this iteration, we're done
    if (tilesMovedThisIteration === 0) {
      break
    }

    iterations++
  }
}
