# WIP - Tiled Words

A word game where you reconstruct crosswords out of tiles.

## TODOs

## Major Features

- More levels

## UI Design

- "Header" design with home button
- Better responsive layout
- Better micro-interactions for finding word, completing level
- Better sounds
- Favicon + Logo

## Code quality

- Improve linting rules
- Set up CI
- Improve how levels are defined
- E2E tests
- Refactors
  - Simplify shadow position + can place tile
  - Abstract shared parts of shadow position and the rotate tile in place helper
  - Replace `while` loop in getShadowPosition: have `canPlaceTile` return the exact offset required

## Bugs

- Sounds not working right on iOS
- Prevent zoom in iOS on double tap
- Prevent "back swipe" in iOS
- Safari: clicking selects text

## Lisa feedback

- Lock together "correct" tiles - or alternate approach for shifting all tiles...
- Option to get bonus hints
