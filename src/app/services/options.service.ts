import { Injectable } from '@angular/core';
import {GridService} from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private gridService: GridService) { }
}
