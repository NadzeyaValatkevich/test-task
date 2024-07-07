'use client'
import { ProductCard } from "@/components/cards/ProductCard";
import { ProductCardGrid } from "@/components/cards/ProductCardGrid";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { useProducts } from "@/stores/productsStore";
import { IProductWithManufacturer } from "@/types/product.types";
import { Fragment, useState } from "react";

export default function Table() {

    const products = useProducts((state) => state.products);
    const error = useProducts((state) => state.error);

    const status = useProducts((state) => state.status);
    const layout = useProducts((state) => state.layout);

    if (status === "loading") {
        return <Loader />
    }

    if (error) {
        <div>{error}</div>
    }

    // useEffect(() => {

    // }, [products, status, reloadProducts]);

    const layoutClass = layout === 'flex' ? "flex flex-col gap-y-2.5" : "grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-6"

    return (
        <>
            <div className={`${layoutClass}`}>
                {products.length ? products.map((product: IProductWithManufacturer, index: number) => {
                    return (
                        <Fragment key={product.id}>
                            {layout === "flex" ?
                                (<ProductCard product={product} isEven={!(index % 2 === 0)} />) :
                                (<ProductCardGrid product={product} />)
                            }
                        </Fragment>
                    )
                }) : "Товаров не найдено"}

            </div >
        </>
    );
};