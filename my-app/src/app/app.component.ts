import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  minHeight: number = 0;

  ngOnInit(): void {
    this.minHeight = this.getDeviceHeight();
    console.log('minHeight: ', this.minHeight);
  }

  getDeviceHeight() {
    return window.innerHeight;
  }
}
