import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pathfinder';
  usingMouse = true;

  // TODO Use this to conditionally turn off all outlines
  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.code == 'Tab') {
      this.usingMouse = false;
    }
  }
}
