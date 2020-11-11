import {Grid} from './grid';
import {Cell} from './cell';
import {Heuristic} from '../algorithms/heurisitics';

export interface SearchAlgorithm {
  grid: Grid;
  visited: Cell[];
  path: Cell[];
  distanceMatrix: number[][];

  findPath(grid: Grid, heuristic?: Heuristic): { path: Cell[], visited: Cell[] };
  getVisited();
  setGrid(grid: Grid);
}
