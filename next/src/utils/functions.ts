import {
  IManufacturerItem,
  IProductWithManufacturer,
} from "@/types/product.types";

export const addManufacturerToProducts = (
  products: IProductWithManufacturer[],
  manufacturers: IManufacturerItem[]
): IProductWithManufacturer[] =>
  products.map((product) => {
    const manufacturer = manufacturers.find(
      (man) => man.id === Number(product.manufacturerId)
    );
    return {
      ...product,
      manufacturer: manufacturer ? manufacturer.name : "",
    };
  });

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number
) => {
  let pagesDisplay: Array<number | string> = [];
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  if (totalPages <= 7) {
    pagesDisplay = Array.from({ length: totalPages }, (_, k) => k + 1);
  } else {
    pagesDisplay = [1];
    if (startPage > 2) {
      pagesDisplay.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesDisplay.push(i);
    }

    if (endPage < totalPages - 1) {
      pagesDisplay.push("...");
    }

    pagesDisplay.push(totalPages);
  }

  return pagesDisplay;
};

export const getPhotoUrl = (photoUrl: string) => {
  if (typeof photoUrl === "string" && photoUrl.startsWith("/")) {
    return `http://localhost:3002${photoUrl}`;
  }
  return photoUrl;
};
