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

- Performance
  - Host fonts locally
  - Replace `while` loop in getShadowPosition: have `canPlaceTile` return the exact offset required

## Bugs

- Sounds not working right on iOS
- Safari: clicking selects text

## Lisa feedback

- Lock together "correct" tiles - or alternate approach for shifting all tiles...
- Option to get bonus hints

## Before sharing with beta playtesters

- Fix or disable sounds
  - reduce to just success?
- Improve responsive layout
  - overflow on landscape iPad
  - unused space on laptop
  - Overflow on iOS
- Link instructions from nav (in modal?)
- Better "next level"/winning UI
- Fix router SSR
- More levels!
