import { ProductStatus } from './product-status.enum';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  startPrice: number;
  instantPrice: number;
  startTime: Date;
  endTime: Date;
  categoryId: string;
  status: ProductStatus;
}
