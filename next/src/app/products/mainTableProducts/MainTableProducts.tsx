import { useProducts } from "@/stores/productsStore";
import HeaderTable from "./HeaderTable";
import Table from "./Table";

export const MainTableProducts = () => {

    return (
        <div className="px-2.5 pt-2.5 flex-grow">
            <HeaderTable />
            <Table />
        </div>
    );
};