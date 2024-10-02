import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter');

    let startDate, endDate;
    const today = new Date();

    switch (filter) {
        case 'day':
            startDate = new Date(today.setUTCHours(0, 0, 0, 0));
            endDate = new Date(today.setUTCHours(23, 59, 59, 999));
            break;
        case 'week':
            startDate = new Date(today.setDate(today.getDate() - today.getDay()));
            endDate = new Date(today.setDate(today.getDate() + (6 - today.getDay())));
            break;
        case 'month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        default:
            return NextResponse.json({ error: "Invalid filter. Use 'day', 'week', or 'month'." }, { status: 400 });
    }

    try {
        const salesData = await prisma.sales_Fact.findMany({
            where: {
                date: {
                    sale_date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            },
            select: {
                total_price: true,
                date: {
                    select: {
                        sale_date: true,
                    },
                },
            },
        });

        const totalSales = salesData.reduce((total, sale) => total + Number(sale.total_price), 0);

        return NextResponse.json({
            totalSales,
            salesData,
            startDate,
            endDate,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching sales data' }, { status: 500 });
    }
}
