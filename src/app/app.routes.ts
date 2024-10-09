import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path:"",
    redirectTo: "catalogo-app",
    pathMatch: "full"
  },
  {
    path: "catalogo-app",
    loadComponent: ()=>{
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        remoteName: 'mfe_catalogo',
        exposedModule: './ProductCatalog'
      }).then(m => m.AppComponent)
          .catch(err => console.error(err))
      ;

    }
  }
];
