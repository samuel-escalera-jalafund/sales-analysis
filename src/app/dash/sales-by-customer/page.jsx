"use client";
import { useEffect, useState } from 'react';

const SalesByCustomerScreen = () => {
    const [customerSalesData, setCustomerSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerSalesData = async () => {
            try {
                const response = await fetch('/api/sales/sales-by-customer');
                const data = await response.json();
                setCustomerSalesData(data);
                
                setLoading(false);
            } catch (error) {
                setError('Error fetching customer sales data');
                setLoading(false);
            }
        };

        fetchCustomerSalesData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section>
            <h2 className="mb-4">Sales By Customer</h2>
            <section className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Customer name</th>
                            <th>E-mail address</th>
                            <th>Number of sales</th>
                            <th>Total revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerSalesData.length > 0 ? (
                            customerSalesData.map((customer, index) => (
                                <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.numberOfSales}</td>                                    
                                        <td>${customer.totalRevenue}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </section>
    );
};

export default SalesByCustomerScreen;
