import {Component, HostListener, OnInit} from '@angular/core';
import {Cell} from '../../models/cell';
import {GridService} from '../../services/grid.service';
import {Dijkstra} from '../../algorithms/Dijkstra';
import {AStar} from '../../algorithms/AStar';
import {BrushService} from '../../services/brush.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  grid: Cell[][];
  mouseDown$ = new BehaviorSubject<boolean>(false);

  constructor(private gridService: GridService,
              private brushService: BrushService) { }

  ngOnInit(): void {
    this.grid = this.gridService.createGrid(30, 25);
    this.gridService.setStartAndEnd([8,10], [25, 10]);
    this.brushService.listenToMouseChanges(this.mouseDown$);
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

  @HostListener('window:mousedown', ['$event'])
  mouseDown() {
    event.preventDefault();
    this.mouseDown$.next(true);
  }

  @HostListener('window:mouseup')
  mouseUp() {
    this.mouseDown$.next(false);
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    console.log(String(event.key));
  }

}
