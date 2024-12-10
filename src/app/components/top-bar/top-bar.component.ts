import { Product } from './../../models/product.interface';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { catchError, of, tap } from 'rxjs';
import { SpeedDialModule } from 'primeng/speeddial';
import { ResponsePaginated } from '../../models/response-paginated.interface';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ButtonModule,SpeedDialModule, RouterModule, FormsModule, ToolbarModule, InputTextModule, AutoCompleteModule, IconFieldModule, InputIconModule,],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {



  @Output()
  public OnValue: EventEmitter<Product[]> = new EventEmitter();

  router: Router = inject(Router);

  updateDataHandler: any;


  items: Product[] | undefined;
  dropButtons: MenuItem[] = [];

  selectedItem: Product | undefined;

  suggestions: Product[] = [];

  productsService:ProductsService = inject(ProductsService);

  ngOnInit() {
    this.dropButtons = [
      {
          icon: 'pi pi-user',
          command: () => this.router.navigateByUrl('/login'),
          label: 'Profile'
      },
      {
          icon: 'pi pi-box',
          command: () => this.router.navigateByUrl('/ordenes'),
          label: 'Pedidos'
      },
    ]

  }



  sendQuery(query: string) {

    this.productsService.getSuggestions(query)
    .pipe(
      tap(
        (products:Product[])=>{
          this.suggestions = products;
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

  goToProduct(event:AutoCompleteSelectEvent){

    const product = event.value as Product;
    this.router.navigateByUrl(`/product-detail/${product.id}`);

  }




}
