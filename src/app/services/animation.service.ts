import {Injectable} from '@angular/core';
import {Cell} from '../models/cell';
import {Grid} from '../models/grid';
import {gsap} from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  grid: Grid;
  path: Cell[];
  visited: Cell[];
  animationSpeed: number = 30;
  timelineDefaults = {
    defaults: {
      duration: 1,
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
    // this.visited = Array.from(new Set(visited)); //to only keep unique cells in array;
  }

  playAnimation(skipAnimation: boolean = false) {
    if (this.animationSpeed === 0 || skipAnimation) {
      this.clearProps()
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
      .fromTo(visited,
        {
          scale: 0,
          backgroundColor: 'blue',
          autoAlpha: 0,
          borderRadius: '100%',
        },
          {
          duration: this.getDuration(0.5, 2),
          backgroundColor: 'yellow',
          scale: 1,
          autoAlpha: 1,
          borderRadius: '0%',
          ease: 'none',
          stagger: {
            // amount: this.getDuration(0.5, 5)
            each: this.getDuration(0.01, 0.07)
          }
        }, 'first')
      .to(path, {
        backgroundColor: '#FF4677',
        duration: 0.1,
        scale: 1,
        ease: 'bounce',
        stagger: {
          amount: this.getDuration(0.2, 1.2)
        }
      })
    ;
    this.visitedTl.play();
  }

  clearProps() {
    this.visitedTl.invalidate();
    this.visitedTl.clear();
    this.visitedTl.set(this.allCellReferences, {
      clearProps: true,
    })
    this.visitedTl.play();
  }

  resetGrid(cells: Cell[]) {
      this.visitedTl.pause(0);
      this.visitedTl.clear();
      cells.forEach(cell => cell.animate(''));
      // console.log(`resetGrid() called`)
  }

  resetGridWithAnimation(cells: Cell[]) {
    this.visitedTl.pause(0);
    this.visitedTl.clear();
    // this.visitedTl.reverse().timeScale(3);
  }

  setSpeed(animationSpeed) {
    this.animationSpeed = 100 - animationSpeed;
  }

  getDuration(min: number, max: number) {
    return min + (max - min) * this.animationSpeed/100;
  }

  get allCellReferences() {
    return this.grid.getAllCells()
      // .filter(cell => cell.type !== 'start' && cell.type !== 'end')
      .map(cell => cell.elementRef);
  }
}
