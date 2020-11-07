import {ElementRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class Cell {
  type: CellType;
  //For pathfinding algos
  cost: number;
  closed: boolean;
  //For A* search
  gCost: number;
  hCost: number;

  //For Animations
  animate$ = new BehaviorSubject<string>('');

  constructor(public x, public y) {
    this.reset();
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

  reset() {
    this.closed = false;
    this.cost = Number.MAX_VALUE;
    this.gCost = Number.MAX_VALUE;
    this.hCost = Number.MAX_VALUE;

    if (this.type === 'start') {
      this.cost = 0;
      this.gCost = 0;
      this.hCost = 0;
    }
    else if (this.type === 'weight') {
      this.cost = 10;
    }
  }

  animate(type: string) {
    this.animate$.next(type);
  }

}

export type CellType = 'wall' | 'start' | 'end' | 'clear' | 'weight';
