import {SearchAlgorithm} from './SearchAlgorithm';
import {euclideanDistance, Heuristic, manhattanDistance} from '../algorithms/heurisitics';
import {AStar} from '../algorithms/AStar';
import {Dijkstra} from '../algorithms/Dijkstra';
import {BFS} from '../algorithms/BFS';

export interface Options {
  algorithm: SearchAlgorithm;
  heuristic: Heuristic;
  animationSpeed: number;
}

export interface AlgorithmOption {name: string, algorithm: SearchAlgorithm, needsHeuristic: boolean, weighted: boolean}
export interface HeuristicOption {name: string, heuristic: Heuristic}

export const algorithmOptions: AlgorithmOption[] = [

  {
    name: 'A Star Search',
    algorithm: new AStar(),
    needsHeuristic: true,
    weighted: true,
  },
  {
    name: `Dijkstra's Algorithm`,
    algorithm: new Dijkstra(),
    needsHeuristic: false,
    weighted: true,
  },
  {
    name: `Breadth First Search (unweighted)`,
    algorithm: new BFS(),
    needsHeuristic: false,
    weighted: false,
  },

]

export const heuristicOptions: HeuristicOption[] = [

  {
    name: 'Manhattan Distance',
    heuristic: manhattanDistance
  },
  {
    name: `Euclidean Distance`,
    heuristic: euclideanDistance
  },
]

