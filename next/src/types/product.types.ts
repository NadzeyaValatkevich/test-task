export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: string;
  photoUrl: string;
  manufacturerId: number;
}

export interface IManufacturerItem {
  id: number;
  name: string;
}

export interface IProductWithManufacturer extends IProduct {
  manufacturer: string;
}

export interface IFormProduct {
  name: string;
  quantity: number;
  price: string;
  manufacturerId: number;
  image: any;
}

export interface AddProductResponse {
  name: string;
  quantity: string;
  price: string;
  manufacturerId: string;
  photoUrl: string;
  id: number;
}
