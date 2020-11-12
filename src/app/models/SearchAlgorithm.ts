import {Grid} from './grid';
import {Cell} from './cell';
import {Heuristic} from '../algorithms/heurisitics';

export interface SearchAlgorithm {
  grid: Grid;
  findPath(grid: Grid, heuristic?: Heuristic): { path: Cell[], visited: Cell[] };
  setGrid(grid: Grid);
  backtrackPathFromDestination(): Cell[]
}
