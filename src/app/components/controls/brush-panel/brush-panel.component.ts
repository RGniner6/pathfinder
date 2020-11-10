import { Component, OnInit } from '@angular/core';
import {Cell, CellType} from '../../../models/cell';
import {BrushService} from '../../../services/brush.service';
import {BehaviorSubject} from 'rxjs';
import {GridService} from '../../../services/grid.service';

@Component({
  selector: 'app-brush-panel',
  templateUrl: './brush-panel.component.html',
  styleUrls: ['./brush-panel.component.scss', '../../cell/cell.component.scss']
})
export class BrushPanelComponent implements OnInit {
  selectedBrush$: BehaviorSubject<CellType>;
  brushes: CellType[] = [];
  constructor(private brushService: BrushService,
              private gridService: GridService,
  ) {
    this.brushes.push('clear', 'wall', 'weight');
    this.selectedBrush$ = new BehaviorSubject<CellType>('wall');
  }

  ngOnInit(): void {
    this.brushService.listenToBrushChanges(this.selectedBrush$)
  }

  selectBrush(cellType: CellType) {
    this.selectedBrush$.next(cellType);
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

}
