import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'examples/note',
    pathMatch: 'full'
  },

  {
    path: 'examples',
    loadChildren: () =>
      import('./features/examples.module').then(m => m.ExamplesModule)
  },
  {
    path: '**',
    redirectTo: 'examples/note/'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
