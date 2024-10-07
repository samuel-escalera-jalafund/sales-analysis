"use client";
import { useEffect, useState } from 'react';

const SalesByCustomerScreen = () => {
    const [customerSalesData, setCustomerSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 

    const fetchCustomerSalesData = async (sortByField = '', sortOrderDirection = 'asc') => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/sales/sales-by-customer?sortBy=${sortByField}&sortOrder=${sortOrderDirection}`);
            const data = await response.json();
            setCustomerSalesData(data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching customer sales data');
            setLoading(false);
        }
    };

    const handleSort = (field) => {
        const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(newSortOrder);
        fetchCustomerSalesData(field, newSortOrder);
    };

    useEffect(() => {
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
            <section className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)'}}>
                <table className="table align-middle">
                    <thead style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#fff',
                        boxShadow: '0px 0px 0 2px #eee'
                    }}>
                        <tr>
                            <th onClick={() => handleSort('name')}>
                                Customer name 
                                <img 
                                    src="/chevron-double-up.svg" 
                                    alt="Sort icon" 
                                    style={{ width: '18px', marginLeft: '8px' }} 
                                />
                            </th>
                            <th onClick={() => handleSort('email')}>
                                E-mail address 
                                <img 
                                    src="/chevron-double-up.svg" 
                                    alt="Sort icon" 
                                    style={{ width: '18px', marginLeft: '8px' }} 
                                />
                            </th>
                            <th onClick={() => handleSort('numberOfSales')}>
                                Number of sales 
                                <img 
                                    src="/chevron-double-up.svg" 
                                    alt="Sort icon" 
                                    style={{ width: '18px', marginLeft: '8px' }} 
                                />
                            </th>
                            <th onClick={() => handleSort('totalRevenue')}>
                                Total sales 
                                <img 
                                    src="/chevron-double-up.svg" 
                                    alt="Sort icon" 
                                    style={{ width: '18px', marginLeft: '8px' }} 
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerSalesData.length > 0 ? (
                            customerSalesData.map((customer) => (
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
