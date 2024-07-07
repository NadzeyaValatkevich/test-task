import { useProducts } from "@/stores/productsStore";
import { IFormProduct, IManufacturerItem, IProductWithManufacturer } from "@/types/product.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { FC, useEffect, useState } from "react";

interface IAddProductCard {
    onCloseModal: () => void,
    type: "add" | "update",
    title: string,
    product?: IProductWithManufacturer,

}

export const CommonProductCard: FC<IAddProductCard> = ({ onCloseModal, type, title, product }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormProduct>();
    const id = product?.id

    const manufacturers = useProducts((state) => state.manufacturers);
    const addProduct = useProducts((state) => state.addProduct);
    const updateProduct = useProducts((state) => state.updateProduct);

    const [selectedFile, setSelectedFile] = useState<string | File | null>(product ? product.photoUrl : null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            // setValue("image", file);
        }
    };

    useEffect(() => {
        if (type === 'update' && product?.photoUrl) {
            setPreview(product.photoUrl.startsWith("http") ? product.photoUrl : `http://localhost:3002${product.photoUrl}`);
        }
    }, [type, product]);


    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreview(null);
    };


    const onSubmit: SubmitHandler<IFormProduct> = data => {
        let productData: Partial<IFormProduct> = {};

        if (data.name !== product?.name) {
            productData.name = data.name;
        }
        if (Number(data.quantity) !== product?.quantity) {
            productData.quantity = Number(data.quantity);
        }
        const formattedPrice = parseFloat(data.price).toFixed(2);
        if (formattedPrice !== product?.price) {
            productData.price = formattedPrice;
        }
        if (Number(data.manufacturerId) !== product?.manufacturerId) {
            productData.manufacturerId = Number(data.manufacturerId);
        }
        if (selectedFile !== product?.photoUrl) {
            productData.image = selectedFile;
        }

        if (Object.keys(productData).length === 0) {
            onCloseModal();
            return;
        }


        if (type === "add") {
            addProduct(productData as IFormProduct);
        } else if (type === "update" && id) {
            updateProduct(id, productData);
        }

        onCloseModal();
    };

    return (
        <div className="w-full bg-slate-100">
            <h2 className="text-center mb-5">{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 mb-5">
                <div className="flex flex-col">
                    <label>Название</label>
                    <input
                        {...register("name", { required: true })}
                        placeholder={type === "add" ? "Название" : ""}
                        defaultValue={type === "update" ? product?.name : ""}
                        type={"text"}
                        className="rounded-md bg-gray-900/[0.12] h-7 py-1.5 px-2.5 placeholder-gray-900 placeholder-opacity-40"
                    />
                    {errors.name && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
                <div className="flex flex-col">
                    <label>Количество</label>
                    <input
                        {...register("quantity", { required: true })}
                        placeholder={type === "add" ? "Количество" : ""}
                        defaultValue={type === "update" ? product?.quantity : ""}
                        type={"number"}
                        className="rounded-md bg-gray-900/[0.12] h-7 py-1.5 px-2.5 placeholder-gray-900 placeholder-opacity-40"
                    />
                    {errors.quantity && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
                <div className="flex flex-col">
                    <label>Цена</label>
                    <input
                        {...register("price", { required: true })}
                        placeholder={type === "add" ? "Цена" : ""}
                        defaultValue={type === "update" ? product?.price : ""}
                        type={"number"}
                        className="rounded-md bg-gray-900/[0.12] h-7 py-1.5 px-2.5 placeholder-gray-900 placeholder-opacity-40"
                    />
                    {errors.price && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
                <div className="flex flex-col">
                    <label>Производитель</label>
                    <select
                        {...register("manufacturerId", { required: true })}
                        className="rounded-md bg-gray-900/[0.12] h-7 py-1.5 px-2"
                        defaultValue={type === "update" ? product?.manufacturerId : ""}
                    >
                        <option value="" disabled selected className="text-gray-900/[0.4]">Компания</option>
                        {manufacturers.map((manufacturer: IManufacturerItem) => (
                            <option key={manufacturer.id} value={manufacturer.id} className="h-7">
                                {manufacturer.name}
                            </option>
                        ))}
                    </select>
                    {errors.manufacturerId && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
                <div className="flex flex-col">
                    <label>Фото</label>
                    <div>
                        {!selectedFile ? (
                            <>
                                <input
                                    id="image"
                                    type={"file"}
                                    {...register("image", { required: true })}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="image" className="flex flex-col items-center py-2.5">
                                    <span className="text-gray-600 py-2.5">Загрузить фото</span>
                                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.47812 3.93387C4.67178 3.30448 5.25329 2.875 5.91179 2.875H8C8.41421 2.875 8.75 2.53921 8.75 2.125C8.75 1.71079 8.41421 1.375 8 1.375H5.91179C4.59478 1.375 3.43177 2.23397 3.04446 3.49274L0.632663 11.3311C0.544715 11.6169 0.5 11.9143 0.5 12.2133V16.375C0.5 18.0319 1.84315 19.375 3.5 19.375H18.5C20.1569 19.375 21.5 18.0319 21.5 16.375V12.2133C21.5 11.9143 21.4553 11.6169 21.3673 11.3311L18.9555 3.49274C18.5682 2.23397 17.4052 1.375 16.0882 1.375H14C13.5858 1.375 13.25 1.71079 13.25 2.125C13.25 2.53921 13.5858 2.875 14 2.875H16.0882C16.7467 2.875 17.3282 3.30448 17.5219 3.93387L19.7345 11.125H16.8906C15.7543 11.125 14.7155 11.767 14.2073 12.7834L13.9511 13.2958C13.697 13.804 13.1776 14.125 12.6094 14.125H9.39058C8.82242 14.125 8.30302 13.804 8.04894 13.2958L7.79271 12.7834C7.28453 11.767 6.24574 11.125 5.10942 11.125H2.26547L4.47812 3.93387Z" fill="#475569" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0.625C11.4142 0.625 11.75 0.960786 11.75 1.375V7.81434L13.4697 6.09467C13.7626 5.80178 14.2374 5.80178 14.5303 6.09467C14.8232 6.38756 14.8232 6.86244 14.5303 7.15533L11.5303 10.1553C11.2374 10.4482 10.7626 10.4482 10.4697 10.1553L7.46967 7.15533C7.17678 6.86244 7.17678 6.38756 7.46967 6.09467C7.76256 5.80178 8.23744 5.80178 8.53033 6.09467L10.25 7.81434V1.375C10.25 0.960786 10.5858 0.625 11 0.625Z" fill="#475569" />
                                    </svg>
                                </label>
                                {selectedFile && (
                                    <span className="text-sm text-gray-700">{selectedFile.name}</span>
                                )} </>) : (

                            <div className="flex justify-between mt-2">
                                {preview && <img src={preview} alt="Preview" className="w-20 h-20 mr-4 object-cover" />}
                                <div className="flex flex-row ">
                                    <p className="w-28 flex justify-start items-center overflow-hidden">{selectedFile.name}</p>
                                    <button type="button" onClick={handleRemoveFile} className="text-red-500 mt-1"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.71967 0.46967C1.01256 0.176777 1.48744 0.176777 1.78033 0.46967L7.25 5.93934L12.7197 0.469671C13.0126 0.176777 13.4874 0.176778 13.7803 0.469671C14.0732 0.762564 14.0732 1.23744 13.7803 1.53033L8.31066 7L13.7803 12.4697C14.0732 12.7626 14.0732 13.2374 13.7803 13.5303C13.4874 13.8232 13.0126 13.8232 12.7197 13.5303L7.25 8.06066L1.78033 13.5303C1.48744 13.8232 1.01256 13.8232 0.71967 13.5303C0.426777 13.2374 0.426777 12.7626 0.71967 12.4697L6.18934 7L0.71967 1.53033C0.426777 1.23744 0.426777 0.762563 0.71967 0.46967Z" fill="#475569" />
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {(!selectedFile && errors.image) && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
                <div className="flex justify-end gap-x-2.5">
                    <Button title={"Отмена"} className={"bg-neutral-700 text-neutral-200"} onClick={onCloseModal} />
                    <Button type={"submit"} title={type === "add" ? "Создать" : "Сохранить"} className={"bg-slate-300 text-zinc-900"} />
                </div>
            </form >
        </div >
    )
}