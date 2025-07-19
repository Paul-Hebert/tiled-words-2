export interface Point {
  x: number
  y: number
}

export type GridRow = (string | null)[]

export type Grid = GridRow[]

export type Direction = 'cw' | 'ccw'

export interface Tile {
  id: string
  position: Point
  grid: Grid
}

export interface Word {
  text: string
  hint: string
}
