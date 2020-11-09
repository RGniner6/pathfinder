import {Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Cell, CellType} from '../models/cell';

@Injectable({
  providedIn: 'root'
})
export class BrushService {

  mouseDown: boolean;
  brushSelected: CellType = 'wall';
  prevCell: Cell;
  nextCell: Cell;
  constructor() {
  }

  listenToMouseChanges(mouseDown$: BehaviorSubject<boolean>) {
    mouseDown$.subscribe(mouseDown => this.mouseDown = mouseDown);
  }

  listenToBrushChanges(selectedBrush$: BehaviorSubject<CellType>) {
    selectedBrush$.subscribe(brush => this.brushSelected = brush);
  }


  clearCells() {
    this.prevCell = null;
    this.nextCell = null;
  }
}
