import {Component, OnInit} from '@angular/core';
import {GridService} from '../../../services/grid.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {AnimationService} from '../../../services/animation.service';
import {AlgorithmOption, algorithmOptions, HeuristicOption, heuristicOptions} from '../../../models/options';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss']
})
export class OptionsPanelComponent implements OnInit {

  form: FormGroup
  algorithms: AlgorithmOption[] = algorithmOptions;
  heuristics: HeuristicOption[] = heuristicOptions;

  constructor(private gridService: GridService,
              private animationService: AnimationService,
              private fb: FormBuilder) {
    // this.algorithms.push(new AStar())
    this.form = this.fb.group({
      algorithm: [this.algorithms[0]],
      heuristic: [this.heuristics[0].heuristic],
      animationSpeed: [50],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.updateOptions());
    this.updateOptions();
  }

  solve() {
    this.gridService.solve();
  }

  updateOptions() {
    const options = Object.assign({}, this.form.value);
    console.log(options);
    console.log(`needsHeuristic: `, this.form.get('algorithm').value);
    this.gridService.setOptions(options.algorithm.algorithm, options.heuristic);
    this.animationService.setSpeed(options.animationSpeed);
  }

  get needsHeuristic(): boolean {
    return (this.form.get('algorithm').value as AlgorithmOption).needsHeuristic;
  }

}
