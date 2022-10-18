import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public lowValue = 10;
  public highValue = 50;

  public lowValueChange(event: number): void{
    console.log(`low: ${event}`);
  }

  public highValueChange(event: number): void{
    console.log(`high: ${event}`);
  }
}
