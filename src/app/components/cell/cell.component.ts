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
    if (this.brushService.mouseDown) {
      if (this.cell.type !== 'start'
        && this.cell.type !== 'end'
        && this.brushService.brushSelected !== 'start'
        && this.brushService.brushSelected !== 'end') {
        this.cell.type = this.brushService.brushSelected;
      } else {

      }
    }
  }

  onClick() {
    if (this.cell.type !== 'start'
      && this.cell.type !== 'end'
      && this.brushService.brushSelected !== 'start'
      && this.brushService.brushSelected !== 'end')
      this.cell.type = this.brushService.brushSelected;
    else if (this.cell.type == 'start'
      || this.cell.type == 'end'){
      console.log(`onclick reached`)
      this.brushService.brushSelected = this.cell.type;
      this.brushService.prevCell = this.cell;
    }
  }

  mouseUp() {
    if (this.cell.type !== 'start' && this.cell.type !== 'end'
      && (this.brushService.brushSelected == 'start' || this.brushService.brushSelected == 'end')) {
      this.cell.type = this.brushService.brushSelected;
      this.brushService.prevCell.type = 'clear';
      this.brushService.brushSelected = 'wall';
    }
  }

}
