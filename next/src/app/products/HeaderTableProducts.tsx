import { CommonProductCard } from "@/components/cards/CommonProductCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ProductLayoutSwitcher } from "@/components/ui/ProductLayoutSwitcher";
import { SearchInput } from "@/components/ui/SearchInput";
import { FC, useState } from "react";

interface IHeaderTableProducts {
    onSearch: (query: string) => void;
};

export const HeaderTableProducts: FC<IHeaderTableProducts> = ({ onSearch }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false)
    };

    return (
        <>
            <div className="w-full h-14 p-2.5 flex justify-between">
                <SearchInput onSearch={onSearch} />
                <div className="flex">
                    <ProductLayoutSwitcher />
                    <Button
                        title={"Добавить"}
                        className={"bg-slate-300 text-zinc-900 "}
                        onClick={handleOpenModal} />
                </div>
            </div>

            <Modal
                active={isModalOpen}
            >
                {<CommonProductCard onCloseModal={handleCloseModal} type={"add"} title={"Создание товара"} />}
            </Modal>
        </>
    );
};