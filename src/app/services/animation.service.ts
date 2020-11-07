import { Injectable } from '@angular/core';
import {Cell} from '../models/cell';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  path: Cell[];
  visited: Cell[];
  constructor() { }

  setAnimationArrays(visited: Cell[], path: Cell[]) {
    this.path = path;
    this.visited = visited;
  }

  playAnimation() {
    this.visited.forEach(cell => cell.animate('visited'));
    this.path.forEach(cell => cell.animate('path'));
  }
}
