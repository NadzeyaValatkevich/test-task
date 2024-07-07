import { useProducts } from "@/stores/productsStore";

type TitlesTableItemType = {
    id: number,
    title: string
}

const titlesTable: Array<TitlesTableItemType> = [
    { id: 1, title: "Фото" },
    { id: 2, title: "Название" },
    { id: 3, title: "Количество" },
    { id: 4, title: "Производитель" },
    { id: 5, title: "Цена" },
    { id: 6, title: "" },
];


export default function HeaderTable() {

    const layout = useProducts((state) => state.layout);

    const classHeader = layout === "grid" ? "hidden" : "";

    return (
        <div className={`h-20 flex justify-between items-center px-2.5 mb-2.5 ${classHeader}`}>
            {titlesTable.map((el: TitlesTableItemType, index: number) => {
                return (
                    <h6
                        key={el.id}
                        className={`font-normal leading-5 text-slate-900 flex-1 ${index !== 0 ? 'text-center' : ''}`}
                    >
                        {el.title}
                    </h6>)
            })}

        </div>
    );
};