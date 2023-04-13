import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  { path: '', component: MonthlyComponent },
  { path: 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
