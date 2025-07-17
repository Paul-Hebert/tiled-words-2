export interface Point {
  x: number
  y: number
}

export type GridRow = (string | null)[]

export interface Grid {
  rows: GridRow[]
}
