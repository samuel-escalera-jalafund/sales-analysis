'use client';
import { useRouter } from 'next/navigation';
import "./styles.css";

const DashLayout = ({ children }) => {
    const router = useRouter()
    const currentRoute = location.pathname;

    return (
        <div className="d-flex p-4 gap-4 bg-1-50">
            <aside>
            <h1 className="text-center my-3 ">SALE</h1>
                <nav>
                    <span>Graphical reports</span>
                    <a href="/dash/total-sales" className={currentRoute === '/dash/total-sales' ? 'active' : ''}>Total sales</a>
                    <a href="/dash/average-sales" className={currentRoute === '/dash/average-sales' ? 'active' : ''}>Average sales</a>
                    <a href="/dash/date-range" className={currentRoute === '/dash/date-range' ? 'active' : ''}>Date range</a>
                    <span>Tabular report</span>
                    <a href='/dash/product-sales'className={currentRoute === '/dash/product-sales' ? 'active' : ''}>Product sales</a>
                    <a href='/dash/sales-by-customer' className={currentRoute === '/dash/sales-by-customer' ? 'active' : ''}>Top Customer sales</a>
                </nav>
            </aside>
            <main className="overflow-auto p-5 col bg-white rounded-20">
                {children}
            </main>
        </div>
    )
}

export default DashLayout