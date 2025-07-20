import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceCalculatorComponent } from './dice-calculator/dice-calculator.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfListComponent } from './pdf-list/pdf-list.component';

const routes: Routes = [
  { path: '', component: DiceCalculatorComponent },
  { path: 'calculator', component: DiceCalculatorComponent },
  { path: 'pdfs', component: PdfListComponent },
  { path: 'pdf-editor/:id', component: PdfViewerComponent },
  { path: 'pdf-viewer', redirectTo: 'pdfs' },
  { path: 'pandora', redirectTo: 'pdf-editor/pandora-nath' },
  { path: '**', redirectTo: '' } // Rota wildcard para capturar rotas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
