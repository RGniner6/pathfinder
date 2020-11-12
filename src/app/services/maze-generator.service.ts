import {Injectable} from '@angular/core';
import {GridService} from './grid.service';
import {Cell} from '../models/cell';
import {Grid} from '../models/grid';

@Injectable({
  providedIn: 'root'
})
export class MazeGeneratorService {
  gridController: Grid;
  grid: Cell[][];
  constructor(private gridService: GridService) {
    this.gridController = gridService.gridController
    this.grid = this.gridController.grid;
  }
// Based on : https://stackoverflow.com/questions/60532245/implementing-a-recursive-backtracker-to-generate-a-maze
  //TODO: Maze generation algorithm
  turnAllCellsToWalls() {
    const allCells = this.gridController.getAllCells();
    allCells.forEach(cell => cell.setWall());
  }

  isWall(x: number, y: number) {
    if (x < this.grid.length && y < this.grid[0].length) {
      return this.grid[x][y].type === 'wall';
    }
  }
}
