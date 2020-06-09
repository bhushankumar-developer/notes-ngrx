import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/core.module';
import { CrudComponent } from './crud/components/crud.component';

const routes: Routes = [
  {
    path: 'note',
    component: CrudComponent,
    children: [
      {
        path: 'note',
        redirectTo: 'note/',
        pathMatch: 'full'
      },
      {
        path: 'note/:id',
        component: CrudComponent,
        data: { title: 'anms.examples.menu.crud' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
