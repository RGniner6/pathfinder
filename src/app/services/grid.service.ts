import { Injectable } from '@angular/core';
import {Grid} from '../models/grid';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  gridController: Grid;
  constructor() { }

  createGrid(numOfCols, numOfRows) {
    this.gridController = new Grid(numOfCols, numOfRows)
    return this.gridController.grid;
  }

  setStartAndEnd(start: number[], end: number[]) {
    this.gridController.setStart(start[0], start[1]);
    this.gridController.setEnd(end[0], end[1]);
  }

  clearObstacles() {
    this.gridController.clearObstacles();
  }

  refresh() {
    this.gridController.refresh();
  }

  addRandomWalls(wallProbability: number) {
    this.gridController.addRandomWalls(wallProbability);
  }
}
