import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../services/product-service.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from 'src/app/common/cart-item';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'nga-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 2;
  totalElements: number = 0;

  previousKeyword: string = null;


  constructor(private productService: ProductServiceService, private route: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword !== keyWord) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyWord;

    console.log(`keyword=${keyWord}, pageNumber=${this.pageNumber}`);

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyWord).subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }


    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId = ${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSizeFocus: number) {
    this.pageSize = pageSizeFocus;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(tempProduct: Product) {
    console.log(`Adding to cart : ${tempProduct.name}, ${tempProduct.unitPrice}`);

    const cartItem = new CartItem(tempProduct);
    this.cartService.addToCart(cartItem);
  }
}
