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
    path: 'login',
    loadComponent:(() => import('./components/login/login.component').then(c => c.LoginComponent)),
  },
  {
    path: "carrito",
    loadChildren: ()=>{
      return loadRemoteModule({
        remoteEntry: `${environments.mfCarrito}/remoteEntry.js`,
        remoteName: 'mfe_carrito',
        exposedModule: './RoutingModule'
      }).then(m => m.routes)
      .catch(err => console.error(err))
      ;

    }
  },
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
  },
];
