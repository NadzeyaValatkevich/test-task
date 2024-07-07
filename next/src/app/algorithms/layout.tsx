import Sidebar from "@/components/layouts/sidebar";
import { PropsWithChildren } from "react";

export default function ProductsLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow bg-gray-50">{children}</main>
        </div>
    );
};