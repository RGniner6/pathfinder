import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Cell} from '../../models/cell';
import {gsap} from 'gsap';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input()
  cell: Cell;
  size: number = 20;

  @ViewChild('tile', {static: true}) tile: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
    this.cell.animate$.subscribe( type => this.playAnimation(type));
  }

  setCell(cell: Cell) {
    this.cell = cell;
  }

  playAnimation(type: string) {

  }

}
