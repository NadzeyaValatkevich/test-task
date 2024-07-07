import { Transition, TransitionStatus } from 'react-transition-group';
import { ReactNode, useEffect } from 'react';
import { useProducts } from '@/stores/productsStore';

interface IModal {
    active: boolean;
    setActive?: (value: boolean) => void;
    children: ReactNode;
    autoClose?: boolean;
};

export const Modal = ({ active, children, setActive, autoClose }: IModal) => {

    const setMessageResponse = useProducts((state) => state.setMessageResponse);

    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
            if (autoClose) {
                const timer = setActive && setTimeout(() => setActive(false), 2000);
                return () => clearTimeout(timer);
            }
            setMessageResponse("")
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [active]);

    return (
        <Transition in={active} timeout={350} unmountOnExit>
            {(state: TransitionStatus) => (
                <div className={`fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-45 transition-opacity duration-350 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-80 rounded-10px bg-slate-100 py-7 px-2.5">
                        {children}
                    </div>
                </div>
            )}
        </Transition>
    );
};