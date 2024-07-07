'use client'

import { authAPI } from "@/api/auth/authAPI";
import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/stores/authStore";
import { useProducts } from "@/stores/productsStore";
import { IUserRole } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export default function Algorithms() {

    const { replace } = useRouter();

    const [me, role, setIsLoggedIn, isLoggedIn] = useAuth(state => [
        state.me,
        state.role,
        state.setIsLoggedIn,
        state.isLoggedIn
    ]);

    const authStorage = localStorage.getItem('auth-storage');

    useLayoutEffect(() => {
        const checkUserAndRedirect = async () => {
            if (authStorage) {
                const token = JSON.parse(authStorage).state.token;
                console.log(token)
                if (!token) {
                    replace('/')
                } else {
                    me(token)
                    setIsLoggedIn(true)
                }
            }
        }
        checkUserAndRedirect();
    }, [])

    useEffect(() => {
        if (role === "Пользователь") {
            replace('/products')
        }
    }, [])

    return (
        <div className="w-full h-screen pt-8 pb-16 bg-slate-100">
            Algorithms
        </div>
    );
}