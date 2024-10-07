import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy'); 

    try {
        const salesData = await prisma.sales_Fact.findMany({
            select: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                total_price: true,
            },
        });

        const customerSalesMap = {};

        salesData.forEach((sale) => {
            const customerId = sale.customer.id;
            const customerName = sale.customer.name;
            const customerEmail = sale.customer.email;

            if (!customerSalesMap[customerId]) {
                customerSalesMap[customerId] = {
                    id: customerId,
                    name: customerName,
                    email: customerEmail,
                    numberOfSales: 0,
                    totalRevenue: 0,
                };
            }

            customerSalesMap[customerId].numberOfSales += 1; 
            customerSalesMap[customerId].totalRevenue = parseFloat(
                (customerSalesMap[customerId].totalRevenue + parseFloat(sale.total_price) || 0).toFixed(2));
        });

        const customerSalesData = Object.values(customerSalesMap);

        const sortedCustomers = customerSalesData.sort((a, b) => {
            if (sortBy === 'name' || sortBy === 'email') {
                return a[sortBy].localeCompare(b[sortBy]);
            } else if (sortBy === 'numberOfSales' || sortBy === 'totalRevenue') {
                return b[sortBy] - a[sortBy]; 
            }
            return 0; 
        });

        return NextResponse.json(sortedCustomers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching sales data' }, { status: 500 });
    }
}
