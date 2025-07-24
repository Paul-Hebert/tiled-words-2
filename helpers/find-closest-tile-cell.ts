import type { Point, Tile } from '../src/types'
import { rotateGrid } from './rotate-grid'

interface TileCell {
  tile: Tile
  cellPosition: Point
  distance: number
}

/**
 * Finds the closest tile cell to a given point within a threshold distance
 * @param point - The point to find the closest cell to
 * @param tiles - Array of tiles to search through
 * @param threshold - Maximum distance to consider (in pixels)
 * @param boardElement - The board SVG element for coordinate conversion
 * @param boardViewboxSize - The viewbox size of the board
 * @returns The closest tile cell if within threshold, null otherwise
 */
export function findClosestTileCell(
  point: Point,
  tiles: Tile[],
  threshold: number,
  boardElement: SVGSVGElement,
  boardViewboxSize: number,
  boardGridScale: number,
): { tile: Tile; cellPosition: Point } | null {
  const boardBoundingClientRect = boardElement.getBoundingClientRect()
  const boardScale = boardBoundingClientRect.width / boardViewboxSize

  // Convert client coordinates to board coordinates
  const boardPoint = {
    x: (point.x - boardBoundingClientRect.x) / boardScale,
    y: (point.y - boardBoundingClientRect.y) / boardScale,
  }

  let closestCell: TileCell | null = null

  for (const tile of tiles) {
    const rotatedGrid = rotateGrid(tile.grid, tile.rotations)

    // Check each cell in the tile
    for (let tileY = 0; tileY < rotatedGrid.length; tileY++) {
      for (let tileX = 0; tileX < rotatedGrid[tileY].length; tileX++) {
        const cellValue = rotatedGrid[tileY][tileX]

        // Skip null cells
        if (cellValue === null) {
          continue
        }

        // Calculate the cell's position on the board
        const cellBoardX = tile.position.x + tileX
        const cellBoardY = tile.position.y + tileY

        // Calculate the center of the cell
        const cellCenterX = (cellBoardX + 0.5) * boardGridScale
        const cellCenterY = (cellBoardY + 0.5) * boardGridScale

        // Calculate distance to nearest point on cell bounding box
        const cellLeft = cellBoardX * boardGridScale
        const cellRight = (cellBoardX + 1) * boardGridScale
        const cellTop = cellBoardY * boardGridScale
        const cellBottom = (cellBoardY + 1) * boardGridScale

        const nearestX = Math.max(cellLeft, Math.min(boardPoint.x, cellRight))
        const nearestY = Math.max(cellTop, Math.min(boardPoint.y, cellBottom))

        const distance = Math.sqrt(
          Math.pow(boardPoint.x - nearestX, 2) + Math.pow(boardPoint.y - nearestY, 2),
        )

        if (distance <= threshold) {
          if (!closestCell || distance < closestCell.distance) {
            closestCell = {
              tile,
              cellPosition: { x: cellBoardX, y: cellBoardY },
              distance: distance,
            }
          }
        }
      }
    }
  }

  return closestCell ? { tile: closestCell.tile, cellPosition: closestCell.cellPosition } : null
}
