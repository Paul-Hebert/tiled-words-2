export interface Point {
  x: number
  y: number
}

export type GridRow = (string | null)[]
export type Grid = GridRow[]

export interface Tile {
  id: string
  position: Point
  grid: Grid
  rotations: number
}

export interface Word {
  text: string
  hint: string
}

export interface Level {
  theme: string
  gridSize: number
  words: {
    vertical: Word[]
    horizontal: Word[]
  }
  tiles: Tile[]
}

export interface WordResult {
  text: string
  direction: 'vertical' | 'horizontal'
  cells: Array<{ x: number; y: number }>
}
