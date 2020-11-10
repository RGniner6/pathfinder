import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Cell, CellType} from '../../models/cell';
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
  placeholder: CellType;
  noDrop: boolean = false;

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
      this.noDrop = false;
      if (!this.isWaypoint(this.cell.type)
        && !this.isWaypoint(this.brushService.brushSelected)) {
        this.cell.type = this.brushService.brushSelected;

      } else if (this.isWaypoint(this.brushService.brushSelected) && this.waypointBeMovedHere()) {
        this.placeholder = this.brushService.brushSelected;
      } else if (!this.waypointBeMovedHere() && this.isWaypoint(this.brushService.brushSelected) && this.brushService.brushSelected !== this.cell.type) {
        this.noDrop = true;
      }
    }
  }

  mouseOut() {
    if (this.brushService.mouseDown && this.isWaypoint(this.brushService.brushSelected)) {
      this.placeholder = null;
    }
  }

  onClick() {
    if (!this.isWaypoint(this.cell.type) && !this.isWaypoint(this.brushService.brushSelected)) {
      this.cell.type = this.brushService.brushSelected;
    }
    else if (this.isWaypoint(this.cell.type)) {
      this.brushService.brushSelected = this.cell.type;
      this.brushService.prevCell = this.cell;
    }
  }

  mouseUp() {
    if (this.isWaypoint(this.brushService.brushSelected)) {
      if (this.waypointBeMovedHere()) {
        this.cell.type = this.brushService.brushSelected;
        this.brushService.prevCell.type = 'clear';
        this.brushService.brushSelected = 'wall';
        this.placeholder = null;

      } else {
        this.placeholder = null;
      }
    }
    // if (!this.isWaypoint(this.cell.type) && this.isWaypoint(this.brushService.brushSelected)) {
    //
    // }
  }

  isWaypoint(type: CellType) {
    return type == 'start' || type == 'end';
  }

  waypointBeMovedHere() {
    if (this.isWaypoint(this.cell.type))
      return false;
    return this.cell.type != 'wall';
  }

  get tileToDisplay() {
    if (this.waypointBeMovedHere())
      return this.placeholder || this.cell.type;
    return this.cell.type;
  }

}
