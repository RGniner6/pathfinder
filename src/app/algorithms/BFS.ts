import {SearchAlgorithm} from '../models/SearchAlgorithm';
import {Grid} from '../models/grid';
import {Cell} from '../models/cell';

export class BFS implements SearchAlgorithm {
  grid: Grid;
  start: Cell;
  destination: Cell;
  path: Cell[];
  open: Cell[];
  visited: Cell[];

  constructor() {
  }

  /**
   * BFS PSUEDOCODE
   1 procedure BFS(G, root) is
   2      let Q be a queue
   3      label root as discovered
   4      Q.enqueue(root)
   5      while Q is not empty do
   6          v := Q.dequeue()
   7          if v is the goal then
   8              return v
   9          for all edges from v to w in G.adjacentEdges(v) do
   10              if w is not labeled as discovered then
   11                  label w as discovered
   12                  Q.enqueue(w)
   *
   */

  findPath(grid: Grid) {
    this.setGrid(grid);
    this.reset();

    this.open.push(this.start);
    this.visited.push(this.start);
    this.start.setClosed();

    while (this.open.length) {
      const current = this.open.shift();

      if (current.type === 'wall') continue;

      if (current.type === 'end') {
        console.log('Path found!');
        this.destination = current;
        break;
      }

      this.addNeighboursToOpen(current)
    }
    return {
      path: this.backtrackPathFromDestination(),
      visited: this.visited,
    };
  }

  addNeighboursToOpen(current: Cell) {
    const unvisited = this.grid.getUnvisitedNeighbors(current);
    for (const neighbour of unvisited) {
      this.open.push(neighbour);
      this.visited.push(neighbour);
      neighbour.setClosed();
      neighbour.prevCell = current;
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
  }

  setGrid(grid: Grid) {
    this.grid = grid;
    this.start = this.grid.start;
  }


}
