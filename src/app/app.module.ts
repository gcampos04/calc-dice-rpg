import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiceCalculatorComponent } from './dice-calculator/dice-calculator.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PdfListComponent } from './pdf-list/pdf-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceCalculatorComponent,
    PdfViewerComponent,
    NavigationComponent,
    PdfListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
