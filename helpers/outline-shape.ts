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

  // Get all edges of non-null cells
  const allEdges: Array<{ start: Point; end: Point }> = []

  for (const cell of nonNullCells) {
    // Each cell has 4 edges: top, right, bottom, left
    const cellEdges = [
      // Top edge
      { start: { x: cell.x, y: cell.y }, end: { x: cell.x + 1, y: cell.y } },
      // Right edge
      { start: { x: cell.x + 1, y: cell.y }, end: { x: cell.x + 1, y: cell.y + 1 } },
      // Bottom edge
      { start: { x: cell.x, y: cell.y + 1 }, end: { x: cell.x + 1, y: cell.y + 1 } },
      // Left edge
      { start: { x: cell.x, y: cell.y }, end: { x: cell.x, y: cell.y + 1 } },
    ]

    allEdges.push(...cellEdges)
  }

  // Count how many times each edge appears
  const edgeCounts = new Map<string, number>()

  for (const edge of allEdges) {
    // Create a canonical key for the edge (normalize direction)
    const key1 = `${edge.start.x},${edge.start.y}-${edge.end.x},${edge.end.y}`
    const key2 = `${edge.end.x},${edge.end.y}-${edge.start.x},${edge.start.y}`

    const key = key1 < key2 ? key1 : key2

    edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1)
  }

  // Filter to only perimeter edges (edges that appear only once)
  const perimeterEdges: Array<{ start: Point; end: Point }> = []

  for (const edge of allEdges) {
    const key1 = `${edge.start.x},${edge.start.y}-${edge.end.x},${edge.end.y}`
    const key2 = `${edge.end.x},${edge.end.y}-${edge.start.x},${edge.start.y}`
    const key = key1 < key2 ? key1 : key2

    if (edgeCounts.get(key) === 1) {
      perimeterEdges.push(edge)
    }
  }

  // Convert edges to a sequence of points by connecting them
  const outline: Point[] = []

  if (perimeterEdges.length === 0) {
    return outline
  }

  // Start with the first edge
  let currentEdge = perimeterEdges[0]!
  outline.push(currentEdge.start, currentEdge.end)
  const remainingEdges = perimeterEdges.slice(1)

  // Connect edges until we can't find any more connections
  while (remainingEdges.length > 0) {
    const nextEdgeIndex = remainingEdges.findIndex((edge) => {
      // Check if this edge connects to the current end point
      return (
        (edge.start.x === currentEdge.end.x && edge.start.y === currentEdge.end.y) ||
        (edge.end.x === currentEdge.end.x && edge.end.y === currentEdge.end.y)
      )
    })

    if (nextEdgeIndex === -1) {
      break
    }

    const nextEdge = remainingEdges[nextEdgeIndex]!
    remainingEdges.splice(nextEdgeIndex, 1)

    // Determine which end of the next edge to add
    if (nextEdge.start.x === currentEdge.end.x && nextEdge.start.y === currentEdge.end.y) {
      outline.push(nextEdge.end)
      currentEdge = nextEdge
    } else {
      outline.push(nextEdge.start)
      currentEdge = { start: nextEdge.end, end: nextEdge.start }
    }
  }

  // Remove the last point if it's the same as the first point (to avoid duplication)
  if (
    outline.length > 0 &&
    outline[0] &&
    outline[outline.length - 1] &&
    outline[0].x === outline[outline.length - 1].x &&
    outline[0].y === outline[outline.length - 1].y
  ) {
    outline.pop()
  }

  return outline
}
