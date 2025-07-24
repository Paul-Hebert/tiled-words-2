import type { Grid } from '../src/types'

type WordResult = {
  text: string
  direction: 'vertical' | 'horizontal'
  cells: Array<{ x: number; y: number }>
}

/**
 * Finds all words in a grid by iterating through rows and columns
 * @param grid - A 2D array representing the board state with letters or null values
 * @returns An array of WordResult objects representing all words found in the grid with their cell positions
 */
export function findWords(grid: Grid): WordResult[] {
  const words: WordResult[] = []

  // Find words in rows
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]
    const horizontalWords = extractWordsFromArrayWithPositions(row, rowIndex, 'horizontal')
    words.push(...horizontalWords)
  }

  // Find words in columns
  for (let colIndex = 0; colIndex < grid[0]?.length || 0; colIndex++) {
    const column: (string | null)[] = []
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      column.push(grid[rowIndex][colIndex])
    }
    const verticalWords = extractWordsFromArrayWithPositions(column, colIndex, 'vertical')
    words.push(...verticalWords)
  }

  return words
}

/**
 * Extracts words from a 1D array by splitting on null values, including cell positions
 * @param array - Array of strings or null values
 * @param index - Row index (for horizontal words) or column index (for vertical words)
 * @param direction - Direction of the word ('horizontal' or 'vertical')
 * @returns Array of WordResult objects with cell positions
 */
function extractWordsFromArrayWithPositions(
  array: (string | null)[],
  index: number,
  direction: 'vertical' | 'horizontal',
): WordResult[] {
  const words: WordResult[] = []
  let currentWord = ''
  let currentCells: Array<{ x: number; y: number }> = []
  let currentStartIndex = 0

  for (let i = 0; i < array.length; i++) {
    const cell = array[i]

    if (cell === null) {
      // End of current word
      // Don't include single letter words
      if (currentWord.length > 1) {
        words.push({
          text: currentWord,
          direction,
          cells: currentCells,
        })
      }
      currentWord = ''
      currentCells = []
      currentStartIndex = i + 1
    } else {
      // Add character to current word
      currentWord += cell

      // Add cell position
      if (direction === 'horizontal') {
        currentCells.push({ x: i, y: index })
      } else {
        currentCells.push({ x: index, y: i })
      }
    }
  }

  // Don't forget the last word if there is one
  if (currentWord.length > 1) {
    words.push({
      text: currentWord,
      direction,
      cells: currentCells,
    })
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
