import { IProductWithManufacturer } from "@/types/product.types";
import { iconsEdit } from "@/assets/icons";
import { FC, useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useProducts } from "@/stores/productsStore";
import { CommonProductCard } from "./CommonProductCard";
import { getPhotoUrl } from "@/utils/functions";

interface IProductCard {
    product: IProductWithManufacturer,
    isEven: boolean,
}

export const ProductCard: FC<IProductCard> = ({ product, isEven }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const deleteProduct = useProducts((state) => state.deleteProduct);
    // const messageResponse = useProducts((state) => state.messageResponse);


    const handleOpenModalDelete = () => {
        setIsModalOpen(false)
        setIsModalDeleteOpen(true)
    }

    const handleOpenModalEdit = () => {
        setIsModalEditOpen(true)
    }

    const handleCloseModalDelete = () => {
        setIsModalDeleteOpen(false)
    }

    const handleCloseModalEdit = () => {
        setIsModalEditOpen(false)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleDelete = (id: number) => {
        deleteProduct(id)
    }

    return (
        <>
            <div className={`h-16 px-2.5 flex justify-between items-center ${isEven ? "bg-slate-900/[.03]" : ""} `}>
                <div className="flex-1 bg-transparent">
                    <img className="w-14 h-14" alt={product.name} src={getPhotoUrl(product.photoUrl)} />
                </div>
                <p className="flex-1 overflow-hidden text-center">{product.name}</p>
                <p className="flex-1 text-center">{product.quantity}</p>
                <p className="flex-1 overflow-hidden text-center">{product.manufacturer}</p>
                <p className="flex-1 text-center">{`${product.price} р`}</p>
                <div className="flex-1 flex justify-end gap-x-2.5 bg-transparent ">
                    <button
                        onClick={handleOpenModalEdit}
                    >
                        {iconsEdit[0]}
                    </button>
                    <button
                        onClick={handleOpenModal}
                    >
                        {iconsEdit[1]}
                    </button>
                </div>
            </div>
            <Modal
                active={isModalOpen}
            >
                {<div className="w-full bg-slate-100 flex flex-col gap-y-5">
                    <div className="w-9/12 justify-center self-center">
                        <img className="w-full h-56" alt={product.name} src={getPhotoUrl(product.photoUrl)} />
                    </div>
                    <h2 className="self-center text-center">{product.name}</h2>
                    <p className="font-normal text-sm">{`Количество: ${product.quantity}`}</p>
                    <p className="font-normal text-sm">{`Цена: ${product.price} р`}</p>
                    <p className="font-normal text-sm">{`Производитель: ${product.manufacturer}`}</p>
                    <div className="self-end flex gap-x-5">
                        <Button title={"Удалить"} className={"bg-neutral-700 text-neutral-200"} onClick={handleOpenModalDelete} />
                        <Button title={"Назад"} className={"bg-slate-300 text-zinc-900"} onClick={handleCloseModal} />
                    </div>

                </div>}
            </Modal>

            <Modal
                active={isModalDeleteOpen}
            >
                {<div className="w-full bg-slate-100 flex flex-col gap-y-6">
                    <h2>Вы действительно хотите удалить товар?</h2>
                    <div className="flex gap-x-5 justify-end">
                        <Button title={"Отменить"} className={"bg-slate-300 text-zinc-900"} onClick={handleCloseModalDelete} />
                        <Button title={"Удалить"} className={"bg-neutral-700 text-neutral-200"} onClick={() => handleDelete(product.id)} />
                    </div>
                </div>}
            </Modal>
            <Modal
                active={isModalEditOpen}
            >
                {<CommonProductCard type={"update"} onCloseModal={handleCloseModalEdit} title={"Редактирование товара"} product={product} />}
            </Modal>
        </>
    );

};