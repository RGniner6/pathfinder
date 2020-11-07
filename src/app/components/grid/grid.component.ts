import { Component, OnInit } from '@angular/core';
import {Cell} from '../../models/cell';
import {GridService} from '../../services/grid.service';
import {Dijkstra} from '../../algorithms/Dijkstra';
import {AStar} from '../../algorithms/AStar';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  grid: Cell[][];

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.grid = this.gridService.createGrid(30, 25);
    this.gridService.setStartAndEnd([8,10], [25, 10]);
  }

  clearObstacles() {
      this.gridService.clearObstacles();
  }

  addRandomWalls() {
    this.gridService.addRandomWalls(20);
  }

  resetGrid() {
    this.gridService.refresh();
  }

  solve() {
    this.gridService.solve(new AStar());
  }

}
