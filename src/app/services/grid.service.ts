import {Injectable} from '@angular/core';
import {Grid} from '../models/grid';
import {SearchAlgorithm} from '../models/SearchAlgorithm';
import {AnimationService} from './animation.service';
import {AStar} from '../algorithms/AStar';
import {Heuristic, manhattanDistance} from '../algorithms/heurisitics';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  gridController: Grid;
  algorithm: SearchAlgorithm = new AStar();
  heuristic: Heuristic = manhattanDistance;
  constructor(private animationService: AnimationService) {
  }

  createGrid(numOfCols, numOfRows) {
    this.gridController = new Grid(numOfCols, numOfRows)
    this.animationService.setGrid(this.gridController);
    return this.gridController.grid;
  }

  setStartAndEnd(start: number[], end: number[]) {
    this.gridController.setStart(start[0], start[1]);
    this.gridController.setEnd(end[0], end[1]);
  }

  clearObstacles() {
    this.refresh();
    this.gridController.clearObstacles();
  }

  refresh() {
    // this.animationService.removeGsapStyles();
    this.animationService.resetGrid(this.gridController.getAllCells());
    this.gridController.refresh();
  }

  refreshWithAnimation() {
    this.animationService.resetGridWithAnimation(this.gridController.getAllCells());
    this.gridController.refresh();
  }

  addRandomWalls(wallProbability: number) {
    this.refresh();
    this.gridController.addRandomWalls(wallProbability);
  }

  solve() {
    this.refresh();
    const {visited, path} = this.algorithm.findPath(this.gridController, this.heuristic);
    this.animationService.setAnimationArrays(visited, path);
    this.animationService.playAnimation();
  }

  setOptions(algorithm: SearchAlgorithm, heuristic: Heuristic) {
    this.algorithm = algorithm;
    this.heuristic = heuristic;
  }
}
