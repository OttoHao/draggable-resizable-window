import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResizableModule } from 'angular-resizable-element';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizableWindowComponent } from './resizable-window/resizable-window.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizableWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizableModule,
    AngularDraggableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
