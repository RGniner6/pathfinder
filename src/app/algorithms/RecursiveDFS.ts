import {SearchAlgorithm} from '../models/SearchAlgorithm';
import {Grid} from '../models/grid';
import {Cell} from '../models/cell';

export class RecursiveDFS implements SearchAlgorithm {
  grid: Grid;
  start: Cell;
  destination: Cell;
  path: Cell[];
  open: Cell[];
  visited: Cell[];

  constructor() {
  }

  /**
   * BFS PSUEDOCODE:
   *
     procedure DFS(G, v) is
       label v as discovered
       for all directed edges from v to w that are in G.adjacentEdges(v) do
         if vertex w is not labeled as discovered then
            recursively call DFS(G, w)
   *
   */

  findPath(grid: Grid) {
    this.setGrid(grid);
    this.reset();
    let pathToEnd;

    this.recursiveDFS(this.start);
    if (!!this.destination) {
      pathToEnd = this.backtrackPathFromDestination();
    }
    else {
      console.log(`Impossible maze. Path not found`);
    }

    return {
      path: pathToEnd,
      visited: this.visited,
    };
  }

  recursiveDFS(current: Cell) {
    current.setClosed();
    this.visited.push(current);
    if (current.type === 'end') {
      console.log('Path Found!')
      this.destination = current;
      return;
    }
    const unvisited = this.grid.getUnvisitedNeighbors(current);
    for (let neighbour of unvisited) {
      neighbour.prevCell = current;
      this.recursiveDFS(neighbour);
    }
  }

  backtrackPathFromDestination() {
    let current = this.destination;
    while (current != null) {
      this.path.unshift(current);
      // current.isPartOfPath();
      current = current.prevCell;
    }
    if (!this.path.length)
      console.log('Impossible maze. Path not found!');
    return this.path;
  }

  reset() {
    this.open = [];
    this.path = [];
    this.visited = [];
    this.destination = null;
  }

  setGrid(grid: Grid) {
    this.grid = grid;
    this.start = this.grid.start;
  }


}
