import {SearchAlgorithm} from "../models/SearchAlgorithm";
import {Grid} from "../models/grid";
import {Cell} from "../models/cell";

export class AStar implements SearchAlgorithm {
  distanceMatrix: number[][];
  grid: Grid;
  path: Cell[];
  open: Cell[]; //Set of nodes to be evaluated
  closed: Cell[]; //Set of nodes already evaluated
  visited: Cell[]; //Just used to animate the order cells were visited in
  costFunction: (cell1: Cell, cell2: Cell) => number

  end: Cell;
  start: Cell;

  /**
   * loop (while OPEN is !empty)
   *    current = node in OPEN with the loweest f_cost
   *    remove current from OPEN
   *    add current to CLOSED
   *
   *    if current = target node //Path found
   *      return
   *
   *    foreach neighbour of the current node
   *      if neighbour !traversable || neighbour is in CLOSED
   *        skip to the next neighbour
   *
   *      if new path to neighbour is shorter || neighbour is not in OPEN
   *        set f_cost of neighbour
   *        set parent of neighbour to current
   *        if neighbour is not in OPEN
   *          add neighbour to OPEN
   */


  findPath(grid: Grid): { path: Cell[]; visited: Cell[] } {
    this.setGrid(grid);
    let current: Cell;
    //Set distance to all cells at infinity, sets starting cell distance to 0
    this.reset();
    this.open.push(this.start)
    while (this.open.length) {
      this.sortOpen();
      current = this.open.shift();
      // console.log(`Open size: ${this.open.length}, current cost = ${current.cost}`);
      current.setClosed();
      this.closed.push(current);
      this.visited.push(current);

      if (current.type === 'end') {
        console.log(`Path found! Visited ${this.visited.length} cells`);
        return {
          path: this.backtrackPathFromDestination(),
          visited: this.visited,
        };
      }

      for (let neighbour of this.grid.getUnvisitedNeighbors(current)) {
        if (this.closed.includes(neighbour) || neighbour.type === 'wall')
          continue;

        if (!this.open.includes(neighbour)
          || this.costFunction(current, neighbour) < neighbour.gCost) {
          this.updateCostToNeighbour(current, neighbour);
          neighbour.prevCell = current;
          if (!this.open.includes(neighbour)) {
            this.open.push(neighbour);
            this.visited.push(neighbour);
          }
        }
      }
    }
    console.log(`impossible maze`);
    return {path: [], visited: this.visited};
  }

  getVisited() {
  }

  updateCostToNeighbour(current: Cell, neighbour: Cell) {
    // f = g + h
    //totalCost = cost to current from start + estimated cost to destination from current
    neighbour.gCost = current.gCost + this.costFunction(current, neighbour);
    neighbour.hCost = this.costFunction(neighbour, this.end);
    neighbour.cost = neighbour.gCost + neighbour.hCost;
    // console.log(`Neighbour's gCost: ${neighbour.gCost}, hCost: ${neighbour.hCost}, cost: ${neighbour.cost}, `)

  }

  linearDistanceBetween(cell1: Cell, cell2: Cell) {
    //Pythagorean theorem.
    //We're rounding off to the first decimal and x10 for a nice whole number
    const widthSquared = Math.pow((cell1.x - cell2.x), 2);
    const heightSquared = Math.pow((cell1.y - cell2.y), 2);
    return  Math.floor(Math.sqrt(widthSquared + heightSquared) * 10);
  }

  manhattanDistance(cell1: Cell, cell2: Cell) {
    return Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y)
  }

  sortOpen() {
    this.open.sort((cell1, cell2) => {
      // return cell1.cost - cell2.cost;
      //Makes sorting slower but finds better best path guesses
      return cell1.cost === cell2.cost ?
        cell1.hCost - cell2.hCost : cell1.cost - cell2.cost;
    })
  }

  backtrackPathFromDestination() {
    let current = this.end;
    while (current != null) {
      this.path.unshift(current);
      // current.isPartOfPath();
      current = current.prevCell;
    }
    return this.path;
  }

  setGrid(grid: Grid) {
    this.grid = grid;
    this.start = this.grid.start;
    this.end = this.grid.end;
    this.costFunction = this.manhattanDistance;

  }

  reset() {
    this.visited = [];
    this.open = [];
    this.closed = [];
    this.path = [];
    // this.grid.resetGrid();
  }

}
