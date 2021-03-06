import {ElementRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class Cell {
  public type: CellType;
  weight: number;
  //For pathfinding algos
  cost: number;
  closed: boolean;
  prevCell: Cell;
  //For A* search
  gCost: number;
  hCost: number;

  //For Animations
  animate$ = new BehaviorSubject<string>('');
  elementRef: ElementRef;

  constructor(public x, public y) {
    this.reset();
    this.type = 'clear';
  }

  setStart() {
    this.type = 'start';
  }

  setEnd() {
    this.type = 'end';
  }
  setWeight() {
    this.type = 'weight';
  }
  setWall() {
    this.type = 'wall';
  }
  setClear() {
    this.type = 'clear';
  }
  setClosed() {
    this.closed = true;
  }

  reset() {
    this.closed = false;
    this.cost = Number.MAX_VALUE;
    this.gCost = Number.MAX_VALUE;
    this.hCost = Number.MAX_VALUE;
    this.weight = 1;
    this.prevCell = null;

    if (this.type === 'start') {
      this.cost = 0;
      this.gCost = 0;
      this.hCost = 0;
    }
    else if (this.type === 'weight') {
      // this.cost = 10;
      this.weight = 10;
    }
  }

  animate(type: string) {
    this.animate$.next(type);
  }

}

export type CellType = 'wall' | 'start' | 'end' | 'clear' | 'weight';
