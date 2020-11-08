import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Cell} from '../../models/cell';
import {gsap} from 'gsap';
import {BrushService} from '../../services/brush.service';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input()
  cell: Cell;
  size: number = 20;

  //For animations
  visited: boolean = false;
  path: boolean = false;

  @ViewChild('tile', {static: true}) tile: ElementRef;

  constructor(private brushService: BrushService) {
  }

  ngOnInit(): void {
    this.cell.animate$.subscribe( type => this.playAnimation(type));
    this.cell.elementRef = this.tile.nativeElement;
  }

  setCell(cell: Cell) {
    this.cell = cell;
  }

  playAnimation(type: string) {
    if (this.cell.type !== 'start' && this.cell.type !== 'end')
      switch (type) {
        case 'visited': {
            this.visited = true;
            break;
        }
        case 'path': {
          this.path = true;
          break;
        }
        default: {
          this.visited = false;
          this.path = false;
        }
      }
  }

  mouseOver() {
    if (this.cell.type !== 'start' && this.cell.type !== 'end')
      if (this.brushService.mouseDown) {
        this.cell.type = this.brushService.brushSelected;
      }
  }

  onClick() {
    if (this.cell.type !== 'start' && this.cell.type !== 'end')
      this.cell.type = this.brushService.brushSelected;
  }

}
