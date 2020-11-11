import { Component, OnInit } from '@angular/core';
import {AStar} from '../../../algorithms/AStar';
import {GridService} from '../../../services/grid.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss']
})
export class OptionsPanelComponent implements OnInit {

  form: FormGroup
  selectedAlgo = new FormControl('');
  constructor(private gridService: GridService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      algorithm: ['astar'],
      heuristic: [''],
      animationSpeed: [''],
    })

  }

  solve() {
    this.gridService.solve(new AStar());
  }

}
