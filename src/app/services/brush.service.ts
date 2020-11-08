import {Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CellType} from '../models/cell';

@Injectable({
  providedIn: 'root'
})
export class BrushService {

  mouseDown: boolean;
  brushSelected: CellType = 'wall';
  handleKeyPress: Function;
  constructor() {
  }

  listenToMouseChanges(mouseDown$: BehaviorSubject<boolean>) {
    mouseDown$.subscribe(mouseDown => this.mouseDown = mouseDown);
  }

  listenToBrushChanges(selectedBrush$: BehaviorSubject<CellType>) {
    selectedBrush$.subscribe(brush => this.brushSelected = brush);
  }
}
