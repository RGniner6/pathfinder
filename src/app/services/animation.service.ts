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
      .fromTo(visited,
        {
          delay: 0.01,
          scale: 0,
          backgroundColor: 'blue',
          autoAlpha: 0,
          // borderRadius: '100%',
        },
          {
          backgroundColor: 'yellow',
          scale: 1,
          autoAlpha: 1,
          borderRadius: '0%',
          ease: 'none',
          stagger: {
            amount: 2
          }
        }, 'first')
      .to(path, {
        backgroundColor: '#FF4677',
        duration: 0.1,
        scale: 1,
        ease: 'bounce',
        stagger: {
          amount: 0.5
        }
      })
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
