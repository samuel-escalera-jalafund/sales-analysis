'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import "./styles.css";

const DashLayout = ({ children }) => {
    const router = useRouter()

    return (
        <div className="d-flex p-4 gap-4 bg-1-50">
            <aside>
            <h1 className="text-center my-3 ">SALE</h1>
                <nav>
                    <span>Graphical reports</span>
                    <a href="/dash/total-sales">Total sales</a>
                    <a href="/dash/average-sales">Average sales</a>
                    <a href="/dash/date-range">Date range</a>
                    <span>Tabular report</span>
                    <a href='/dash/product-sales'>Product sales</a>
                    <a href='/dash/sales-by-customer'>Top Customer sales</a>
                </nav>
            </aside>
            <main className="overflow-auto p-5 col bg-white rounded-20">
                {children}
            </main>
        </div>
    )
}

export default DashLayout