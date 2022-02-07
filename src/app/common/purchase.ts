import {Customer} from 'src/app/common/customer';
import {Address} from 'src/app/common/address';
import {Order} from 'src/app/common/order';
import {OrderItem} from 'src/app/common/order-item';

export class Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];
}
