# WIP - Tiled Words

A word game where you reconstruct crosswords out of tiles.

## TODOs

## Major Features

- More levels
- Daily challenge vs lots of challenges

## UI Design

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

- Rotated squares don't get higlighted even when correct

## Lisa feedback

- Lock together "correct" tiles - or alternate approach for shifting all tiles...
- Option to get bonus hints

## Demo/beta release plan

- Remaining code/design changes
  - Fix router SSR
  - More levels?
  - Basic analytics
  - Add survey to end game stage
  - Add share with friends request
- Survey
- Deploy
- Final testing
  - iPad, iOS, multiple phones
- Share in waves
  - Cloud Four slack?
  - Mastodon
  - Personal friends
    - ~~Case~~
    - Guy
    - Melissa?
    - Hebert Fam
    - Teddy + Alex
    - T + Nick?
  - Facebook
  - LinkedIn?
  - Replensyh Slack?
  - PDX startups slack?
  - Chico Start slack?
- Review feedback
