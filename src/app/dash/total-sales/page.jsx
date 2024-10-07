'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TotalSalesScreen.css';

const TotalSalesScreen = () => {
    const [salesData, setSalesData] = useState([]);
    const [filter, setFilter] = useState('day');
    const [totalSales, setTotalSales] = useState(0);

    const formatDate = (date) => new Date(date).toLocaleDateString();

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch(`/api/sales/total-sales?filter=${filter}`);
                const data = await response.json();

                const formattedData = data.salesData
                    .map((sale) => ({
                        name: formatDate(sale.date.sale_date),
                        venta: sale.total_price,
                        originalDate: new Date(sale.date.sale_date),
                    }))
                    .sort((a, b) => a.originalDate - b.originalDate);

                setSalesData(formattedData);
                setTotalSales(data.totalSales);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [filter]);

    return (
        <div className="total-sales-screen">
            <div className="header">
                <h2 className="title">Total sales</h2>
                <div className="filter-buttons">
                    <button className={`filter-btn ${filter === 'day' ? 'active' : ''}`}
                            onClick={() => setFilter('day')}>Day
                    </button>
                    <button className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
                            onClick={() => setFilter('week')}>Week
                    </button>
                    <button className={`filter-btn ${filter === 'month' ? 'active' : ''}`}
                            onClick={() => setFilter('month')}>Month
                    </button>
                </div>
                <div className="total-amount">
                    <p>Total amount</p>
                    <h2>{totalSales.toFixed(1)}k</h2>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={600}>
                <BarChart
                    data={salesData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis domain={[0, 2000]}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="venta" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalSalesScreen;
