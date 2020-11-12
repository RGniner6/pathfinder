import {SearchAlgorithm} from '../models/SearchAlgorithm';
import {Grid} from '../models/grid';
import {Cell} from '../models/cell';

export class DFS implements SearchAlgorithm {
  grid: Grid;
  start: Cell;
  destination: Cell;
  path: Cell[];
  open: Cell[];
  visited: Cell[];

  constructor() {
  }

  findPath(grid: Grid) {
    this.setGrid(grid);
    this.reset();

    this.open.push(this.start);
    this.visited.push(this.start);
    // this.start.setClosed();

    while (this.open.length) {
      const current = this.open.pop();
      this.visited.push(current);

      if (current.type === 'end') {
        console.log('Path found!');
        this.destination = current;
        break;
      }

      if (!current.closed) {
        current.setClosed();
        this.addNeighboursToOpen(current)
      }

    }
    return {
      path: this.visited,
      visited: this.visited,
    };
  }

  addNeighboursToOpen(current: Cell) {
    const unvisited = this.grid.getUnvisitedNeighbors(current);
    for (const neighbour of unvisited) {
      this.open.push(neighbour);
      neighbour.prevCell = current;
    }
  }

  backtrackPathFromDestination() {
    let current = this.destination;
    while (current != null) {
      this.path.unshift(current);
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
