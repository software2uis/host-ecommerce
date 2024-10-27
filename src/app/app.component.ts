import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-app';
  @ViewChild('remoteContainer1', { read: ViewContainerRef, static: true }) container1!: ViewContainerRef;


  async ngAfterViewInit(){

    setTimeout(async() => {


      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        remoteName: 'mfe_catalogo',
        exposedModule: './AppComponent'
      })

      this.container1.createComponent(m.AppComponent);

    },100);

  }

}
