import { Product, ResponsePaginated } from './../../models/product.interface';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { catchError, of, tap } from 'rxjs';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ButtonModule, FormsModule, ToolbarModule, InputTextModule, AutoCompleteModule, IconFieldModule, InputIconModule,],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {



  @Output()
  public OnValue: EventEmitter<Product[]> = new EventEmitter();

  router: Router = inject(Router);

  updateDataHandler: any;


  items: Product[] | undefined;

  selectedItem: Product | undefined;

  suggestions: string[] = [];

  productsService:ProductsService = inject(ProductsService);

  ngOnInit() {

  }



  sendQuery(query: string) {

    this.productsService.getAllProductsByQuery(query)
    .pipe(
      tap(
        (products:ResponsePaginated)=>{
          this.suggestions = products.content.map((product)=>product.name);
        }
      )
    ).subscribe();


  }

  searchProductsWithQuery() {
    const event = new CustomEvent('productsQuery', {
      detail: { query: this.selectedItem },
    });

    window.dispatchEvent(event);

  }





}
