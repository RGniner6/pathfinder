import {SearchAlgorithm} from "../models/SearchAlgorithm";
import {Grid} from "../models/grid";
import {Cell} from "../models/cell";

export class Dijkstra implements SearchAlgorithm {
  distanceMatrix: number[][];
  grid: Grid;
  path: Cell[];
  visited: Cell[];
  unvisited: Cell[];
  destination: Cell;

  constructor() {
  }

  findPath(grid: Grid) {
    this.grid = grid;
    //Set distance to all cells at infinity, sets starting cell distance to 0
    this.reset();
    //Set all cells as unvisited
    this.unvisited = this.grid.getAllCells();
    //Start visiting unvisited nodes
    while (this.unvisited.length) {
      //Sort unvisited so that we visit the closest cell first
      this.sortUnvisited();
      //On the first iteration, the starting node (distance=0) is the 'closest cell'
      //On subsequent iterations, it's the closest neighbour to the most recently visited cell
      const closestCell = this.unvisited.shift();
      //If it's a wall, move on to the next closest cell
      if (closestCell.type === 'wall') continue;
      //If closest cell is at distance=infinity, then there is no path to the destination. Exit loop
      if (closestCell.cost === Number.MAX_VALUE) {
        console.log('Impossible maze');
        break;
      }
      closestCell.setClosed();
      this.visited.push(closestCell);
      if (closestCell.type === 'end') {
        console.log('Path found!');
        this.destination = closestCell;
        break;
      }
      this.updateDistanceOfNeighbours(closestCell)
    }
    return {
      path: this.backtrackPathFromDestination(),
      visited: this.visited,
    };
  }

  getVisited() {
  }

  sortUnvisited() {
    this.unvisited.sort((cell1, cell2) => cell1.cost - cell2.cost);
  }

  updateDistanceOfNeighbours(current: Cell) {
    const unvisited = this.grid.getUnvisitedNeighbors(current);
    for (const neighbour of unvisited) {
      neighbour.cost = current.cost + 1;
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
    return this.path;
  }

  reset() {
    this.visited = [];
    this.unvisited = [];
    this.path = [];
  }

  setGrid(grid: Grid) {
    this.grid = grid;
  }


}
