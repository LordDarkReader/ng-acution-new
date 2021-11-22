import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nga-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductServiceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( () => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const theProductId: number = + this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }
}
