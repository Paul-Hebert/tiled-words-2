import type { Grid, Point } from '../src/types'

/**
 * Helper function to get all adjacent points (right, down, left, up)
 */
function allAdjacentPoints(point: Point): Point[] {
  return [
    { x: point.x + 1, y: point.y },
    { x: point.x, y: point.y + 1 },
    { x: point.x - 1, y: point.y },
    { x: point.x, y: point.y - 1 },
  ]
}

function allDiagonalPoints(point: Point): Point[] {
  return [
    { x: point.x + 1, y: point.y + 1 },
    { x: point.x + 1, y: point.y - 1 },
    { x: point.x - 1, y: point.y + 1 },
    { x: point.x - 1, y: point.y - 1 },
  ]
}

/**
 * Finds the outline of non-null cells in a grid
 * @param grid - The grid to analyze
 * @returns An array of points outlining the non-null cells
 */
export function outlineShape(grid: Grid): Point[] {
  const rows = grid.length
  const cols = grid[0]!.length

  // Find all non-null cells
  const nonNullCells: Point[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== null) {
        nonNullCells.push({ x: col, y: row })
      }
    }
  }

  if (nonNullCells.length === 0) {
    return []
  }

  // Get the corners of each non-null cell.
  // For example, a cell at {x: 0, y: 0} has corners at {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}
  const corners: Point[] = []
  for (const cell of nonNullCells) {
    const cellCorners = [
      { x: cell.x, y: cell.y },
      { x: cell.x + 1, y: cell.y },
      { x: cell.x + 1, y: cell.y + 1 },
      { x: cell.x, y: cell.y + 1 },
    ]

    // Avoid duplicates
    for (const corner of cellCorners) {
      const exists = corners.some((c) => c.x === corner.x && c.y === corner.y)
      if (!exists) {
        corners.push(corner)
      }
    }
  }

  // Remove the corners that are not on the perimeter
  // If a corner has corners in all four directions, it's not on the perimeter
  const perimeterCorners = corners.filter((corner) => {
    const pointsToCheck = [...allAdjacentPoints(corner), ...allDiagonalPoints(corner)]

    const hasCornersInAllDirections = pointsToCheck.every((p) => {
      const isCorner = corners.some((c) => c.x === p.x && c.y === p.y)
      return isCorner
    })
    return !hasCornersInAllDirections
  })

  // Then we need to walk around the shape, starting from the start point's top left corner and going clockwise
  let currentPoint = perimeterCorners[0]!
  const outline: Point[] = [currentPoint]

  // Walk around the corners, until we can't go any further
  while (true) {
    const pointsToCheck = allAdjacentPoints(currentPoint)

    const nextPoint = pointsToCheck.find((p) => {
      const alreadyVisited = outline.some((o) => o.x === p.x && o.y === p.y)

      if (alreadyVisited) {
        return false
      }

      const isCorner = perimeterCorners.some((c) => c.x === p.x && c.y === p.y)
      return isCorner
    })

    if (nextPoint) {
      currentPoint = nextPoint
      outline.push(currentPoint)
    } else {
      break
    }
  }

  return outline
}
