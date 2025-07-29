import { fruitsAndVeggies } from './fruits-and-veggies'
import { herbsFromASimonAndGarfunkelSong } from './herbs-from-a-simon-and-garfunkel-song'
import { seaAnimals } from './sea-animals'
import type { Level } from '../types'
import { farmAnimals } from './farm-animals'

export const levels: Level[] = [
  farmAnimals,
  herbsFromASimonAndGarfunkelSong,
  seaAnimals,
  fruitsAndVeggies,
]
