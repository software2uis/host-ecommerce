import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { Product } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';
import { ResponsePaginated } from '../models/response-paginated.interface';
import { ProductFilterDTO } from '../models/product-filter.interface';

@Injectable({providedIn: 'root'})
export class ProductsService {

  http:HttpClient = inject(HttpClient);

  private products = new BehaviorSubject<Product[]>([]);

  set setProducts(product:Product[]){
    this.products.next(product);
  }

  get getProducts(){
    return this.products;
  }

  getAllProductsByQuery(query?:string) {

    const productFilterDTO = {query} as ProductFilterDTO;
    return this.http.post<ResponsePaginated>(environments.backCatalogo  + '/public/api/products', productFilterDTO)
  }

  getProductById(id:string) {
    return this.http.get<Product>(environments.backCatalogo  + '/public/api/products/' + id);

  }
  getSuggestions(query:string) {
    const params = query ? new HttpParams().set('query',query) : {};

    return this.http.get<Product[]>(environments.backCatalogo  + '/public/api/products/suggestions',{params});
  }
}
