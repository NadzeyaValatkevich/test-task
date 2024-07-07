import { IProductWithManufacturer } from "@/types/product.types";
import { getPhotoUrl } from "@/utils/functions";
import { FC } from "react";

interface IProductCardGrid {
    product: IProductWithManufacturer,

}

export const ProductCardGrid: FC<IProductCardGrid> = ({ product }) => {
    return (
        <div className="w-auto h-64 p-2.5 bg-slate-100 flex flex-col justify-between">
            <div className="w-full">
                <img className="w-full h-36 rounded-10px" alt={product.name} src={getPhotoUrl(product.photoUrl)} />
            </div>
            <p className="text-slate-900 text-[16px] leading-5 text-center">{product.name}</p>
            <p className="text-slate-900 leading-4 text-center">{product.manufacturer}</p>
            <div className="flex justify-between">
                <p className="text-slate-900 leading-4">{`${product.quantity} шт`}</p>
                <p className="text-slate-900 leading-4">{`${product.price} р`}</p>
            </div>
        </div>
    );
};