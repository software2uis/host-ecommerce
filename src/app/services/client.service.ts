import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environments } from '../../environments/environment';
import { Client } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(
    private http:HttpClient
  ) {}

  private baseUrl = environments.backOrdenes + '/api/ordenes';


  getClientByEmail(email: string) {
    return this.http.get<Client>(environments.backOrdenes + '/api/checkout/cliente/email',{params: {email}});
  }

  crearCliente(cliente: Client) {
    return this.http.post(this.baseUrl + '/cliente', cliente);
  }
}
