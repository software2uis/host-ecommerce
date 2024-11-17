import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environments } from '../environments/environment';

export const routes: Routes = [
  // {
  //   path:"",
  //   redirectTo: "catalogo-app",
  //   pathMatch: "full"
  // },
  {
    path: "",
    loadChildren: ()=>{
      return loadRemoteModule({
        remoteEntry: `${environments.mfCatalogo}/remoteEntry.js`,
        remoteName: 'mfe_catalogo',
        exposedModule: './RoutingModule'
      }).then(m => m.routes)
          .catch(err => console.error(err))
      ;

    }
  }
];
