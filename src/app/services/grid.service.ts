import { Injectable } from '@angular/core';
import {Grid} from '../models/grid';
import {SearchAlgorithm} from '../models/SearchAlgorithm';
import {AnimationService} from './animation.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  gridController: Grid;
  constructor(private animationService: AnimationService) { }

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
    this.animationService.resetGrid(this.gridController.getAllCells());
    this.gridController.refresh();
  }

  addRandomWalls(wallProbability: number) {
    this.gridController.addRandomWalls(wallProbability);
  }

  solve(algorithm: SearchAlgorithm) {
    this.refresh();
    const {visited, path} = algorithm.findPath(this.gridController);
    this.animationService.setAnimationArrays(visited, path);
    this.animationService.playAnimation();
  }
}
