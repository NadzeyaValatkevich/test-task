'use client'

import { IAuthForm } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/stores/authStore";


export default function AuthForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
        mode: 'onChange'
    });

    const [login, error, setError, status] = useAuth(state => [
        state.login,
        state.error,
        state.setError,
        state.status
    ]);

    const { replace } = useRouter();

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        const success = await login(data);
        if (success) {
            replace("/products")
            reset();
        }
    }

    // useEffect(() => {
    //     localStorage.clear();
    //     setError(null);
    // }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10'>
            <h2 className='text-center'>Авторизация</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='flex flex-col gap-9 pt-8 pb-[10px]'>
                <div className='flex flex-col gap-1'>
                    <h6>Почта</h6>
                    <input
                        {...register('email', {
                            required: 'Поле обязательно для заполнения'
                        })}
                        placeholder='Почта'
                        className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <h6>Пароль</h6>
                    <input
                        {...register('password', {
                            required: 'Поле обязательно для заполнения'
                        })}
                        placeholder='Пароль'
                        className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
            </div>
            <div className='block mx-auto'>
                <button
                    className='px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
                    disabled={status === 'loading'}
                >
                    Войти
                </button>
            </div>
        </form>
    );
}


