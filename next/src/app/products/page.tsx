'use client'

import { useAuth } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderTableProducts } from "./HeaderTableProducts";
import { useProducts } from "@/stores/productsStore";
import { Pagination } from "@/components/ui/Pagination";
import { MainTableProducts } from "./mainTableProducts/MainTableProducts";
import { Modal } from "@/components/ui/Modal";

export default function Products() {
    const { replace } = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalActive, setIsModalActive] = useState(false);

    const me = useAuth((state) => state.me);
    const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
    const error = useAuth((state) => state.error);

    const fetchProducts = useProducts((state) => state.fetchProducts);
    const messageResponse = useProducts((state) => state.messageResponse);

    const authStorage = localStorage.getItem('auth-storage');


    useEffect(() => {

        if (authStorage) {
            const token = JSON.parse(authStorage).state.token;
            if (!token) {
                replace('/')
                setIsLoggedIn(false)
            }
            else {
                setIsLoggedIn(true)
                me(token).catch(() => {
                    replace('/')
                    setIsLoggedIn(false)
                })
            }
        }
    }, []);

    useEffect(() => {
        fetchProducts(currentPage, searchQuery)
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (messageResponse) {
            setIsModalActive(true);
        }
    }, [messageResponse]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };


    if (error) {
        return <div>{error}</div>
    };

    return (
        <div className="w-full h-screen pt-8 pb-16 bg-transparent">
            <div className="w-3/5 h-full mx-auto flex flex flex-col bg-transparent">
                <HeaderTableProducts onSearch={handleSearch} />
                <MainTableProducts />
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    searchQuery={searchQuery} />
            </div>
            {messageResponse &&
                <Modal
                    active={isModalActive}
                    setActive={setIsModalActive}
                    autoClose
                >
                    {<div className="w-full bg-slate-100 flex flex-col gap-y-6">
                        <h3>{messageResponse}</h3>
                    </div>}
                </Modal>
            }
        </div>
    );
}
