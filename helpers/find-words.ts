import type { Grid } from '../src/types'

/**
 * Finds all words in a grid by iterating through rows and columns
 * @param grid - A 2D array representing the board state with letters or null values
 * @returns An array of strings representing all words found in the grid
 */
export function findWords(grid: Grid): string[] {
  const words: string[] = []

  // Find words in rows
  for (const row of grid) {
    words.push(...extractWordsFromArray(row))
  }

  // Find words in columns
  for (let colIndex = 0; colIndex < grid[0]?.length || 0; colIndex++) {
    const column: (string | null)[] = []
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      column.push(grid[rowIndex][colIndex])
    }
    words.push(...extractWordsFromArray(column))
  }

  return words
}

/**
 * Extracts words from a 1D array by splitting on null values
 * @param array - Array of strings or null values
 * @returns Array of words found in the array
 */
function extractWordsFromArray(array: (string | null)[]): string[] {
  const words: string[] = []
  let currentWord = ''

  for (const cell of array) {
    if (cell === null) {
      // End of current word
      // Don't include single letter words
      if (currentWord.length > 1) {
        words.push(currentWord)
      }
      currentWord = ''
    } else {
      // Add character to current word
      currentWord += cell
    }
  }

  // Don't forget the last word if there is one
  if (currentWord.length > 1) {
    words.push(currentWord)
  }

  return words
}
