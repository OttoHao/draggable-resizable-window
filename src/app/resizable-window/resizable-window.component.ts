import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { IPosition } from 'angular2-draggable';

@Component({
  selector: 'app-resizable-window',
  templateUrl: './resizable-window.component.html',
  styleUrls: ['./resizable-window.component.less'],
})
export class ResizableWindowComponent implements OnInit, AfterViewInit {
  @Input() public minValue: number = 0;
  @Input() public maxValue: number = 100;
  @Input() public lowValue: number = this.minValue;
  @Input() public highValue: number = this.maxValue;
  @Output() public lowValueChange: EventEmitter<number> = new EventEmitter();
  @Output() public highValueChange: EventEmitter<number> = new EventEmitter();

  public style: object = {};
  public position: IPosition = { x: 0, y: 0 };

  @ViewChild('container') private container: ElementRef | undefined;
  private transformX: number = 0;
  private left: number = 0;
  private right: number = 0;

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.init();
  }

  public onResizeEnd(event: ResizeEvent): void {
    // if (
    //   event.rectangle.left <
    //   this.container?.nativeElement.offsetLeft - this.transformX
    // ) {
    //   event.rectangle.left =
    //     this.container?.nativeElement.offsetLeft - this.transformX;
    // }

    // if (
    //   event.rectangle.right >
    //   this.container?.nativeElement.offsetLeft +
    //     this.container?.nativeElement.offsetWidth -
    //     this.transformX
    // ) {
    //   event.rectangle.right =
    //     this.container?.nativeElement.offsetLeft +
    //     this.container?.nativeElement.offsetWidth -
    //     this.transformX;
    // }



    if (event.edges.left) {
      this.left = this.left + Number(event.edges.left);
      this.lowValue = this.positionToValue(this.left);
      this.lowValueChange.emit(this.lowValue);
    }

    if (event.edges.right) {
      this.right = this.right + Number(event.edges.right);
      this.highValue = this.positionToValue(this.right);
      this.highValueChange.emit(this.highValue);
    }

    this.style = {
      position: 'absolute',
      left: `${this.left}px`,
      width: `${this.right - this.left}px`,
      right: `${this.right}px`,
    };
  }

  public onDragEnd(event: IPosition): void {
    this.left = this.left - this.transformX + event.x;
    this.right = this.right - this.transformX + event.x;
    this.lowValue = this.positionToValue(this.left);
    this.highValue = this.positionToValue(this.right);
    this.lowValueChange.emit(this.lowValue);
    this.highValueChange.emit(this.highValue);

    this.transformX = event.x;
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.init();
  }

  private init() {
    this.left = this.valueToPosition(this.lowValue);
    this.right = this.valueToPosition(this.highValue);
    this.transformX = 0;
    this.position = { x: 0, y: 0 };

    this.style = {
      position: 'absolute',
      left: `${this.left}px`,
      width: `${this.right - this.left}px`,
      right: `${this.right}px`,
    };
  }

  private valueToPosition(value: number): number {
    return (
      ((value - this.minValue) / (this.maxValue - this.minValue)) *
        this.container?.nativeElement.offsetWidth +
      this.container?.nativeElement.offsetLeft
    );
  }

  private positionToValue(position: number): number {
    return (
      ((position - this.container?.nativeElement.offsetLeft) /
        this.container?.nativeElement.offsetWidth) *
        (this.maxValue - this.minValue) +
      this.minValue
    );
  }
}
