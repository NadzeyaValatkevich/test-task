'use client'
import { Metadata } from 'next';
import AuthForm from './AuthForm';
import { useEffect } from 'react';
import { useAuth } from '@/stores/authStore';

export default function Auth() {

	const logout = useAuth(state => state.logout);

	useEffect(() => {
		logout();
		localStorage.clear();
	}, [])

	return (
		<div>
			<div className='flex justify-center items-center min-h-screen bg-slate-100 text-zinc-900'>
				<div className='absolute inset-0 flex flex-col'>
					<div className='h-2/5 bg-slate-800' />
				</div>
				<div className='relative flex justify-center items-center min-h-screen'>
					<AuthForm />
				</div>
			</div>
		</div>
	);
}
