import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const startDate = new Date(searchParams.get('startDate'));
    const endDate = new Date(searchParams.get('endDate'));
    const topN = parseInt(searchParams.get('topN')) || 0;

    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) {
        return NextResponse.json({ error: 'Invalid date parameters.' }, { status: 400 });
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
            include: {
                products: {
                    select: {
                        product: {
                            select: {
                                id: true,
                                product_name: true,
                                price: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });

        const productSalesMap = {};
        let totalProfit = 0;

        salesData.forEach((sale) => {
            sale.products.forEach((saleProduct) => {
                const productId = saleProduct.product.id;
                const productName = saleProduct.product.product_name;
                const productPrice = saleProduct.product.price;
                const quantitySold = saleProduct.quantity;

                if (!productSalesMap[productId]) {
                    productSalesMap[productId] = {
                        productName,
                        totalSold: 0,
                        totalRevenue: 0,
                    };
                }

                productSalesMap[productId].totalSold += quantitySold;
                productSalesMap[productId].totalRevenue += quantitySold * productPrice;

                totalProfit += (productPrice - sale.cost) * quantitySold; 
            });
        });

        const sortedProducts = Object.values(productSalesMap).sort((a, b) => b.totalRevenue - a.totalRevenue);
        const topProducts = sortedProducts.slice(0, topN); 

        const totalRevenue = sortedProducts.reduce((sum, product) => sum + product.totalRevenue, 0).toFixed(2);
        totalProfit = totalProfit.toFixed(2);

        const formattedTopProducts = topProducts.map(product => ({
            productName: product.productName,
            totalSold: product.totalSold,
            totalRevenue: parseFloat(product.totalRevenue.toFixed(2))
        }));

        return NextResponse.json({
            topProducts: formattedTopProducts,
            totalSales: salesData.length, 
            totalRevenue, 
            totalProfit, 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching sales data' }, { status: 500 });
    }
}
