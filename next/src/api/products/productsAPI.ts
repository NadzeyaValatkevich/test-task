import {
  AddProductResponse,
  IFormProduct,
  IManufacturerItem,
  IProduct,
} from "@/types/product.types";
import { instance } from "../instance";

export const productsAPI = {
  fetchProducts(token: string | null, page: number, q: string, limit: number) {
    return instance.get<Array<IProduct>>(
      `/products?_limit=${limit}&_page=${page}&q=${q}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },

  fetchManufacturers(token: string | null) {
    return instance.get<Array<IManufacturerItem>>("/manufacturers", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  deleteProduct(token: string | null, id: number) {
    return instance.delete<{ message: string }>(`/products/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  addProducts(token: string | null, product: IFormProduct) {
    return instance.post<AddProductResponse>(`/products`, product, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateProduct(
    token: string | null,
    id: number,
    product: Partial<IFormProduct>
  ) {
    return instance.patch<IProduct>(`/products/${id}`, product, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
