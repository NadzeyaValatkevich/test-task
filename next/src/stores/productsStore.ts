import { productsAPI } from "@/api/products/productsAPI";
import {
  IFormProduct,
  IManufacturerItem,
  IProduct,
  IProductWithManufacturer,
} from "@/types/product.types";
import { LayoutType, StatusType } from "@/types/root.types";
import { addManufacturerToProducts } from "@/utils/functions";
import { create } from "zustand";
import { useAuth } from "./authStore";

interface IUseProductsStore {
  products: Array<IProductWithManufacturer>;
  status: StatusType;
  error: string | null;
  total: number;
  totalPages: number;
  manufacturers: any;
  layout: LayoutType;
  messageResponse: string;
  setLayout: (value: LayoutType) => void;
  setMessageResponse: (message: string) => void;
  fetchProducts: (page: number, q: string, limit?: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: IFormProduct) => void;
  updateProduct: (id: number, product: Partial<IFormProduct>) => void;
}

const LIMIT_PRODUCTS = 6;

export const useProducts = create<IUseProductsStore>((set, get) => ({
  products: [],
  status: "idle",
  error: null,
  total: 0,
  totalPages: 1,
  manufacturers: [],
  layout: "flex",
  messageResponse: "",
  setLayout: (value: LayoutType) => set({ layout: value }),
  setMessageResponse: (message: string) => set({ messageResponse: "" }),

  fetchProducts: async (
    page: number = 1,
    q: string = "",
    limit: number = LIMIT_PRODUCTS
  ) => {
    set({ status: "loading", error: null, products: [], messageResponse: "" });

    const { products } = get();
    const token = useAuth.getState().token;

    try {
      const response = await productsAPI.fetchProducts(token, page, q, limit);

      const total = parseInt(response.headers["x-total-count"], 10);

      const productsWidthManufacturer = response.data.map(
        (product: IProduct) => ({
          ...product,
          manufacturer: "",
        })
      );

      set({
        status: "succeeded",
        total: total,
        products: [...products, ...productsWidthManufacturer],
      });

      const responseManufacturers = await productsAPI.fetchManufacturers(token);

      const newProducts = get().products;

      let updatedProducts = addManufacturerToProducts(
        newProducts,
        responseManufacturers.data
      );
      const totalPages = Math.ceil(total / LIMIT_PRODUCTS);

      set({
        products: [...products, ...updatedProducts],
        totalPages: totalPages,
        manufacturers: responseManufacturers.data,
      });
    } catch (error: any) {
      set({ error: error.response?.data?.error || "Произошла ошибка" });
      set({ status: "failed" });
    }
  },

  deleteProduct: async (id: number) => {
    set({ status: "loading", error: null, messageResponse: "" });
    const token = useAuth.getState().token;

    const products = get().products;

    try {
      const response = await productsAPI.deleteProduct(token, id);

      if (response.status === 200) {
        const updatedProducts = products.filter(
          (product: IProductWithManufacturer) => product.id !== id
        );

        set({
          status: "succeeded",
          products: [...updatedProducts],
          messageResponse: response.data.message,
        });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.error || "Произошла ошибка",
        status: "failed",
        messageResponse:
          error.response?.data?.error || "Произошла ошибка при удалении товара",
      });
    }
  },

  addProduct: async (product: IFormProduct) => {
    set({ status: "loading", error: null, messageResponse: "" });
    const token = useAuth.getState().token;
    const manufacturers = get().manufacturers;
    const total = get().total;
    const products = get().products;

    const { image, ...productWithoutImage } = product;

    try {
      const response = await productsAPI.addProducts(token, product);

      if (response.status === 200) {
        const manufacturer = manufacturers.find(
          (manufacturer: IManufacturerItem) => {
            return manufacturer.id === Number(response.data.manufacturerId);
          }
        );

        const newProduct: IProductWithManufacturer = {
          ...productWithoutImage,
          manufacturer: manufacturer.name,
          id: response.data.id,
          photoUrl: response.data.photoUrl,
        };

        const addedProduct = [
          newProduct,
          ...products.slice(0, LIMIT_PRODUCTS - 1),
        ];

        set({
          status: "succeeded",
          products: addedProduct,
          total: total + 1,
          messageResponse: "Карточка успешно добавлена",
        });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.error || "Произошла ошибка",
        status: "failed",
      });
    }
  },

  updateProduct: async (id: number, product: Partial<IFormProduct>) => {
    set({ status: "loading", error: null, messageResponse: "" });
    const token = useAuth.getState().token;

    console.log(product);

    try {
      const response = await productsAPI.updateProduct(token, id, product);

      if (response.status === 200) {
        const currentProducts = get().products;
        const manufacturers = get().manufacturers;

        const manufacturer = manufacturers.find((man: IManufacturerItem) => {
          return man.id === product.manufacturerId;
        });

        const getImageUrl = (image: File | string) => {
          if (typeof image === "string") {
            return image;
          }
          return URL.createObjectURL(image);
        };

        const updatedProducts = currentProducts.map((item) => {
          if (item.id === id) {
            const updatedProduct = { ...item };

            if (product.name !== undefined) updatedProduct.name = product.name;
            if (product.quantity !== undefined)
              updatedProduct.quantity = Number(product.quantity);
            if (product.price !== undefined)
              updatedProduct.price = product.price;
            if (product.manufacturerId !== undefined && manufacturer) {
              updatedProduct.manufacturer = manufacturer.name;
              updatedProduct.manufacturerId = manufacturer.id;
            }
            if (product.image !== undefined) {
              updatedProduct.photoUrl = getImageUrl(product.image);
            }

            return updatedProduct;
          }
          return item;
        });

        console.log(updatedProducts);

        set({
          status: "succeeded",
          products: updatedProducts,
          messageResponse: "Карточка успешно изменена",
        });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.error || "Произошла ошибка",
        status: "failed",
      });
    }
  },
}));
