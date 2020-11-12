import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GridComponent} from './components/grid/grid.component';
import {CellComponent} from './components/cell/cell.component';
import {BrushPanelComponent} from './components/controls/brush-panel/brush-panel.component';
import {OptionsPanelComponent} from './components/controls/options-panel/options-panel.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faDotCircle, faTimes, faTimesCircle, faWeightHanging} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    BrushPanelComponent,
    OptionsPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faDotCircle, faTimes, faTimesCircle, faWeightHanging, faCircle
    )
  }
}
