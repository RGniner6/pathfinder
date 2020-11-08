import { Injectable } from '@angular/core';
import {Cell} from '../models/cell';
import {Grid} from '../models/grid';
import {gsap, CSSPlugin} from 'gsap'

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  grid: Grid;
  path: Cell[];
  visited: Cell[];
  plugins = [CSSPlugin];
  animationSpeed: number = 5;
  timelineDefaults = {
    defaults: {
      duration: .3,
      ease: 'none',
    },
    paused: true,
  };
  visitedTl = gsap.timeline(this.timelineDefaults);
  clearTl = gsap.timeline(this.timelineDefaults);
  constructor() {
  }

  setGrid(grid: Grid) {
    this.grid = grid;
  }

  setAnimationArrays(visited: Cell[], path: Cell[]) {
    this.path = path;
    this.visited = visited;
  }

  playAnimation() {
    if (this.animationSpeed === 0) {
      this.visited.forEach(cell => cell.animate('visited'));
      this.path.forEach(cell => cell.animate('path'));
    } else {
      const visitedElements = this.visited
        .filter(cell => cell.type !== 'start' && cell.type !== 'end')
        .map(cell => cell.elementRef);
      const pathElements = this.path
        .filter(cell => cell.type !== 'start' && cell.type !== 'end')
        .map(cell => cell.elementRef);
      this.setupTimeline(visitedElements, pathElements);
    }
  }

  setupTimeline(visited, path) {
    this.visitedTl.clear();
    this.visitedTl.pause();
    this.visitedTl
      .to(visited,
        // {
        //   backgroundColor: 'white',
        //   scale: 0.5,
        //   autoAlpha: 0,
        // },
          {
          backgroundColor: 'yellow',
          scale: 1,
          autoAlpha: 1,
          stagger: {
            amount: 1
          }
        }, 'first')
    ;
    this.visitedTl.play();
  }

  resetGrid(cells: Cell[]) {
      this.visitedTl.pause(0);
      this.visitedTl.clear();
      cells.forEach(cell => cell.animate(''));
  }

  resetGridWithAnimation(cells: Cell[]) {
    this.visitedTl.pause(0);
    this.visitedTl.clear();
    // this.visitedTl.reverse().timeScale(3);
  }

  removeGsapStyles() {
    // this.visitedTl.pause(0);
    // this.visitedTl.clear();
    gsap.registerPlugin(CSSPlugin);
    const allCells = this.grid.getAllCells();
    this.visitedTl.clear();
    gsap.set(allCells, {clearProps:"all"} )
  }
}
