import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'nga-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductServiceService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories = ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
