import {Cell} from "./cell";

export class Grid {
  grid: Cell[][];

  constructor(numColumns: number, numRows: number) {
    this.grid = [];
    this.createGrid(numColumns, numRows);
  }

  createGrid(numColumns: number, numRows: number) {
    for (let x=0; x<numColumns; x++) {
      this.grid[x] = [];
      for (let y=0; y<numRows; y++)
        this.grid[x][y] = new Cell(x, y);
    }
  }

  getCell(x: number, y: number) {
    if (x > this.numColumns || y > this.numRows || x < 0 || y < 0) {
      console.log(`Cannot get a cell with invalid coordinates`);
      return null;
    }
    return this.grid[x][y];
  }

  setStart(x, y) {
    this.grid[x][y].setStart();
  }

  setEnd(x, y) {
    this.grid[x][y].setEnd();
  }

  get numRows() {
    return this.grid[0].length;
  }
  get numColumns() {
    return this.grid.length;
  }

  get start() {
    for (let x = 0; x < this.numColumns; x++)
      for (let y = 0; y < this.numRows; y++)
        if (this.grid[x][y].type === 'start')
          return this.grid[x][y]
    return null;
  }
  get end() {
    for (let x = 0; x < this.numColumns; x++)
      for (let y = 0; y < this.numRows; y++)
        if (this.grid[x][y].type === 'end')
          return this.grid[x][y]
    return null;
  }

  refresh(){
    for (let row of this.grid)
      for (let cell of row)
        cell.reset();
  }

  clearObstacles(){
    this.refresh();
    for (let row of this.grid)
      for (let cell of row)
        if (cell.type !== 'start' && cell.type !== 'end')
          cell.setClear();
  }

  addRandomWalls(wallProbability: number) {
    this.refresh();
    for (let row of this.grid)
      for (let cell of row) {
        let randomNum = Math.floor(Math.random() * 100)
        if (cell.type!=='start' && cell.type!=='end') {
          if (randomNum < wallProbability)
            cell.setWall();
          else
            cell.setClear();
        }
      }
  }

  getUnvisitedNeighbors(cell: Cell): Cell[] {
    const neighbours: Cell[] = [];
    const {x, y} = cell;
    function addNeighbour(neighbour: Cell) {
      if (neighbour.type !== 'wall' && !neighbour.closed)
        neighbours.push(neighbour);
    }
    if (x < this.numColumns-1) addNeighbour(this.getCell(x+1, y));
    if (y < this.numRows-1) addNeighbour(this.getCell(x, y+1));
    if (x > 0) addNeighbour(this.getCell(x-1, y));
    if (y > 0) addNeighbour(this.getCell(x, y-1));

    return neighbours;

  }

  getAllCells(): Cell[] {
    const cells: Cell[] = [];
    for (let row of this.grid)
      for (let cell of row)
        cells.push(cell);
    return cells;
  }

}
