import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceCalculatorComponent } from './dice-calculator/dice-calculator.component';

const routes: Routes = [
  { path: '', component: DiceCalculatorComponent },
  { path: 'calculator', component: DiceCalculatorComponent },
  { path: '**', redirectTo: '' } // Rota wildcard para capturar rotas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
