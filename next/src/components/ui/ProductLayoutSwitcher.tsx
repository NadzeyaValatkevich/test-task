import { iconsLayoutChange } from "@/assets/icons";
import { FC, useState } from "react";
import { LayoutType } from '@/types/root.types';
import { useProducts } from "@/stores/productsStore";


export const ProductLayoutSwitcher = () => {
    const [activeLayout, setActiveLayout] = useState("flex");

    const setLayout = useProducts(state => state.setLayout);

    const handleLayoutChange = (layout: LayoutType) => {
        setLayout(layout);
        setActiveLayout(layout)
    };

    return (
        <div className="mr-4">
            <div className="w-[100px] h-10 rounded-md flex text-zinc-900">

                <button
                    onClick={() => handleLayoutChange('flex')}
                    className={`flex items-center justify-center w-2/4 ${activeLayout === "flex" ? "bg-slate-400" : "bg-slate-300"}`}
                >
                    {iconsLayoutChange[0]}
                </button>
                <button
                    onClick={() => handleLayoutChange('grid')}
                    className={`flex items-center justify-center w-2/4 ${activeLayout === "grid" ? "bg-slate-400" : "bg-slate-300"}`}
                >
                    {iconsLayoutChange[1]}
                </button>

            </div>
        </div>
    );

};