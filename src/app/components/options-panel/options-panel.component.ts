import { Component, OnInit } from '@angular/core';
import {AStar} from '../../algorithms/AStar';
import {GridService} from '../../services/grid.service';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss']
})
export class OptionsPanelComponent implements OnInit {

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
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
