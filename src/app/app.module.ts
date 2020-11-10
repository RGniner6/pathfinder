import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { CellComponent } from './components/cell/cell.component';
import { BrushPanelComponent } from './components/controls/brush-panel/brush-panel.component';
import { OptionsPanelComponent } from './components/controls/options-panel/options-panel.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
