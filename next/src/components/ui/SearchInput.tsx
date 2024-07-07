import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/stores/productsStore";
import { ChangeEvent, useState, KeyboardEvent, useEffect, FC } from "react";

interface ISearchInput {
    onSearch: (query: string) => void
}

export const SearchInput: FC<ISearchInput> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        onSearch(debouncedQuery);

    }, [debouncedQuery])

    const handleInputChange = ((e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    });

    return (
        <input
            type="text"
            placeholder="Поиск"
            value={query}
            onChange={handleInputChange}
            className="w-60 h-7 rounded-md border py-1.5 px-1.5 border-gray-900/[.12] bg-gray-900/[.12]">
        </input>
    );
};