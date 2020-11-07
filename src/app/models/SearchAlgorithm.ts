import {Grid} from "./grid";
import {Cell} from "./cell";

export interface SearchAlgorithm {
  grid: Grid;
  visited: Cell[];
  path: Cell[];
  distanceMatrix: number[][];

  findPath(grid: Grid): { path: Cell[], visited: Cell[] };
  getVisited();
  setGrid(grid: Grid);
}
