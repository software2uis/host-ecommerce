import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitterModule } from 'primeng/splitter';
import { FormsModule } from '@angular/forms';
import { environments } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/cliente.interface';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [SplitterModule, FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  router:Router = inject(Router);

  clientService = inject(ClientService);
  constructor(private http: HttpClient) {}

  login() {
    this.http
      .post(environments.backAuth  +'/api/user/login', null, {
        params: { username: this.username, password: this.password },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.message = response;

          if(this.message !== 'Invalid username or password'){
            localStorage.setItem('username', this.username);
            this.clientService.getClientByEmail(this.username).
            pipe(
              catchError(()=>{
                return  of(false);
              }),
              tap(
                (res)=>{
                  if(!res){
                  this.clientService.crearCliente({nombres: this.username ,email: this.username } as Client).subscribe()

                  }

                  setTimeout(()=>{
                    this.router.navigate(['']);
                  },200)


                }
              )
            ).subscribe()

          }


        },
        error: (err) => {
          this.message = 'Login failed: ' + err.error;
        },
      });
  }

  logout() {
    this.http
      .post(environments.backAuth +'/api/user/login/logout', null, {
        params: { username: this.username },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.message = response;
          localStorage.removeItem('username');
        },
        error: (err) => {
          this.message = 'Logout failed: ' + err.error;
        },
      });
  }
}
