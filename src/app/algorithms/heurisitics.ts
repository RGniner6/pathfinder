import {Cell} from '../models/cell';

export type Heuristic = (cell1: Cell, cell2: Cell) => number;

export const manhattanDistance: Heuristic = (cell1: Cell, cell2: Cell) => {
  return Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y)
}

export const euclideanDistance: Heuristic = (cell1: Cell, cell2: Cell) => {
  //Pythagorean theorem.
  //We're rounding off to the first decimal and x10 for a nice whole number
  const widthSquared = Math.pow((cell1.x - cell2.x), 2);
  const heightSquared = Math.pow((cell1.y - cell2.y), 2);
  return  Math.floor(Math.sqrt(widthSquared + heightSquared) * 10);
}
