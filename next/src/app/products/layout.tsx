import Sidebar from "@/components/layouts/sidebar";
import type { PropsWithChildren } from "react";

export default function ProductsLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow bg-slate-100">{children}</main>
        </div>
    );
};
